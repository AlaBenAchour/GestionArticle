export type Option = { value: string; label: string };

export const categories: Option[] = [
  { value: "patisserie", label: "Pâtisserie" },
  { value: "Venoisserie", label: "Venoisserie" },
  { value: "chocolat", label: "Chocolat" },
  { value: "sandwich", label: "Sandwich" },
];

export const authors: Option[] = [
  { value: "Ala Ben Achour", label: "Ala Ben Achour" },
  { value: "Équipe Code2Work", label: "Équipe Code2Work" },
];

export const categoryLabel = (value: string) =>
  categories.find((c) => c.value === value)?.label ?? value;

export function withCurrent(options: Option[], current?: string): Option[] {
  if (!current || options.some((o) => o.value === current)) return options;
  return [...options, { value: current, label: current }];
}
export const SITE = {
  name: "Code2Work Blog",
  company: "Code2Work",
  tagline: "Le blog technique de Code2Work",
  description:
    "Un espace pour publier, organiser et partager des articles autour du développement web : React, TypeScript, Tailwind CSS et plus encore.",
};
export type SortKey = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export const DEFAULT_SORT: SortKey = "date-desc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "date-desc", label: "Plus récents d'abord" },
  { value: "date-asc", label: "Plus anciens d'abord" },
  { value: "title-asc", label: "Titre A → Z" },
  { value: "title-desc", label: "Titre Z → A" },
];