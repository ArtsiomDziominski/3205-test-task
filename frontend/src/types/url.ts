export type UrlPreview = {
  title: string | null;
  description: string | null;
  image: string | null;
};

export type ShortenResponse = {
  shortUrl: string;
  preview: UrlPreview;
  visits: number;
};
