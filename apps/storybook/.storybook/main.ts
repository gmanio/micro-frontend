import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uiSrc = path.resolve(__dirname, "../../../packages/ui/src");

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  // Avoid copying Next `public/` (includes prior Storybook builds → nested public/storybook/storybook)
  staticDirs: [],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs-vite"),
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.ts"),
    },
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      // Static zone is hosted at /storybook/; authoring on :6007 uses /
      base: configType === "PRODUCTION" ? "/storybook/" : "/",
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          {
            find: "@repo/ui/globals.css",
            replacement: path.join(uiSrc, "styles/globals.css"),
          },
          {
            find: "@repo/ui",
            replacement: uiSrc,
          },
        ],
      },
    });
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
