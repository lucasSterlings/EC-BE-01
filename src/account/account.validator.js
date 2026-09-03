import Joi from "joi";
import { ACCOUNT_ROLES } from "./account.model.js";
import { Validator } from "../util/util.js";

const username = Joi.string().trim().min(3).max(30).required().messages({
  "string.empty": "Username is required",
  "string.min": "Username must be at least 3 characters",
  "string.max": "Username must not exceed 30 characters",
  "any.required": "Username is required",
});

const email = Joi.string().trim().lowercase().email().required().messages({
  "string.empty": "Email is required",
  "string.email": "Please provide a valid email address",
  "any.required": "Email is required",
});

const password = Joi.string().min(8).max(128).required().messages({
  "string.empty": "Password is required",
  "string.min": "Password must be at least 8 characters",
  "string.max": "Password must not exceed 128 characters",
  "any.required": "Password is required",
});

const createValidatorSchema = Joi.object({
  username,
  email,
  password,
});

const authValidatorSchema = Joi.object({
  email,
  password,
});

export default {
  Create: Validator.Get.Middleware(createValidatorSchema),
  Authenticate: Validator.Get.Middleware(authValidatorSchema),
};
