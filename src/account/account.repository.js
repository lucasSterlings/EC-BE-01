import Account from "./account.model.js";

export const fetchAllAccounts = () => Account.find();
export const fetchAccountById = (id) => Account.findById(id);
export const authAccountById = async (id, password) => {
  return await (
    await Account.findById(id).select("+password")
  ).comparePassword(password);
};
export const createAccount = ({ username, email, password }) => {
  return Account.create({ username, email, password });
};
export const deleteAccount = (id) => Account.findByIdAndDelete(id);
export const exists = ({ username, email, _id }) =>
  Account.exists({
    $or: [{ _id }, { username }, { email }],
  });
