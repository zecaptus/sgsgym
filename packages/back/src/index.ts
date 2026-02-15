import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import { sessionMiddleware } from "./middleware/session.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import rolesRouter from "./routes/roles.js";
import permissionsRouter from "./routes/permissions.js";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(sessionMiddleware);

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
