import dotenv from "./dotenv.js";
import logger from "./logger.js";
import password from "./password.js";
import errorResponse from "./error-response.js";
import validator from "./validator.js";
import mongoose from "./mongoose.js";
import test from "./test.js";

export const Dotenv = dotenv;
export const Password = password;
export const ErrorResponse = errorResponse;
export const Validator = validator;
export const Mongoose = mongoose;
export const Test = test;

export default {
  Dotenv,
  Password,
  Log: logger.log,
  Error: logger.error,
  ErrorResponse,
  Validator,
  Mongoose,
  Test,
};
