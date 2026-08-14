import type { MetadataRoute } from "next";
import { CANONICAL_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: CANONICAL_URL }];
}
