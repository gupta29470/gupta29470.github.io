import type { MetadataRoute } from "next";

/**
 * The site is one page plus two documents that are deliberately not listed:
 * the resume files are downloads, not pages, and a crawler has no use for them.
 *
 * `lastModified` is the build time. That is honest for a static export: the
 * deployed artifact really was produced then, and there is no content database
 * to ask for a truer answer.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gupta29470.github.io";

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
