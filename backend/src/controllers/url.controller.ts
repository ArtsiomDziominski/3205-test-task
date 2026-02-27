import type { Request, Response } from "express";
import { z } from "zod";
import type { ShortenerService } from "../services/shortener.service.js";
import { AppError } from "../utils/app-error.js";

const shortenSchema = z.object({
  url: z.string().trim().min(1, "URL is required")
});

export class UrlController {
  constructor(private readonly shortenerService: ShortenerService) {}

  async createShortUrl(req: Request, res: Response): Promise<void> {
    const parseResult = shortenSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new AppError(parseResult.error.issues[0]?.message ?? "Invalid request body", 400);
    }

    const result = await this.shortenerService.shorten(parseResult.data.url);
    res.status(201).json(result);
  }

  async redirect(req: Request, res: Response): Promise<void> {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!id) {
      throw new AppError("Missing short URL id", 400);
    }

    const originalUrl = await this.shortenerService.resolveAndCount(id);
    res.redirect(originalUrl);
  }
}
