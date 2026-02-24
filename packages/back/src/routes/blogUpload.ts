import Router from "@koa/router";
import multer from "@koa/multer";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireAuth } from "../middleware/requireAuth.js";
import { requirePermission } from "../middleware/requirePermission.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../../uploads");

const ALLOWED_MIMES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const upload = multer({
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIMES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported image type. Allowed: JPEG, PNG, WebP, GIF"), false);
    }
  },
  storage: multer.memoryStorage(),
});

const router = new Router({ prefix: "/api/blog" });

/**
 * POST /api/blog/upload
 * Body: multipart/form-data with a "file" field
 */
router.post(
  "/upload",
  requireAuth,
  requirePermission("blog:create"),
  upload.single("file"),
  async (ctx) => {
    const file = ctx.file;

    if (!file) {
      ctx.status = 400;
      ctx.body = { error: "A file is required" };
      return;
    }

    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = EXT_BY_MIME[file.mimetype] ?? "bin";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    await fs.writeFile(path.join(uploadsDir, filename), file.buffer);

    ctx.status = 201;
    ctx.body = { url: `/uploads/${filename}` };
  },
);

export default router;
