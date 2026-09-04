import Account from "./account.model.js";

export const fetchAllAccounts = () => Account.find();
export const fetchAccountById = (id) => Account.findById(id);
export const authAccountByEmail = async (email, password) => {
  return await (
    await Account.findOne({ email }).select("+password")
  ).comparePassword(password);
};
export const createAccount = ({ username, email, password }) => {
  return Account.create({ username, email, password });
};
export const deleteAccount = (id) => Account.findByIdAndDelete(id);
export const exists = ({ username, email }) =>
  Account.exists({
    $or: [{ username }, { email }],
  });
