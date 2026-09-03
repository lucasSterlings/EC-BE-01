import mongoose from "mongoose";
import util from "../util/util.js";

const MongooseEvent = Object.freeze({
  CONNECTED: "connected",
  ERROR: "error",
});

mongoose.connection
  .on(MongooseEvent.CONNECTED, () =>
    util.Log(
      "mongodb",
      `Connected to MongoDB. STATUS: CONNECTED | HOST: ${mongoose.connection.host}`,
    ),
  )
  .on(MongooseEvent.ERROR, (e) =>
    util.Error(
      "mongodb",
      `Error creating connection to MongoDB. STATUS: ERROR | ERR: ${e.message || e}`,
    ),
  );