import type { Middleware } from "koa";

export const requireAuth: Middleware = async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = { error: "Authentication required" };
    return;
  }
  await next();
};
