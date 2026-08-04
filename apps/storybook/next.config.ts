import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/storybook-static",
  transpilePackages: ["@repo/ui", "@dndproperty/betterliving-ui"],
  // Keep /storybook/ path for the static Storybook UI
  skipTrailingSlashRedirect: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  async rewrites() {
    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html",
      },
      {
        source: "/storybook/",
        destination: "/storybook/index.html",
      },
    ];
  },
};

export default nextConfig;
