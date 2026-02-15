import type { Middleware } from "koa";

export function requirePermission(permission: string): Middleware {
  return async (ctx, next) => {
    const { user, permissions } = ctx.state;

    if (!user) {
      ctx.status = 401;
      ctx.body = { error: "Authentication required" };
      return;
    }

    // Admin role bypasses all permission checks
    if (user.role.name === "admin") {
      await next();
      return;
    }

    if (!permissions?.includes(permission)) {
      ctx.status = 403;
      ctx.body = { error: "Insufficient permissions" };
      return;
    }

    await next();
  };
}
