import type { NextConfig } from "next";

// On GitHub Pages the site is served from /<repo>, so assets need a basePath.
// The deploy workflow sets GITHUB_PAGES=true; local dev/build stay at root.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "dear-crisis-lines";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isPages ? `/${repo}` : undefined,
  assetPrefix: isPages ? `/${repo}/` : undefined,
  // A stray lockfile in the home directory makes Turbopack infer the wrong
  // workspace root, 404-ing every route in dev.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
