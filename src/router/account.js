import accountValidator from "../account/account.validator.js";
import * as AccountController from "../account/account.controller.js";
import { Router } from "express";
import { Http } from "../config/config.js";

const accountRouter = Router();

accountRouter.get("/test", (_, res) => {
  return res.status(Http.STATUS.OK).json({
    message: "Account route.",
  });
});

accountRouter
  .route("/:id")
  .get(AccountController.fetchAccount)
  .delete(AccountController.deleteAccount);

accountRouter
  .route("/")
  .post(accountValidator.Create, AccountController.createAccount)
  .get(AccountController.fetchAllAccounts);

accountRouter.post(
  "/auth",
  accountValidator.Authenticate,
  AccountController.authAccount,
);

export default accountRouter;
