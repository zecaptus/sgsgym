import Router from "@koa/router";
import { prisma } from "@sgsgym/db";
import { requireAuth } from "../middleware/requireAuth.js";
import { requirePermission } from "../middleware/requirePermission.js";
import type { Middleware } from "koa";

const router = new Router({ prefix: "/api/blog" });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function canSeeUnpublished(ctx: Parameters<Middleware>[0]): boolean {
  if (!ctx.state.user) return false;
  if (ctx.state.user.role.name === "admin") return true;
  return (
    ctx.state.permissions?.some((p: string) =>
      ["blog:create", "blog:update", "blog:delete", "blog:publish"].includes(p),
    ) ?? false
  );
}

// ─── Categories ──────────────────────────────────────────────────────────────

router.get("/categories", async (ctx) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });
  ctx.body = categories;
});

router.post(
  "/categories",
  requireAuth,
  requirePermission("blog:manage-categories"),
  async (ctx) => {
    const { name } = ctx.request.body as { name?: string };
    if (!name?.trim()) {
      ctx.status = 400;
      ctx.body = { error: "name is required" };
      return;
    }
    const slug = slugify(name.trim());
    const existing = await prisma.category.findFirst({
      where: { OR: [{ name: name.trim() }, { slug }] },
    });
    if (existing) {
      ctx.status = 409;
      ctx.body = { error: "Category already exists" };
      return;
    }
    ctx.status = 201;
    ctx.body = await prisma.category.create({ data: { name: name.trim(), slug } });
  },
);

router.put(
  "/categories/:id",
  requireAuth,
  requirePermission("blog:manage-categories"),
  async (ctx) => {
    const id = Number(ctx.params.id);
    const { name } = ctx.request.body as { name?: string };
    if (!name?.trim()) {
      ctx.status = 400;
      ctx.body = { error: "name is required" };
      return;
    }
    ctx.body = await prisma.category.update({
      where: { id },
      data: { name: name.trim(), slug: slugify(name.trim()) },
    });
  },
);

router.delete(
  "/categories/:id",
  requireAuth,
  requirePermission("blog:manage-categories"),
  async (ctx) => {
    await prisma.category.delete({ where: { id: Number(ctx.params.id) } });
    ctx.status = 204;
  },
);

// ─── Posts ───────────────────────────────────────────────────────────────────

router.get("/posts", async (ctx) => {
  const showAll = canSeeUnpublished(ctx);
  ctx.body = await prisma.blogPost.findMany({
    where: showAll ? {} : { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      published: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
      author: { select: { id: true, name: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
});

router.get("/posts/:slug", async (ctx) => {
  const post = await prisma.blogPost.findUnique({
    where: { slug: ctx.params.slug },
    include: {
      author: { select: { id: true, name: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
  if (!post || (!post.published && !canSeeUnpublished(ctx))) {
    ctx.status = 404;
    ctx.body = { error: "Post not found" };
    return;
  }
  ctx.body = post;
});

router.post("/posts", requireAuth, requirePermission("blog:create"), async (ctx) => {
  const { title, content, excerpt, coverImage, categoryId } = ctx.request.body as {
    title?: string;
    content?: string;
    excerpt?: string;
    coverImage?: string;
    categoryId?: number;
  };
  if (!title?.trim() || !content) {
    ctx.status = 400;
    ctx.body = { error: "title and content are required" };
    return;
  }
  const baseSlug = slugify(title.trim());
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }
  ctx.status = 201;
  ctx.body = await prisma.blogPost.create({
    data: {
      title: title.trim(),
      slug,
      content,
      excerpt: excerpt?.trim() || null,
      coverImage: coverImage?.trim() || null,
      authorId: ctx.state.user.id,
      categoryId: categoryId || null,
    },
    include: {
      author: { select: { id: true, name: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
});

router.put("/posts/:id", requireAuth, requirePermission("blog:update"), async (ctx) => {
  const id = Number(ctx.params.id);
  const { title, content, excerpt, coverImage, categoryId } = ctx.request.body as {
    title?: string;
    content?: string;
    excerpt?: string;
    coverImage?: string;
    categoryId?: number | null;
  };
  if (!title?.trim() || !content) {
    ctx.status = 400;
    ctx.body = { error: "title and content are required" };
    return;
  }
  ctx.body = await prisma.blogPost.update({
    where: { id },
    data: {
      title: title.trim(),
      content,
      excerpt: excerpt?.trim() || null,
      coverImage: coverImage?.trim() || null,
      categoryId: categoryId || null,
    },
    include: {
      author: { select: { id: true, name: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
});

router.delete("/posts/:id", requireAuth, requirePermission("blog:delete"), async (ctx) => {
  await prisma.blogPost.delete({ where: { id: Number(ctx.params.id) } });
  ctx.status = 204;
});

router.patch(
  "/posts/:id/publish",
  requireAuth,
  requirePermission("blog:publish"),
  async (ctx) => {
    const id = Number(ctx.params.id);
    const { published } = ctx.request.body as { published?: boolean };
    if (typeof published !== "boolean") {
      ctx.status = 400;
      ctx.body = { error: "published (boolean) is required" };
      return;
    }
    ctx.body = await prisma.blogPost.update({
      where: { id },
      data: { published, publishedAt: published ? new Date() : null },
      include: {
        author: { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  },
);

export default router;
