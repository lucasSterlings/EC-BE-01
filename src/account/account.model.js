import { Password } from "../util/util.js";
import mongoose from "mongoose";

export const ACCOUNT_ROLES = Object.freeze({
  ADMIN: "admin",
  SELLER: "seller",
  BUYER: "buyer",
});

const cleaner = (_, ret) => {
  const { __v, password, ...cleaned } = ret || {};
  return cleaned;
};

const accountSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ACCOUNT_ROLES),
      default: ACCOUNT_ROLES.BUYER,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: cleaner,
    },
    toObject: {
      virtuals: true,
      transform: cleaner,
    },
  },
);

accountSchema.methods.comparePassword = function (candidatePassword) {
  return Password.comparePassword(candidatePassword, this.password);
};

const Account = mongoose.model("Account", accountSchema);

export default Account;
