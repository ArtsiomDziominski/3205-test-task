-- CreateTable
CREATE TABLE "ShortUrl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalUrl" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_originalUrl_key" ON "ShortUrl"("originalUrl");
