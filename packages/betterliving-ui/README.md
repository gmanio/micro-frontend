# @dndproperty/betterliving-ui

Better Living shared UI package. Publishable to GitHub Packages; consumable from Next.js / Vite apps.

## Publish

```bash
# from monorepo root (requires GitHub Packages auth in ~/.npmrc or CI)
pnpm --filter @dndproperty/betterliving-ui publish

# or from this package
cd packages/betterliving-ui
pnpm publish
```

`prepublishOnly` runs `clean` + `build` (emits `dist/`). Defaults to `publishConfig.access: "restricted"`.

```bash
# GitHub Packages (default via publishConfig)
pnpm publish

# public npm scope (if ever needed)
pnpm publish --access public --registry https://registry.npmjs.org
```

## Install (consumer app)

```bash
pnpm add @dndproperty/betterliving-ui react react-dom
pnpm add -D tailwindcss @tailwindcss/postcss
```

Configure `.npmrc` for the scope:

```ini
@dndproperty:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### CSS

```tsx
// app/layout.tsx
import "@dndproperty/betterliving-ui/globals.css"
```

Scan app + package sources (Tailwind v4):

```css
/* app/globals.css */
@import "tailwindcss";
@import "@dndproperty/betterliving-ui/globals.css";

@source "./**/*.{ts,tsx}";
@source "../node_modules/@dndproperty/betterliving-ui/dist/**/*.{js,mjs}";
```

### Usage

```tsx
"use client"

import { UnitCard, toUnitCardData } from "@dndproperty/betterliving-ui/components/UnitCard"
import { SortableItem, SortableListProvider } from "@dndproperty/betterliving-ui/lib/dnd"
import { Button } from "@dndproperty/betterliving-ui/components/button"
```

DnD helpers are marked `"use client"` — import them from Client Components in the App Router.

## Local monorepo

```bash
pnpm --filter @dndproperty/betterliving-ui build
```

Workspace consumers resolve `exports` → `dist/` only (run build first, or rely on turbo `^build`).
