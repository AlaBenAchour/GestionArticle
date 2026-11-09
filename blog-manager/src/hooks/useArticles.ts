import { useState } from "react";
import type { Article } from "../types/Article";

const KEY = "articles";

export function getArticles(): Article[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Article[]) : [];
  } catch {
    return [];
  }
}

/** Écrit la liste complète. Retourne false si le stockage est plein. */
function writeArticles(list: Article[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

/** Ajoute un article en tête de liste */
export function saveArticle(article: Article): boolean {
  return writeArticles([article, ...getArticles()]);
}

/**
 * localStorage ne stocke que du texte : on redimensionne l'image
 * puis on la convertit en base64 pour qu'elle reste légère.
 */
export function fileToDataUrl(
  file: File,
  maxWidth = 1200,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url); // supprimer l'URL temporaire
      resolve(canvas.toDataURL("image/webp", quality));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image illisible"));
    };

    img.src = url;
  });
}

/** Hook : liste réactive + modifier + supprimer */
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>(getArticles);

  const persist = (next: Article[]): boolean => {
    if (!writeArticles(next)) return false;
    setArticles(next);
    return true;
  };

  const updateArticle = (updated: Article): boolean =>
    persist(getArticles().map((a) => (a.id === updated.id ? updated : a)));

  const deleteArticle = (id: string): boolean =>
    persist(getArticles().filter((a) => a.id !== id));

  return { articles, updateArticle, deleteArticle };
}