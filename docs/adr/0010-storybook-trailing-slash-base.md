# ADR 0010: Storybook asset paths under /storybook

- Status: Accepted
- Date: 2026-07-23
- Relates to: [0002](./0002-home-as-router.md), [0006](./0006-nextjs-storybook-zone.md)

## Context

Static Storybook manager HTML ships with relative asset URLs (`./sb-manager/...`). Visiting `/storybook` (no trailing slash) resolves those to `/sb-manager/...` on the home origin → 404 → blank UI. An explicit `/storybook` → `/storybook/` redirect looped because Next matched both slash variants. Default Storybook `staticDirs` also copied `public/storybook` into the next build, nesting forever.

## Decision

- Keep `skipTrailingSlashRedirect: true`; rewrite both `/storybook` and `/storybook/` to the static `index.html`.
- After `storybook build`, **rewrite manager `index.html` asset URLs to absolute `/storybook/...`** in `sync-storybook-public.mjs`.
- Vite `base`: **`/storybook/` only for PRODUCTION**; DEVELOPMENT (`dev:stories`) uses `/`.
- Set **`staticDirs: []`** so Storybook does not copy Next `public/` into the build output; clean `storybook-out` and `public/storybook` before each build.

## Consequences

- `/storybook` and `/storybook/` both load the manager (no slash dependency).
- `pnpm --filter @repo/storybook dev:stories` serves at `http://localhost:6007/`.
- Zone path remains `localhost:3000/storybook/` after `build:storybook`.

## Alternatives considered

- **Redirect `/storybook` → `/storybook/`** — Next matched both paths → redirect loop; rejected.
- **Inject `<base href="/storybook/">`** — can interfere with manager client routing; rejected.

## References

- https://storybook.js.org/docs/get-started/frameworks/nextjs-vite
- Terminal: `GET /sb-manager/runtime.js 404` via home when relative assets broke
