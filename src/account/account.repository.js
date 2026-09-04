import Account, { ACCOUNT_ROLES } from "./account.model.js";

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
export const exists = ({ username, email }) => {
  return Account.exists({
    $or: [{ username }, { email }],
  });
};

export const upgradeAccount =  (id) => {
  return  Account.findByIdAndUpdate(
    id,
    {
        role: ACCOUNT_ROLES.SELLER,
    },
    { returnDocument: "after", runValidators: true },
  );
};
export const downgradeAccount = (id) => {
  return Account.findByIdAndUpdate(
    id,
    {
      $set: {
        role: ACCOUNT_ROLES.BUYER,
      },
    },
    { returnDocument: "after", runValidators: true },
  );
};
