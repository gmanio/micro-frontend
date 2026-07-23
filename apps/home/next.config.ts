import type { NextConfig } from "next";

const PASSPORT_URL = process.env.PASSPORT_URL ?? "https://localhost:3100";
const STORYBOOK_URL = process.env.STORYBOOK_URL ?? "https://localhost:6006";

const nextConfig: NextConfig = {
  // Storybook static UI uses assets under /storybook/
  skipTrailingSlashRedirect: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  async rewrites() {
    return [
      {
        source: "/passport",
        destination: `${PASSPORT_URL}/passport`,
      },
      {
        source: "/passport/:path+",
        destination: `${PASSPORT_URL}/passport/:path+`,
      },
      {
        source: "/passport-static/_next/:path+",
        destination: `${PASSPORT_URL}/passport-static/_next/:path+`,
      },
      {
        source: "/storybook",
        destination: `${STORYBOOK_URL}/storybook/`,
      },
      {
        source: "/storybook/",
        destination: `${STORYBOOK_URL}/storybook/`,
      },
      {
        source: "/storybook/:path+",
        destination: `${STORYBOOK_URL}/storybook/:path+`,
      },
      {
        source: "/storybook-static/_next/:path+",
        destination: `${STORYBOOK_URL}/storybook-static/_next/:path+`,
      },
    ];
  },
};

export default nextConfig;
