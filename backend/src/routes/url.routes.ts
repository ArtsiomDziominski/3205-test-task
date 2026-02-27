import { Router } from "express";
import { UrlController } from "../controllers/url.controller.js";
import { shortenRateLimit } from "../middlewares/rate-limit.middleware.js";
import { UrlRepository } from "../repositories/url.repository.js";
import { MetadataService } from "../services/metadata.service.js";
import { ShortenerService } from "../services/shortener.service.js";
import { asyncHandler } from "../utils/async-handler.js";

const urlRepository = new UrlRepository();
const metadataService = new MetadataService();
const shortenerService = new ShortenerService(urlRepository, metadataService);
const urlController = new UrlController(shortenerService);

export const urlRouter = Router();

urlRouter.post("/api/shorten", shortenRateLimit, asyncHandler(urlController.createShortUrl.bind(urlController)));
urlRouter.get("/:id", asyncHandler(urlController.redirect.bind(urlController)));
