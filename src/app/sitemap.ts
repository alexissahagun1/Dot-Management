import type { MetadataRoute } from "next";

function origin() {
  return process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://dotsportsmanagement.com";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = origin();
  return ["", "/about", "/services", "/contact"].map((path) => ({
    url: `${base}${path}`,
  }));
}
