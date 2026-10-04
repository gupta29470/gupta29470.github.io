import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so the site is exported at build
  // time. Every page here is already static (one route, no server data), so
  // nothing is lost in the export.
  output: "export",
  // The default image loader needs a server; the export needs it off.
  images: { unoptimized: true },
  // Emit `page/index.html` rather than `page.html`, so links resolve on a
  // static host without extension guesswork.
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
