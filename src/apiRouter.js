import { Router } from "express";

import accountRouter from "./router/account.js";

import { Http } from "./config/config.js";

const apiRouter = Router();

apiRouter.use("/account", accountRouter);

apiRouter.get("/test", (_, res) => {
  return res.status(Http.STATUS.OK).json({
    message: "Hello from API.",
  });
});

export default apiRouter;
