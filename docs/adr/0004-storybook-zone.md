# ADR 0004: Storybook as non-Next zone

- Status: Superseded
- Date: 2026-07-22
- Superseded by: [0006](./0006-nextjs-storybook-zone.md)

## Context

Storybook documents `@repo/ui` and should be reachable under `/storybook` on the same domain as other zones. Multi-Zones allows non-Next apps on the domain via proxy/rewrites.

## Decision

- Host Storybook in **`apps/storybook`** (`@storybook/react-vite`).
- Set Vite `base: '/storybook/'` via `viteFinal`.
- Home rewrites `/storybook` (with trailing-slash care) to `STORYBOOK_URL`.
- **Zone success criterion:** `build-storybook` + static preview through `localhost:3000/storybook/`.
- Day-to-day DX may use Storybook on `:6006` directly; HMR through home rewrites is not guaranteed.

## Consequences

- Shared UI stays in `packages/ui`; stories live in the Storybook app.
- Static preview needs a serve layout that exposes files under `/storybook/` (see `scripts/preview.mjs`).

## Alternatives considered

- **Storybook only on its own port** — fine for DX, insufficient for Multi-Zones path ownership.
- **Next.js app embedding Storybook** — unnecessary complexity for v1.

## References

- ADR [0001](./0001-multi-zones.md), [0002](./0002-home-as-router.md)
- https://nextjs.org/docs/app/guides/multi-zones
