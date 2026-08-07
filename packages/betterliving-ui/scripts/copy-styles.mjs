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
copyFileSync(
  join(root, "src/styles/inventory-timeline.css"),
  join(distStyles, "inventory-timeline.css"),
);
copyFileSync(
  join(root, "src/styles/swiper-main-banner.css"),
  join(distStyles, "swiper-main-banner.css"),
);
copyFileSync(
  join(root, "src/styles/unit-card.css"),
  join(distStyles, "unit-card.css"),
);
copyFileSync(
  join(root, "src/styles/product-card.css"),
  join(distStyles, "product-card.css"),
);
copyFileSync(
  join(root, "src/styles/security-pin-keypad.css"),
  join(distStyles, "security-pin-keypad.css"),
);

console.log("Copied globals.css → dist/styles/globals.css");
console.log("Copied inventory-timeline.css → dist/styles/inventory-timeline.css");
console.log("Copied swiper-main-banner.css → dist/styles/swiper-main-banner.css");
console.log("Copied unit-card.css → dist/styles/unit-card.css");
console.log("Copied product-card.css → dist/styles/product-card.css");
console.log("Copied security-pin-keypad.css → dist/styles/security-pin-keypad.css");
