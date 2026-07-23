/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended"],
  env: {
    node: true,
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
