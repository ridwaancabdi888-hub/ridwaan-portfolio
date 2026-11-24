import { categories } from "../../data/projects";

export function categoryLabel(id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
