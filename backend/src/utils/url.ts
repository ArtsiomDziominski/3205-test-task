import { AppError } from "./app-error.js";

export const normalizeUrl = (rawUrl: string): string => {
  const trimmed = rawUrl.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    return parsed.toString();
  } catch {
    throw new AppError("Invalid URL format", 400);
  }
};
