// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores([
  ".next/**",
  ".preview/**",
  "public/**",
  "storybook-out/**",
  "storybook-static/**",
  "node_modules/**",
]), {
  files: ["**/*.{js,mjs,cjs,ts,tsx}"],
  extends: [js.configs.recommended],
  languageOptions: {
    parser: babelParser,
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    },
  },
  rules: {
    // Keep green without typescript-eslint (Storybook uses TypeScript 7).
    "no-unused-vars": "off",
    "no-undef": "off",
  },
}, ...storybook.configs["flat/recommended"]]);
