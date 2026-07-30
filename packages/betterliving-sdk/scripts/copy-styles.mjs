import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distStyles = join(root, "dist/styles");

mkdirSync(distStyles, { recursive: true });
copyFileSync(
  join(root, "src/styles/globals.css"),
  join(distStyles, "globals.css"),
);

console.log("Copied globals.css → dist/styles/globals.css");
