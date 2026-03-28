import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Явно указываем корень проекта, чтобы Next не выбирал соседний lock-файл.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
