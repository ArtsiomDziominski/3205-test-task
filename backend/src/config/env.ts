import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  BASE_URL: z.string().url().default("http://localhost:3000"),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:5173"),
  DATABASE_URL: z.string().min(1),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(20)
});

export const env = envSchema.parse(process.env);
