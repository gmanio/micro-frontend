import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(appRoot, "storybook-out");
const publicDir = path.join(appRoot, "public", "storybook");

if (!existsSync(outDir)) {
  console.error(`Missing ${outDir}. Run build:storybook first.`);
  process.exit(1);
}

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(path.dirname(publicDir), { recursive: true });
cpSync(outDir, publicDir, { recursive: true });

// Manager HTML uses relative "./..." assets; without a trailing slash those
// resolve to "/sb-manager/..." on the home origin. Rewrite to absolute paths.
const indexPath = path.join(publicDir, "index.html");
let html = readFileSync(indexPath, "utf8");
html = html
  .replaceAll('href="./', 'href="/storybook/')
  .replaceAll("href='./", "href='/storybook/")
  .replaceAll('src="./', 'src="/storybook/')
  .replaceAll("src='./", "src='/storybook/")
  .replaceAll("url('./", "url('/storybook/")
  .replaceAll('url("./', 'url("/storybook/')
  .replaceAll("import './", "import '/storybook/")
  .replaceAll('import "./', 'import "/storybook/');
writeFileSync(indexPath, html);

console.log(`Synced ${outDir} → ${publicDir} (absolute /storybook/ asset paths)`);
