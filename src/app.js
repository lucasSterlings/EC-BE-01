import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Http } from "./config/config.js";
import util from "./util/util.js";
import apiRouter from "./apiRouter.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: util.Dotenv.parseEnvInt(process.env.RT_WINDOW_MS, 1800000),
    limit: util.Dotenv.parseEnvInt(process.env.RT_LIMIT, 100),
    handler: (_, res) => {
      return res.status(Http.STATUS.TOO_MANY_REQUESTS).json({
        message: "Too many requests. Please try again later.",
      });
    },
  }),
);
app.use((req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  util.Log(
    "request",
    `${req.method}${" ".repeat(10 - method.length)} -- ${req.originalUrl}${" ".repeat(70 - url.length)} -- ${req.ip}${" ".repeat(30 - ip.length)} -- ${req.headers["user-agent"]}`,
  );
  return next();
});
app.use("/api", apiRouter);
app.get("/health", (_, res) => {
  return res.status(Http.STATUS.OK).json({
    message: "Welcome to Express server.",
    uptime: process.uptime(),
  });
});
app.use((_, res) => {
  return res.status(Http.STATUS.NOT_FOUND).json({
    message: "404 NOT FOUND.",
  });
});
app.use((err, _, res, __) => {
  console.log(err.message || err);
  util.Error("request-error", err.message || err);
  return res.status(err.statusCode || Http.STATUS.INTERNAL_ERROR).json({
    message: err.message || "Internal Server Error",
    details: err || {},
  });
});

function startApp() {
  const server = app.listen(port, () => {
    return util.Log("app", `App running on port ::: ${port}`);
  });
  server.on("error", (e) => {
    return util.Error("app", e.message || e);
  });
}

export default {
  start: startApp,
};
