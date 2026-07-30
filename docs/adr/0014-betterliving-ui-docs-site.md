# ADR 0014: Standalone Fumadocs docs for betterliving-ui

- Status: Superseded by [0015](./0015-betterliving-sdk-docs.md)
- Date: 2026-07-30

## Context

`@dndproperty/betterliving-ui` (ADR [0011](./0011-betterliving-ui-publishable.md)) is a publishable package. Consumers need Guides + API docs (similar to overlay-kit), separate from Multi-Zones Storybook (`/storybook`) which is an internal playground.

Hosting as a Multi-Zones path would couple public package docs to home rewrite and HTTPS local zone ops. The product choice is a **standalone static site** on GitHub Pages.

## Decision

- Add **`apps/docs`** (`@repo/docs`) using **Fumadocs** + Next.js App Router.
- Use **`output: 'export'`** and deploy **`out/`** to **GitHub Pages** (with `.nojekyll`; `basePath`/`assetPrefix` from CI for project pages).
- **Do not** register `/docs` on `apps/home` rewrites — this app is **not** a Multi-Zone.
- Document only public `exports` of `@dndproperty/betterliving-ui`. Keep monorepo GUIDE/ADR markdown in-repo for agents; do not migrate them into the public site in v1.

## Consequences

- Root `pnpm dev` (turbo) may start docs if it has a `dev` script; it does not affect zone URLs on `:3000`.
- Storybook remains for zone UI authoring; docs site is the consumer reference.
- Project Pages URL is typically `https://<org>.github.io/micro-frontend/` until a custom domain is added.

## Alternatives considered

- **Zone under `/docs` via home rewrite** — rejected; packaging docs should not depend on the product router.
- **VitePress / Nextra** — workable; Fumadocs chosen for Next 16 + Tailwind 4 alignment already used in the monorepo.
- **Embed docs in betterliving-ui package** — rejected for clearer app boundary and Pages CI.

## References

- https://overlay-kit.slash.page/
- https://fumadocs.dev
- ADR [0011](./0011-betterliving-ui-publishable.md)
