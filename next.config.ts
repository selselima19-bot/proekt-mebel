import type { NextConfig } from "next";
import path from "node:path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = "proekt-mebel";
const basePath = isGithubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  // Явно указываем корень проекта, чтобы Next не выбирал соседний lock-файл.
  outputFileTracingRoot: path.join(__dirname),
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? basePath : undefined,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isGithubPages,
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
