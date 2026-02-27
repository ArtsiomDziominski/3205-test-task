import type { Prisma, ShortUrl } from "@prisma/client";
import { prisma } from "../prisma/client.js";

export class UrlRepository {
  findByOriginalUrl(originalUrl: string): Promise<ShortUrl | null> {
    return prisma.shortUrl.findUnique({ where: { originalUrl } });
  }

  findById(id: string): Promise<ShortUrl | null> {
    return prisma.shortUrl.findUnique({ where: { id } });
  }

  create(data: Prisma.ShortUrlCreateInput): Promise<ShortUrl> {
    return prisma.shortUrl.create({ data });
  }

  incrementVisits(id: string): Promise<ShortUrl> {
    return prisma.shortUrl.update({
      where: { id },
      data: { visits: { increment: 1 } }
    });
  }
}
