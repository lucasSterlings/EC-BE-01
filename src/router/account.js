import accountValidator from "../account/account.validator.js";

import { Router } from "express";
import { Http } from "../config/config.js";

const accountRouter = Router();

accountRouter.get("/test", (_, res) => {
  return res.status(Http.STATUS.OK).json({
    message: "Account route.",
  });
});

accountRouter.route("/").post(accountValidator.Create);
accountRouter.post("/auth", accountValidator.Authenticate);

export default accountRouter;
