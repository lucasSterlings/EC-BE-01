import bcrypt from "bcrypt";
import dotenv from "./dotenv.js";

const saltRounds = dotenv.parseEnvInt(process.env.BCRYPT_SALT_ROUNDS, 10);

function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

function comparePassword(candidatePassword, passwordHash) {
  return bcrypt.compare(candidatePassword, passwordHash);
}

export default {
  hashPassword,
  comparePassword,
};
