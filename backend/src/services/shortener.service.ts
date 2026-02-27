import { nanoid } from "nanoid";
import { env } from "../config/env.js";
import { UrlRepository } from "../repositories/url.repository.js";
import type { ShortenResponse, UrlPreview } from "../types/url.js";
import { AppError } from "../utils/app-error.js";
import { normalizeUrl } from "../utils/url.js";
import { MetadataService } from "./metadata.service.js";

export class ShortenerService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly metadataService: MetadataService
  ) {}

  async shorten(rawUrl: string): Promise<ShortenResponse> {
    const normalizedUrl = normalizeUrl(rawUrl);
    const existing = await this.urlRepository.findByOriginalUrl(normalizedUrl);

    if (existing) {
      return this.toResponse(existing.id, existing.title, existing.description, existing.image, existing.visits);
    }

    const preview = await this.metadataService.getPreview(normalizedUrl);

    const created = await this.urlRepository.create({
      id: nanoid(8),
      originalUrl: normalizedUrl,
      title: preview.title,
      description: preview.description,
      image: preview.image
    });

    return this.toResponse(created.id, created.title, created.description, created.image, created.visits);
  }

  async resolveAndCount(id: string): Promise<string> {
    const record = await this.urlRepository.findById(id);
    if (!record) {
      throw new AppError("Short URL not found", 404);
    }

    await this.urlRepository.incrementVisits(id);
    return record.originalUrl;
  }

  private toResponse(
    id: string,
    title: string | null,
    description: string | null,
    image: string | null,
    visits: number
  ): ShortenResponse {
    const preview: UrlPreview = { title, description, image };

    return {
      shortUrl: `${env.BASE_URL}/${id}`,
      preview,
      visits
    };
  }
}
