import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 900000,
    limit: 5,
    handler: (_, res) => {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    },
  }),
);
// app.use('/api', apiRouter)   # Load API Router.
app.get("/health", (_, res) => {
  return res.status(200).json({
    message: "Welcome to Express server.",
    uptime: process.uptime(),
  });
});
app.use((_, res) => {
  return res.status(404).json({
    message: "404 NOT FOUND.",
  });
});
app.use((err, _, res, __) => {
  console.log(err.message || err);
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    details: err || {},
  });
});

function startApp() {
  const server = app.listen(port, () => {
    return console.log(`App running on port ::: ${port}`);
  });
  server.on("error", (e) => {
    return console.errpr(e.message || e);
  });
}

export default {
  start: startApp,
};
