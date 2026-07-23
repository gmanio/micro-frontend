# ADR 0013: Storybook zone HMR in local dev

- Status: Accepted
- Date: 2026-07-23
- Relates to: [0006](./0006-nextjs-storybook-zone.md), [0010](./0010-storybook-trailing-slash-base.md), [0012](./0012-https-local-next-dev.md)

## Context

The Storybook Multi-Zones path (`https://localhost:3000/storybook/`) served only the static build under `public/storybook/`. UI and story edits appeared on `:6007` immediately but required `build:storybook` before the zone URL updated, which felt broken during day-to-day local work.

## Decision

- **Local default:** home `STORYBOOK_URL=http://localhost:6007` so `/storybook` is proxied to Storybook Vite (server-side rewrite; browser stays on HTTPS home).
- Storybook Vite **dev serves at `/`** (the CLI does not honor a non-root Vite `base` for the manager). Home therefore **strips the `/storybook` prefix** when `STORYBOOK_URL` targets `:6007`, and also rewrites Vite absolute roots (`/@vite/*`, `/@fs/*`, `/node_modules/*`, `/stories/*`, …) so the preview iframe works through HTTPS home.
- **Production / static builds** keep Vite `base: '/storybook/'` and home rewrites that **preserve** `/storybook` when `STORYBOOK_URL` targets `:6006`.
- Vite **`server.hmr`** pins `host/port/clientPort` to `:6007` so when the page is loaded via home `:3000`, the HMR websocket connects to Vite directly (Next rewrites do not proxy WebSockets reliably).
- `@repo/storybook` **`dev`** starts **both** Next `:6006` and Storybook Vite `:6007`.
- Home **middleware** serves a tiny HTML `location.replace("/storybook/")` for exact `/storybook` (Next strips trailing slashes from redirect `Location` headers and would loop).
- **Static verification:** set `STORYBOOK_URL=https://localhost:6006` to exercise the built `public/storybook` path without HMR.

## Consequences

- `pnpm dev` → `https://localhost:3000/storybook/` reflects `@repo/ui` and story edits without rebuild.
- Direct authoring URL remains `http://localhost:6007/` (root).
- Production / CI still ship a static Storybook build into the Next zone; this ADR does not change deploy shape.
- Storybook CLI remains HTTP (see [0012](./0012-https-local-next-dev.md)).

## Alternatives considered

- **Force Vite `base: /storybook/` in development** — Storybook manager still boots at `/` with relative `./` assets; rejected.
- **Auto-rebuild `public/storybook` on file change** — slow and races with Next static serving; rejected.
- **Proxy HMR only through Next `:6006`** — extra hop; WS still needs direct Vite; rejected in favor of home → Vite.

## References

- [0006](./0006-nextjs-storybook-zone.md), [0010](./0010-storybook-trailing-slash-base.md)
