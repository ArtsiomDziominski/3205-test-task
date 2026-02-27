import axios from "axios";
import * as cheerio from "cheerio";
import type { UrlPreview } from "../types/url.js";

type CacheEntry = {
  expiresAt: number;
  value: UrlPreview;
};

const TEN_MINUTES_MS = 10 * 60 * 1000;

export class MetadataService {
  private readonly cache = new Map<string, CacheEntry>();

  async getPreview(url: string): Promise<UrlPreview> {
    const cached = this.cache.get(url);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    let preview: UrlPreview = { title: null, description: null, image: null };

    try {
      const response = await axios.get<string>(url, {
        timeout: 10_000,
        maxRedirects: 5,
        responseType: "text"
      });

      const $ = cheerio.load(response.data);
      const title = $('meta[property="og:title"]').attr("content") ?? $("title").first().text() ?? null;
      const description =
        $('meta[property="og:description"]').attr("content") ??
        $('meta[name="description"]').attr("content") ??
        null;
      const image = $('meta[property="og:image"]').attr("content") ?? null;

      preview = {
        title: title?.trim() || null,
        description: description?.trim() || null,
        image: image?.trim() || null
      };
    } catch {
      // Metadata fetch should not block URL shortening flow.
      preview = { title: null, description: null, image: null };
    }

    this.cache.set(url, { value: preview, expiresAt: Date.now() + TEN_MINUTES_MS });
    return preview;
  }
}
