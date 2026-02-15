import Router from "@koa/router";
import type { RouterContext } from "@koa/router";
import { prisma } from "@sgsgym/db";
import { hashPassword, verifyPassword } from "../utils/password.js";

const router = new Router({ prefix: "/api/auth" });

const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

function setCookie(ctx: RouterContext, sessionId: string) {
  ctx.cookies.set("session_id", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

// POST /api/auth/signup
router.post("/signup", async (ctx) => {
  const { email, password, name } = ctx.request.body as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Email and password are required" };
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    ctx.status = 409;
    ctx.body = { error: "Email already in use" };
    return;
  }

  const customerRole = await prisma.role.findUnique({
    where: { name: "customer" },
  });
  if (!customerRole) {
    ctx.status = 500;
    ctx.body = { error: "Default role not found" };
    return;
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, name: name || null, passwordHash, roleId: customerRole.id },
  });

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE),
    },
  });

  setCookie(ctx, session.id);

  ctx.status = 201;
  ctx.body = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: { id: customerRole.id, name: customerRole.name },
    permissions: [],
  };
});

// POST /api/auth/login
router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Email and password are required" };
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: {
        include: {
          permissions: { include: { permission: true } },
        },
      },
    },
  });

  if (!user || !(await verifyPassword(user.passwordHash, password))) {
    ctx.status = 401;
    ctx.body = { error: "Invalid email or password" };
    return;
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE),
    },
  });

  setCookie(ctx, session.id);

  ctx.body = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: { id: user.role.id, name: user.role.name },
    permissions: user.role.permissions.map((rp: { permission: { name: string } }) => rp.permission.name),
  };
});

// POST /api/auth/logout
router.post("/logout", async (ctx) => {
  const sessionId = ctx.cookies.get("session_id");
  if (sessionId) {
    await prisma.session.deleteMany({ where: { id: sessionId } });
    ctx.cookies.set("session_id", null);
  }
  ctx.status = 204;
});

// GET /api/auth/me
router.get("/me", async (ctx) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = { error: "Not authenticated" };
    return;
  }

  const { user, permissions } = ctx.state;
  ctx.body = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: { id: user.role.id, name: user.role.name },
    permissions,
  };
});

export default router;
