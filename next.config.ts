import type { NextConfig } from "next";
import path from "node:path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = "proekt-mebel";

const nextConfig: NextConfig = {
  // Явно указываем корень проекта, чтобы Next не выбирал соседний lock-файл.
  outputFileTracingRoot: path.join(__dirname),
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? `/${repositoryName}` : undefined,
  assetPrefix: isGithubPages ? `/${repositoryName}/` : undefined,
  trailingSlash: isGithubPages ? true : undefined,
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
