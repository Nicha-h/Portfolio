import path from "node:path";
import type { NextConfig } from "next";

// Where Next.js proxies /api/* to. Rewrites are resolved at build time.
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, ".."),
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` }];
  },
};

export default nextConfig;
