import type { Line } from "@/data/lines";

const STORAGE_KEY = "dearcrisis.favorites";

/** Prepend the shared framing to a stored line for display/copy. */
export function framed(text: string): string {
  return `Dear Crisis, ${text}`;
}

/** Toggle an id in a set, returning a new set (pure). */
export function toggle(favorites: Set<string>, id: string): Set<string> {
  const next = new Set(favorites);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

/**
 * Format the favorited lines as a clipboard-ready block, one framed line per
 * entry, in pool order. Pure — takes the full pool and the favorite id set.
 */
export function exportFavorites(pool: Line[], favorites: Set<string>): string {
  return pool
    .filter((line) => favorites.has(line.id))
    .map((line) => framed(line.text))
    .join("\n\n");
}

/** Read favorites from localStorage. SSR/private-mode safe (returns empty). */
export function loadFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? new Set(ids as string[]) : new Set();
  } catch {
    return new Set();
  }
}

/** Persist favorites to localStorage. Silently no-ops if unavailable. */
export function saveFavorites(favorites: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  } catch {
    /* private mode / quota — favorites just won't persist */
  }
}
