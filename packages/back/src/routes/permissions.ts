import Router from "@koa/router";
import { prisma } from "@sgsgym/db";
import { requireAuth } from "../middleware/requireAuth.js";
import { requirePermission } from "../middleware/requirePermission.js";

const router = new Router({ prefix: "/api/permissions" });

// GET /api/permissions
router.get(
  "/",
  requireAuth,
  requirePermission("permissions:read"),
  async (ctx) => {
    const permissions = await prisma.permission.findMany({
      orderBy: { id: "asc" },
    });
    ctx.body = permissions;
  },
);

export default router;
