/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  ignorePatterns: ["node_modules/", ".next/", "dist/"],
};
