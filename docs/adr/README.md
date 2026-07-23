# Architecture Decision Records

ADRs live **only** in this folder: `docs/adr/`.

## Index

| ADR | Title | Status |
|-----|-------|--------|
| [0000](./0000-template.md) | Template | — |
| [0001](./0001-multi-zones.md) | Adopt Next.js Multi-Zones | Accepted |
| [0002](./0002-home-as-router.md) | Home app as domain router | Accepted |
| [0003](./0003-news-zone.md) | News zone shape | Superseded |
| [0004](./0004-storybook-zone.md) | Storybook as non-Next zone | Superseded |
| [0005](./0005-plan-first-dated-archive.md) | Plan-first dated archive | Accepted |
| [0006](./0006-nextjs-storybook-zone.md) | Next.js Storybook zone | Accepted |
| [0007](./0007-tailwind-shadcn-ui.md) | Tailwind + shadcn in @repo/ui | Accepted |
| [0008](./0008-passport-zone.md) | Passport zone | Accepted |
| [0009](./0009-remove-news-passport-3100.md) | Remove news; passport :3100 | Accepted |
| [0010](./0010-storybook-trailing-slash-base.md) | Storybook asset paths under /storybook | Accepted |
| [0011](./0011-betterliving-ui-publishable.md) | Publishable @dndproperty/betterliving-ui | Accepted |
| [0012](./0012-https-local-next-dev.md) | HTTPS for local Next.js Multi-Zones | Accepted |
| [0013](./0013-storybook-zone-hmr-dev.md) | Storybook zone HMR in local dev | Accepted |

## When to write

Create an ADR for architecture / cross-cutting changes (new zones, rewrite strategy, tooling boundaries, Storybook hosting, root allowlist). Skip for routine bugfixes and local UI tweaks.

## How to write

1. Copy `0000-template.md` to `NNNN-short-kebab-title.md` (next number).
2. Fill all sections; set Status to `Accepted` when the decision ships.
3. If replacing an older decision, set the old ADR Status to `Superseded` and link the new one.
4. Add a row to this index.
