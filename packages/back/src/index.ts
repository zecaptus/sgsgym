import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sessionMiddleware } from "./middleware/session.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import rolesRouter from "./routes/roles.js";
import permissionsRouter from "./routes/permissions.js";
import blogRouter from "./routes/blog.js";
import blogUploadRouter from "./routes/blogUpload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../uploads");

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

const app = new Koa();
const router = new Router();

app.use(bodyParser({ jsonLimit: "2mb" }));
app.use(sessionMiddleware);

// Serve uploaded files at /uploads/:filename
app.use(async (ctx, next) => {
  if (!ctx.path.startsWith("/uploads/")) {
    await next();
    return;
  }
  const filename = path.basename(ctx.path);
  const filePath = path.join(uploadsDir, filename);
  try {
    const data = await fs.readFile(filePath);
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";
    ctx.type = MIME_BY_EXT[ext] ?? "application/octet-stream";
    ctx.body = data;
  } catch {
    ctx.status = 404;
    ctx.body = { error: "File not found" };
  }
});

router.get("/api/health", (ctx) => {
  ctx.body = { status: "ok" };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());
app.use(rolesRouter.routes());
app.use(rolesRouter.allowedMethods());
app.use(permissionsRouter.routes());
app.use(permissionsRouter.allowedMethods());
app.use(blogRouter.routes());
app.use(blogRouter.allowedMethods());
app.use(blogUploadRouter.routes());
app.use(blogUploadRouter.allowedMethods());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
