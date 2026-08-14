import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75, 80],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
