import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** Project GitHub Pages basePath, e.g. `/micro-frontend`. Empty for local / user site root. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  transpilePackages: ["@dndproperty/betterliving-ui"],
  // Next 16 still probes for `typescript` oddly under pnpm + TS 7; typecheck via `pnpm --filter @repo/docs types:check`.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX(config);
