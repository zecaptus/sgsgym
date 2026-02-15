import Router from "@koa/router";
import { prisma } from "@sgsgym/db";
import { requireAuth } from "../middleware/requireAuth.js";
import { requirePermission } from "../middleware/requirePermission.js";

const BUILT_IN_ROLES = ["admin", "moderator", "customer"];

const router = new Router({ prefix: "/api/roles" });

// GET /api/roles
router.get("/", requireAuth, requirePermission("roles:read"), async (ctx) => {
  const roles = await prisma.role.findMany({
    include: {
      permissions: { include: { permission: true } },
      _count: { select: { users: true } },
    },
    orderBy: { id: "asc" },
  });
  ctx.body = roles.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    builtIn: BUILT_IN_ROLES.includes(r.name),
    userCount: r._count.users,
    permissions: r.permissions.map((rp) => rp.permission),
  }));
});

// GET /api/roles/:id
router.get("/:id", requireAuth, requirePermission("roles:read"), async (ctx) => {
  const role = await prisma.role.findUnique({
    where: { id: Number(ctx.params.id) },
    include: {
      permissions: { include: { permission: true } },
      _count: { select: { users: true } },
    },
  });

  if (!role) {
    ctx.status = 404;
    ctx.body = { error: "Role not found" };
    return;
  }

  ctx.body = {
    id: role.id,
    name: role.name,
    description: role.description,
    builtIn: BUILT_IN_ROLES.includes(role.name),
    userCount: role._count.users,
    permissions: role.permissions.map((rp) => rp.permission),
  };
});

// POST /api/roles
router.post("/", requireAuth, requirePermission("roles:create"), async (ctx) => {
  const { name, description, permissionIds } = ctx.request.body as {
    name?: string;
    description?: string;
    permissionIds?: number[];
  };

  if (!name) {
    ctx.status = 400;
    ctx.body = { error: "Name is required" };
    return;
  }

  const role = await prisma.role.create({
    data: {
      name,
      description: description || null,
      permissions: permissionIds
        ? { create: permissionIds.map((pid) => ({ permissionId: pid })) }
        : undefined,
    },
    include: {
      permissions: { include: { permission: true } },
    },
  });

  ctx.status = 201;
  ctx.body = {
    id: role.id,
    name: role.name,
    description: role.description,
    builtIn: false,
    permissions: role.permissions.map((rp) => rp.permission),
  };
});

// PUT /api/roles/:id
router.put(
  "/:id",
  requireAuth,
  requirePermission("roles:update"),
  async (ctx) => {
    const roleId = Number(ctx.params.id);
    const { name, description, permissionIds } = ctx.request.body as {
      name?: string;
      description?: string;
      permissionIds?: number[];
    };

    const existing = await prisma.role.findUnique({ where: { id: roleId } });
    if (!existing) {
      ctx.status = 404;
      ctx.body = { error: "Role not found" };
      return;
    }

    // Replace all permissions
    if (permissionIds !== undefined) {
      await prisma.rolePermission.deleteMany({ where: { roleId } });
      await prisma.rolePermission.createMany({
        data: permissionIds.map((pid) => ({ roleId, permissionId: pid })),
      });
    }

    const role = await prisma.role.update({
      where: { id: roleId },
      data: {
        name: name ?? existing.name,
        description: description !== undefined ? description : existing.description,
      },
      include: {
        permissions: { include: { permission: true } },
      },
    });

    ctx.body = {
      id: role.id,
      name: role.name,
      description: role.description,
      builtIn: BUILT_IN_ROLES.includes(role.name),
      permissions: role.permissions.map((rp) => rp.permission),
    };
  },
);

// DELETE /api/roles/:id
router.delete(
  "/:id",
  requireAuth,
  requirePermission("roles:delete"),
  async (ctx) => {
    const roleId = Number(ctx.params.id);

    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      ctx.status = 404;
      ctx.body = { error: "Role not found" };
      return;
    }

    if (BUILT_IN_ROLES.includes(role.name)) {
      ctx.status = 400;
      ctx.body = { error: "Cannot delete built-in roles" };
      return;
    }

    await prisma.role.delete({ where: { id: roleId } });
    ctx.status = 204;
  },
);

export default router;
