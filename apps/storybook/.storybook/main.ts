// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uiSrc = path.resolve(__dirname, "../../../packages/ui/src");
const betterlivingUiRoot = path.resolve(__dirname, "../../../packages/betterliving-ui");
const betterlivingUiSrc = path.join(betterlivingUiRoot, "src");

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
      // Static / zone build needs /storybook/; Storybook Vite dev ignores non-root base
      // for the manager, so HMR mode is proxied by stripping /storybook at home (ADR 0013).
      base: configType === "PRODUCTION" ? "/storybook/" : "/",
      // Do not serve Next `public/` (static Storybook build) during authoring HMR
      publicDir: false,
      plugins: [tailwindcss()],
      server: {
        // Page may load via home :3000 rewrite; HMR WS must hit Vite directly
        hmr: {
          host: "localhost",
          port: 6007,
          clientPort: 6007,
        },
        watch: {
          ignored: [
            "**/storybook-out/**",
            "**/public/storybook/**",
            "**/.next/**",
          ],
        },
      },
      resolve: {
        alias: [
          {
            find: "@dndproperty/betterliving-ui/inventory-timeline.css",
            replacement: path.join(betterlivingUiSrc, "styles/inventory-timeline.css"),
          },
          {
            find: "@dndproperty/betterliving-ui/swiper-main-banner.css",
            replacement: path.join(betterlivingUiSrc, "styles/swiper-main-banner.css"),
          },
          {
            find: "@dndproperty/betterliving-ui/unit-card.css",
            replacement: path.join(betterlivingUiSrc, "styles/unit-card.css"),
          },
          {
            find: "@dndproperty/betterliving-ui/product-card.css",
            replacement: path.join(betterlivingUiSrc, "styles/product-card.css"),
          },
          {
            find: "@dndproperty/betterliving-ui/security-pin-keypad.css",
            replacement: path.join(betterlivingUiSrc, "styles/security-pin-keypad.css"),
          },
          {
            find: "@dndproperty/betterliving-ui/globals.css",
            replacement: path.join(betterlivingUiSrc, "styles/globals.css"),
          },
          {
            find: /^@dndproperty\/betterliving-ui\/(.*)$/,
            replacement: `${betterlivingUiSrc}/$1`,
          },
          {
            find: "@dndproperty/betterliving-ui",
            replacement: betterlivingUiSrc,
          },
          {
            find: "@repo/ui/globals.css",
            replacement: path.join(uiSrc, "styles/globals.css"),
          },
          {
            find: "@repo/ui/utility.css",
            replacement: path.join(uiSrc, "styles/utility.css"),
          },
          {
            find: "@repo/ui/liquid.css",
            replacement: path.join(uiSrc, "styles/liquid.css"),
          },
          {
            find: "@repo/ui/components",
            replacement: path.join(uiSrc, "components"),
          },
          {
            find: "@repo/ui/hooks",
            replacement: path.join(uiSrc, "hooks"),
          },
          {
            find: "@repo/ui/lib",
            replacement: path.join(uiSrc, "lib"),
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
