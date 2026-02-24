import Router from "@koa/router";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireAuth } from "../middleware/requireAuth.js";
import { requirePermission } from "../middleware/requirePermission.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../../uploads");

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const router = new Router({ prefix: "/api/blog" });

/**
 * POST /api/blog/upload
 * Body: { mimeType: string; data: string } — base64-encoded image
 */
router.post(
  "/upload",
  requireAuth,
  requirePermission("blog:create"),
  async (ctx) => {
    const { mimeType, data } = ctx.request.body as {
      mimeType?: string;
      data?: string;
    };

    if (!mimeType || !data) {
      ctx.status = 400;
      ctx.body = { error: "mimeType and data (base64) are required" };
      return;
    }

    const ext = ALLOWED_TYPES[mimeType];
    if (!ext) {
      ctx.status = 400;
      ctx.body = { error: "Unsupported image type. Allowed: JPEG, PNG, WebP, GIF" };
      return;
    }

    const buffer = Buffer.from(data, "base64");
    if (buffer.byteLength > MAX_SIZE_BYTES) {
      ctx.status = 400;
      ctx.body = { error: "Image exceeds 5 MB limit" };
      return;
    }

    await fs.mkdir(uploadsDir, { recursive: true });

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    await fs.writeFile(path.join(uploadsDir, filename), buffer);

    ctx.status = 201;
    ctx.body = { url: `/uploads/${filename}` };
  },
);

export default router;
