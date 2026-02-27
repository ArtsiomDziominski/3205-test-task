import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger.js";
import { AppError } from "../utils/app-error.js";

export const errorHandlerMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({ message: error.issues[0]?.message ?? "Validation error" });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  logger.error(
    {
      err: error,
      path: req.path,
      method: req.method
    },
    "Unhandled error"
  );

  res.status(500).json({ message: "Internal server error" });
};
