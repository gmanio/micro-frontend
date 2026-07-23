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

// Runtime still fetches STORY_INDEX_PATH = "./index.json". On URL /storybook
// (no slash) that resolves to /index.json on the home origin → 404. Normalize
// the browser path before the manager boots (Next redirects looped; see ADR 0010).
const slashGuard =
  "<script>if(location.pathname===\"/storybook\")location.replace(\"/storybook/\"+location.search+location.hash);</script>";
if (!html.includes('pathname==="/storybook"')) {
  html = html.replace("<head>", `<head>${slashGuard}`);
}

writeFileSync(indexPath, html);

console.log(`Synced ${outDir} → ${publicDir} (absolute /storybook/ asset paths + slash guard)`);
