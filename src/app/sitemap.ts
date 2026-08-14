import type { MetadataRoute } from "next";
import { pageCanonical, sitemapPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPages.map((page) => ({ url: pageCanonical(page) }));
}
