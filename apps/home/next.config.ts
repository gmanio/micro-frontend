import type { NextConfig } from "next";

const PASSPORT_URL = process.env.PASSPORT_URL ?? "https://localhost:3100";
const STORYBOOK_URL = process.env.STORYBOOK_URL ?? "http://localhost:6007";

/** Vite HMR on :6007 serves at `/`; Next static zone on :6006 serves under `/storybook`. */
const storybookHmr = /:(6007)(?:\/|$)/.test(STORYBOOK_URL);

const storybookRewrites = storybookHmr
  ? [
      // Manager + preview under /storybook → Vite root
      {
        source: "/storybook",
        destination: `${STORYBOOK_URL}/`,
      },
      {
        source: "/storybook/",
        destination: `${STORYBOOK_URL}/`,
      },
      {
        source: "/storybook/:path+",
        destination: `${STORYBOOK_URL}/:path+`,
      },
      // Preview iframe injects absolute Vite roots (`/@vite/client`, `/@fs/...`, …)
      {
        source: "/@vite/:path*",
        destination: `${STORYBOOK_URL}/@vite/:path*`,
      },
      {
        source: "/@id/:path*",
        destination: `${STORYBOOK_URL}/@id/:path*`,
      },
      {
        source: "/@fs/:path*",
        destination: `${STORYBOOK_URL}/@fs/:path*`,
      },
      {
        source: "/node_modules/:path*",
        destination: `${STORYBOOK_URL}/node_modules/:path*`,
      },
      {
        source: "/.storybook/:path*",
        destination: `${STORYBOOK_URL}/.storybook/:path*`,
      },
      {
        source: "/stories/:path*",
        destination: `${STORYBOOK_URL}/stories/:path*`,
      },
      {
        source: "/vite-inject-mocker-entry.js",
        destination: `${STORYBOOK_URL}/vite-inject-mocker-entry.js`,
      },
    ]
  : [
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

const nextConfig: NextConfig = {
  // Storybook relative assets need `/storybook/`; avoid Next's automatic slash flip
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
      ...storybookRewrites,
    ];
  },
};

export default nextConfig;
