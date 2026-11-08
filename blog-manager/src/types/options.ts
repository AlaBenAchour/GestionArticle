export type Option = { value: string; label: string };

export const categories: Option[] = [
  { value: "react", label: "React" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "typescript", label: "TypeScript" },
];

export const authors: Option[] = [
  { value: "Ala Ben Achour", label: "Ala Ben Achour" },
  { value: "Équipe Code2Work", label: "Équipe Code2Work" },
];

/** "react" devient "React" (affichage). Retourne la valeur brute si inconnue. */
export const categoryLabel = (value: string) =>
  categories.find((c) => c.value === value)?.label ?? value;

/** Ajoute la valeur actuelle à la liste si elle n'y est plus (édition) */
export function withCurrent(options: Option[], current?: string): Option[] {
  if (!current || options.some((o) => o.value === current)) return options;
  return [...options, { value: current, label: current }];
}