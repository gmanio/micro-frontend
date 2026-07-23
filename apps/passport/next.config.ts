import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/passport-static",
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
