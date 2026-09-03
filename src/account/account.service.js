import util from "../util/util.js";
import * as AccountRepo from "./account.repository.js";

export const createAccount = async ({ username, email, password }) => {
  const accountExist = await AccountRepo.exists({ username, email });
  if (accountExist) {
    throw util.ErrorResponse.Throw.Conflict("Account already exists.");
  }
  const hashedPassword = await util.Password.hashPassword(password);
  return AccountRepo.createAccount({
    username,
    email,
    password: hashedPassword,
  });
};

export const fetchAllAccounts = () => AccountRepo.fetchAllAccounts();

export const fetchAccountById = async (id) => {
  util.Mongoose.validId(id);
  const account = await AccountRepo.fetchAccountById(id.toString());
  if (!account) {
    throw util.ErrorResponse.Throw.NotFound("Account not found.");
  }
  return account;
};

export const exists = ({ username, email }) => {
  return AccountRepo.exists({ username, email });
};

export const deleteAccount = async (id) => {
  util.Mongoose.validId(id);
  const account = await AccountRepo.deleteAccount(id.toString());
  if (!account) {
    throw util.ErrorResponse.Throw.NotFound("Account not found.");
  }
  return account;
};

export const authAccount = async (email, password) => {
  const accountExist = await AccountRepo.exists({ email });
  if (!accountExist) {
    throw util.ErrorResponse.Throw.NotFound("Account not found.");
  }
  if (
    !(await AccountRepo.authAccountById(accountExist._id.toString(), password))
  ) {
    throw util.ErrorResponse.Throw.Unauthorized("Incorrect credentials.");
  }
  return (
    await AccountRepo.fetchAccountById(accountExist._id.toString())
  ).toObject();
};
