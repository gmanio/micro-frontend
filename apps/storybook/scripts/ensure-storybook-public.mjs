import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicIndex = path.join(appRoot, "public", "storybook", "index.html");

if (existsSync(publicIndex)) {
  process.exit(0);
}

console.log("public/storybook missing — running build:storybook once…");
const result = spawnSync("pnpm", ["run", "build:storybook"], {
  cwd: appRoot,
  stdio: "inherit",
  shell: true,
});
process.exit(result.status ?? 1);
