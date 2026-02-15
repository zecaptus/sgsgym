import type { Middleware } from "koa";
import { prisma } from "@sgsgym/db";

export interface SessionState {
  user?: {
    id: number;
    email: string;
    name: string | null;
    roleId: number;
    role: {
      id: number;
      name: string;
      permissions: { permission: { name: string } }[];
    };
  };
  permissions: string[];
}

export const sessionMiddleware: Middleware = async (ctx, next) => {
  const sessionId = ctx.cookies.get("session_id");

  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });

    if (session && session.expiresAt > new Date()) {
      ctx.state.user = session.user;
      ctx.state.permissions = session.user.role.permissions.map(
        (rp: { permission: { name: string } }) => rp.permission.name,
      );
    } else if (session) {
      // Expired session — clean up
      await prisma.session.delete({ where: { id: sessionId } });
      ctx.cookies.set("session_id", null);
    }
  }

  await next();
};
