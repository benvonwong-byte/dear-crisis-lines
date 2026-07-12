"use client";

import { useEffect, useMemo, useState } from "react";
import type { Line } from "@/data/lines";
import {
  framed,
  toggle,
  exportFavorites,
  loadFavorites,
  saveFavorites,
} from "@/lib/favorites";

type Filter = "all" | "favorites";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function CurationTable({ lines }: { lines: Line[] }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>("all");
  const [toast, setToast] = useState<string | null>(null);

  // Hydrate from localStorage after mount (SSR-safe).
  useEffect(() => setFavorites(loadFavorites()), []);

  function flashToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }

  function onToggle(id: string) {
    setFavorites((prev) => {
      const next = toggle(prev, id);
      saveFavorites(next);
      return next;
    });
  }

  async function onCopy(line: Line) {
    const ok = await copyText(framed(line.text));
    flashToast(ok ? "Copied — paste into WhatsApp" : "Copy failed — select & copy manually");
  }

  async function onExport() {
    if (favorites.size === 0) {
      flashToast("No favorites yet — tap the heart on a few");
      return;
    }
    const ok = await copyText(exportFavorites(lines, favorites));
    flashToast(ok ? `Copied ${favorites.size} favorite${favorites.size > 1 ? "s" : ""}` : "Copy failed");
  }

  const visible = useMemo(
    () => (filter === "favorites" ? lines.filter((l) => favorites.has(l.id)) : lines),
    [filter, lines, favorites],
  );

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16 text-[color:var(--charcoal)]">
      {/* Header */}
      <header className="mb-10 sm:mb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted-teal)]">
          A curation table
        </p>
        <h1
          className="riso-offset font-[family-name:var(--font-serif)] text-5xl font-bold leading-[0.95] tracking-tight text-[color:var(--ink-black)] sm:text-7xl"
          data-text="Dear Crisis,"
        >
          Dear Crisis,
        </h1>
        <p className="mt-5 max-w-xl font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-[color:var(--charcoal)] sm:text-xl">
          An insight, then a question to sit with. Browse, favorite the ones that
          catch you, and take them into the chat.
        </p>
      </header>

      {/* Toolbar */}
      <div className="sticky top-0 z-10 -mx-5 mb-8 flex flex-wrap items-center gap-3 bg-[var(--paper-cream)]/85 px-5 py-3 backdrop-blur-sm sm:-mx-8 sm:px-8">
        <div className="inline-flex overflow-hidden rounded-full border-2 border-[color:var(--ink-black)]">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            All · {lines.length}
          </FilterButton>
          <FilterButton active={filter === "favorites"} onClick={() => setFilter("favorites")}>
            ♥ Favorites · {favorites.size}
          </FilterButton>
        </div>
        <button
          onClick={onExport}
          className="riso-card ml-auto rounded-full border-2 border-[color:var(--ink-black)] bg-[color:var(--riso-coral)] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[color:var(--paper-cream)] transition-transform active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          Export favorites
        </button>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="py-24 text-center font-[family-name:var(--font-serif)] text-xl italic text-[color:var(--muted-teal)]">
          No keepers yet — tap the heart on the ones that land.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {visible.map((line) => (
            <LineCard
              key={line.id}
              line={line}
              favorited={favorites.has(line.id)}
              onToggle={() => onToggle(line.id)}
              onCopy={() => onCopy(line)}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="riso-card fixed bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border-2 border-[color:var(--ink-black)] bg-[color:var(--ink-black)] px-5 py-2.5 text-sm font-medium text-[color:var(--paper-cream)]">
          {toast}
        </div>
      )}
    </main>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
        active
          ? "bg-[color:var(--ink-black)] text-[color:var(--paper-cream)]"
          : "bg-transparent text-[color:var(--ink-black)] hover:bg-[color:var(--ink-black)]/5"
      }`}
    >
      {children}
    </button>
  );
}

function LineCard({
  line,
  favorited,
  onToggle,
  onCopy,
}: {
  line: Line;
  favorited: boolean;
  onToggle: () => void;
  onCopy: () => void;
}) {
  return (
    <article className="riso-card flex flex-col justify-between rounded-sm border-2 border-[color:var(--ink-black)] bg-[color:var(--paper-cream)] p-6">
      <div>
        <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[color:var(--muted-teal)]">
          Dear Crisis,
        </p>
        <p className="font-[family-name:var(--font-serif)] text-lg leading-snug text-[color:var(--ink-black)]">
          {line.text}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t-2 border-dashed border-[color:var(--ink-black)]/20 pt-4">
        <button
          onClick={onToggle}
          aria-pressed={favorited}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide transition-transform active:scale-95"
          style={{ color: favorited ? "var(--riso-coral)" : "var(--charcoal)" }}
        >
          <span className="text-lg leading-none">{favorited ? "♥" : "♡"}</span>
          {favorited ? "Kept" : "Keep"}
        </button>
        <button
          onClick={onCopy}
          className="text-sm font-semibold uppercase tracking-wide text-[color:var(--ink-black)] underline decoration-[color:var(--riso-coral)] decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
        >
          Copy
        </button>
      </div>
    </article>
  );
}
