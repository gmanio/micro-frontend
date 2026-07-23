import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(appRoot, "storybook-out");
const publicDir = path.join(appRoot, "public", "storybook");

rmSync(outDir, { recursive: true, force: true });
rmSync(publicDir, { recursive: true, force: true });

const build = spawnSync(
  "pnpm",
  ["exec", "storybook", "build", "-o", "storybook-out"],
  { cwd: appRoot, stdio: "inherit", shell: true },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const sync = spawnSync("node", ["./scripts/sync-storybook-public.mjs"], {
  cwd: appRoot,
  stdio: "inherit",
});

process.exit(sync.status ?? 1);
