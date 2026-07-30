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
};

export default withMDX(config);
