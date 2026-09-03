import dotenv from "./dotenv.js";
import logger from "./logger.js";
import password from "./password.js";

export const Dotenv = dotenv;
export const Password = password;

export default {
  Dotenv,
  Password,
  Log: logger.log,
  Error: logger.error,
};
