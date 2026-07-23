# ADR 0002: Home app as domain router

- Status: Accepted
- Date: 2026-07-22

## Context

Multi-Zones requires routing `/news` and `/storybook` to the correct origins. An earlier idea to skip a router left only separate ports and did not provide a single-domain Multi-Zones setup.

## Decision

Add **`apps/home`** on port 3000 as the default zone. It owns catch-all paths and uses Next.js `rewrites` to `NEWS_URL` and `STORYBOOK_URL`.

## Consequences

- Users hit `localhost:3000` for integrated browsing.
- Home stays minimal (landing + rewrites), not a large product surface.
- Env for zone URLs lives in `apps/home/.env*` (not repo root).
- `skipTrailingSlashRedirect: true` so `/storybook/` stays slash-terminated for relative Storybook assets.

## Alternatives considered

- **No router / ports only** — rejected; not Multi-Zones on one domain.
- **External reverse proxy only** — valid later; home rewrites match the official with-zones example for local DX.

## References

- ADR [0001](./0001-multi-zones.md)
- with-zones `home/next.config.js` rewrites pattern
