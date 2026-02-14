import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

app.use(cors());

router.get("/api/health", (ctx) => {
  ctx.body = { status: "ok" };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
