import type { Article } from "../types/Article";
import { categoryLabel } from "../types/options";
import type { SortKey } from "../types/options";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .toLowerCase();

/* ---------- Recherche (inchangée) ---------- */

export function filterArticles(articles: Article[], query: string): Article[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return articles;

  return articles.filter((a) => {
    const haystack = normalize(
      [a.title, a.content, a.author, categoryLabel(a.category)].join(" ")
    );
    return terms.every((term) => haystack.includes(term));
  });
}

/* ---------- Tri ---------- */

// publishedAt est au format YYYY-MM-DD : une comparaison de texte suffit.
// À date égale, la date de création départage.
const byDate = (a: Article, b: Article) =>
  a.publishedAt.localeCompare(b.publishedAt) ||
  a.createdAt.localeCompare(b.createdAt);

const byTitle = (a: Article, b: Article) =>
  a.title.localeCompare(b.title, "fr", { sensitivity: "base" });

export function sortArticles(articles: Article[], sort: SortKey): Article[] {
  const list = [...articles]; // ne modifie pas le tableau d'origine

  switch (sort) {
    case "date-asc":
      return list.sort(byDate);
    case "title-asc":
      return list.sort(byTitle);
    case "title-desc":
      return list.sort((a, b) => byTitle(b, a));
    case "date-desc":
    default:
      return list.sort((a, b) => byDate(b, a));
  }
}

/* ---------- Tout combiné : recherche, puis catégorie, puis tri ---------- */

type Filters = { query: string; category: string; sort: SortKey };

export function applyFilters(
  articles: Article[],
  { query, category, sort }: Filters
): Article[] {
  const searched = filterArticles(articles, query);
  const byCategory = category
    ? searched.filter((a) => a.category === category)
    : searched;
  return sortArticles(byCategory, sort);
}