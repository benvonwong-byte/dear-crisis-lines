import { describe, it, expect, beforeEach } from "vitest";
import {
  framed,
  toggle,
  exportFavorites,
  loadFavorites,
  saveFavorites,
} from "./favorites";
import type { Line } from "@/data/lines";

const pool: Line[] = [
  { id: "1", text: "one.", topics: [], moods: [] },
  { id: "2", text: "two.", topics: [], moods: [] },
  { id: "3", text: "three.", topics: [], moods: [] },
];

describe("framed", () => {
  it("prepends the shared framing", () => {
    expect(framed("hello.")).toBe("Dear Crisis, hello.");
  });
});

describe("toggle", () => {
  it("adds an absent id and does not mutate the input", () => {
    const start = new Set<string>(["1"]);
    const next = toggle(start, "2");
    expect(next.has("2")).toBe(true);
    expect(start.has("2")).toBe(false); // purity
  });

  it("removes a present id", () => {
    const next = toggle(new Set(["1", "2"]), "2");
    expect(next.has("2")).toBe(false);
    expect(next.has("1")).toBe(true);
  });
});

describe("exportFavorites", () => {
  it("emits framed lines in pool order, ignoring selection order", () => {
    const out = exportFavorites(pool, new Set(["3", "1"]));
    expect(out).toBe("Dear Crisis, one.\n\nDear Crisis, three.");
  });

  it("returns empty string when nothing is favorited", () => {
    expect(exportFavorites(pool, new Set())).toBe("");
  });
});

describe("localStorage round-trip", () => {
  beforeEach(() => window.localStorage.clear());

  it("persists and reloads the favorite set", () => {
    saveFavorites(new Set(["2", "3"]));
    expect(loadFavorites()).toEqual(new Set(["2", "3"]));
  });

  it("returns an empty set when storage is empty", () => {
    expect(loadFavorites()).toEqual(new Set());
  });
});
