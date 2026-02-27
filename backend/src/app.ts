import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { urlRouter } from "./routes/url.routes.js";

export const app = express();

app.use(express.json({ limit: "100kb" }));
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN
  })
);
app.use(loggerMiddleware);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(urlRouter);
app.use(errorHandlerMiddleware);
