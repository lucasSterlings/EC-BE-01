import { Http } from "../config/config.js";
import * as AccountService from "./account.service.js";

export const createAccount = async (req, res, next) => {
  try {
    const createdAccount = await AccountService.createAccount(req.body);
    return res.status(Http.STATUS.CREATED).json({
      message: "Account Created.",
      account: createdAccount,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AccountService.deleteAccount(id);
    return res.status(Http.STATUS.NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
};

export const authAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const authorizedPayload = await AccountService.authAccount(email, password);
    return res.status(Http.STATUS.ACCEPTED).json({
      message: "Account authorized.",
      payload: authorizedPayload,
    });
  } catch (error) {
    return next(error);
  }
};

export const fetchAllAccounts = async (req, res, next) => {
  try {
    const accounts = await AccountService.fetchAllAccounts();
    return res.status(Http.STATUS.OK).json({
      message: "Accounts fetched.",
      accounts: accounts || [],
    });
  } catch (error) {
    return next(error);
  }
};

export const fetchAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const account = await AccountService.fetchAccountById(id);
    return res.status(Http.STATUS.OK).json({
      message: "Account fetched.",
      account,
    });
  } catch (error) {
    return next(error);
  }
};
