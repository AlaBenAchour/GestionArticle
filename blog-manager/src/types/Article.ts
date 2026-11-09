export type Article = {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  image: string | null; // image en base64 (data URL)
  createdAt: string;
};