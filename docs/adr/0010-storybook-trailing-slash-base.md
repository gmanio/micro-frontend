# ADR 0010: Storybook asset paths under /storybook

- Status: Accepted
- Date: 2026-07-23
- Relates to: [0002](./0002-home-as-router.md), [0006](./0006-nextjs-storybook-zone.md)

## Context

Static Storybook manager HTML ships with relative asset URLs (`./sb-manager/...`). Visiting `/storybook` (no trailing slash) resolves those to `/sb-manager/...` on the home origin → 404 → blank UI. An explicit `/storybook` → `/storybook/` redirect looped because Next matched both slash variants. Default Storybook `staticDirs` also copied `public/storybook` into the next build, nesting forever.

## Decision

- Keep `skipTrailingSlashRedirect: true`; rewrite both `/storybook` and `/storybook/` to the static `index.html`.
- After `storybook build`, **rewrite manager `index.html` asset URLs to absolute `/storybook/...`** in `sync-storybook-public.mjs`.
- Also inject a tiny **client slash guard** in `index.html`: if `pathname === "/storybook"`, `location.replace("/storybook/...")`. Absolute tags alone are not enough — the manager still fetches `./index.json`, which becomes `/index.json` on the home origin when the document URL has no trailing slash.
- Vite `base`: **`/storybook/` for production builds**; development Vite serves at `/` and home strips the `/storybook` prefix when proxying to `:6007` — see [0013](./0013-storybook-zone-hmr-dev.md).
- Set **`staticDirs: []`** so Storybook does not copy Next `public/` into the build output; clean `storybook-out` and `public/storybook` before each build.

## Consequences

- `/storybook` redirects to `/storybook/` so `./index.json` resolves under `/storybook/`.
- Storybook Vite serves at `http://localhost:6007/` (proxied from home `/storybook/`).
- Zone path remains `localhost:3000/storybook/` (live via Vite in local default, or static after `build:storybook`).

## Alternatives considered

- **Redirect `/storybook` → `/storybook/`** — Next matched both paths → redirect loop; rejected.
- **Inject `<base href="/storybook/">`** — can interfere with manager client routing; rejected.

## References

- https://storybook.js.org/docs/get-started/frameworks/nextjs-vite
- Terminal: `GET /sb-manager/runtime.js 404` via home when relative assets broke
