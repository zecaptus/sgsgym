import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import { prisma } from "@sgsgym/db";

const app = new Koa();
const router = new Router();

app.use(cors());

router.get("/api/health", (ctx) => {
  ctx.body = { status: "ok" };
});

router.get("/api/users", async (ctx) => {
  const users = await prisma.user.findMany();
  ctx.body = users;
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
