import "dotenv/config";
import "./config/mongoose.js";
import app from "./app.js";
import util from "./util/util.js";
import mongoose from "mongoose";
import accountRepositoryTest from "./test/account.repository.test.js";
import accountServiceTest from "./test/account.service.test.js";
import accountControllerTest from "./test/account.controller.test.js";

mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    serverSelectionTimeoutMS: util.Dotenv.parseEnvInt(
      process.env.SERVER_SELECTION_TIMEOUT_MS,
      10000,
    ),
    socketTimeoutMS: util.Dotenv.parseEnvInt(
      process.env.SOCKET_SELECTION_TIMEOUT_MS,
      5000,
    ),
  })
  .then(() => app.start())
  .catch(() => {
    setTimeout(() => {
      util.Log("system", "Restarting in 2s...");
      setTimeout(() => process.exit(1), 2000);
    });
  })
  .finally(() =>
    setTimeout(async () => {
      util.Log("system", "=".repeat(50))
      util.Log("system", "CONDUCTING TEST: Account Repository");
      util.Log("system", "=".repeat(50))
      await accountRepositoryTest();
      util.Log("system", "=".repeat(50))
      util.Log('system', 'CONDUCTING TEST: Account Service.')
      util.Log("system", "=".repeat(50))
      await accountServiceTest()
      util.Log("system", "=".repeat(50))
      util.Log('system', 'CONDUCTING TEST: Account Controller.')
      util.Log("system", "=".repeat(50))
      await accountControllerTest();
    }, 1000),
  );
