# ADR 0006: Next.js Storybook zone

- Status: Accepted
- Date: 2026-07-22
- Supersedes: [0004](./0004-storybook-zone.md)

## Context

ADR 0004 hosted Storybook as a Vite/Storybook-CLI zone. That worked only via ad-hoc static preview and did not match the with-zones Next.js secondary-zone pattern (`assetPrefix` + home rewrites to a Next origin).

## Decision

- Convert **`apps/storybook`** into a **Next.js 15** app (port **6006**).
- Use **`assetPrefix: '/storybook-static'`** (no `basePath`), same shape as news.
- Serve Storybook UI from **`public/storybook/`** (output of `build:storybook` with Vite `base: '/storybook/'`).
- Next.js does not directory-index `public/storybook`; add rewrites `/storybook` and `/storybook/` → `/storybook/index.html`, plus `skipTrailingSlashRedirect` on the storybook app and home.
- Author stories with **`@storybook/nextjs-vite`**; HMR via Vite on **:6007** (`base: /storybook/`).
- Home rewrites `/storybook`, `/storybook/:path+`, `/storybook-static/_next/:path+` → `STORYBOOK_URL`.
- **Local default** proxies `/storybook` to Vite for live updates — [0013](./0013-storybook-zone-hmr-dev.md). Trailing-slash / absolute manager assets: [0010](./0010-storybook-trailing-slash-base.md).

## Consequences

- `pnpm dev` Multi-Zones path matches news (Next → Next) for static verification; local Storybook UI defaults to Vite HMR through home.
- `public/storybook` is a build artifact (gitignored); `predev` builds once if missing.

## Alternatives considered

- **Keep Vite-only zone (0004)** — insufficient Multi-Zones symmetry.
- **Only switch to nextjs-vite without Next zone** — still Storybook CLI server, not a Next zone.

## References

- [0003](./0003-news-zone.md), [0004](./0004-storybook-zone.md) (superseded)
- https://nextjs.org/docs/app/guides/multi-zones
- https://storybook.js.org/docs/get-started/frameworks/nextjs-vite
