import Router from "@koa/router";
import { prisma } from "@sgsgym/db";
import { requireAuth } from "../middleware/requireAuth.js";
import { requirePermission } from "../middleware/requirePermission.js";

const router = new Router({ prefix: "/api/users" });

// GET /api/users
router.get("/", requireAuth, requirePermission("users:read"), async (ctx) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      roleId: true,
      role: { select: { id: true, name: true } },
      createdAt: true,
    },
    orderBy: { id: "asc" },
  });
  ctx.body = users;
});

// PATCH /api/users/:id/role
router.patch(
  "/:id/role",
  requireAuth,
  requirePermission("users:update"),
  async (ctx) => {
    const userId = Number(ctx.params.id);
    const { roleId } = ctx.request.body as { roleId?: number };

    if (!roleId) {
      ctx.status = 400;
      ctx.body = { error: "roleId is required" };
      return;
    }

    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      ctx.status = 404;
      ctx.body = { error: "Role not found" };
      return;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { roleId },
      select: {
        id: true,
        email: true,
        name: true,
        roleId: true,
        role: { select: { id: true, name: true } },
      },
    });

    ctx.body = user;
  },
);

// DELETE /api/users/:id
router.delete(
  "/:id",
  requireAuth,
  requirePermission("users:delete"),
  async (ctx) => {
    const userId = Number(ctx.params.id);

    // Prevent self-deletion
    if (userId === ctx.state.user.id) {
      ctx.status = 400;
      ctx.body = { error: "Cannot delete your own account" };
      return;
    }

    await prisma.user.delete({ where: { id: userId } });
    ctx.status = 204;
  },
);

export default router;
