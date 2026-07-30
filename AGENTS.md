# AGENTS

Guidance for coding agents working in this repository.

## Plan-first (preferred)

1. New dated plan under `plans/` (`YYYY-MM-DD_HHmmss-slug.plan.md`) — append only
2. Implement against plan + Accepted ADRs + `docs/GUIDE.md`
3. Architecture decisions → `docs/adr/` in the same change
4. Mark plan `completed`; refresh `plans/README.md`

**Doc read order:** active plan → `docs/adr/` → `docs/GUIDE.md` / this file → other rules.

## Root hygiene

Root **files:** `package.json`, `README.md`, `AGENTS.md`, `.gitignore`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `turbo.json`

Root **dirs:** `apps/`, `packages/`, `docs/`, `plans/`, `.cursor/`, `.git/`, `node_modules/`

## Layout

| Path | Role |
|------|------|
| `plans/` | Dated plans |
| `apps/home` | Router `:3000` |
| `apps/passport` | `/passport` `:3100` |
| `apps/storybook` | `/storybook` `:6006` + Vite HMR `:6007` |
| `apps/docs` | Standalone Fumadocs docs for betterliving-sdk (`:3200`; not a zone — ADR 0015) |
| `packages/ui` | Tailwind + shadcn shared UI (`@repo/ui`, zones) |
| `packages/betterliving-ui` | Publishable Better Living UI (`@dndproperty/betterliving-ui`) |
| `packages/betterliving-sdk` | Publishable Better Living SDK (`@dndproperty/betterliving-sdk`) |
| `docs/adr/` | ADRs |

## Multi-Zones checklist

- [ ] Unique paths; `assetPrefix` not `basePath`
- [ ] Cross-zone `<a>` only
- [ ] `allowedOrigins` includes user-facing host
- [ ] Env under `apps/home/` (`STORYBOOK_URL=http://localhost:6007` for live HMR; `https://localhost:6006` for static)
- [ ] Apps using UI import globals CSS + transpile `@repo/ui`
- [ ] Next `dev` uses `--experimental-https` (mkcert); see ADR 0012
- [ ] Storybook Vite HMR via home (`STORYBOOK_URL` `:6007` strips `/storybook` prefix); see ADR 0013

## Commands

```bash
# brew install mkcert && mkcert -install   # once
pnpm install
pnpm --filter @repo/storybook build:storybook
pnpm --filter @dndproperty/betterliving-ui build
pnpm --filter @dndproperty/betterliving-sdk build
pnpm dev
# optional escapes:
pnpm --filter @repo/storybook dev:stories
pnpm --filter @repo/storybook dev:next
pnpm dev:docs   # betterliving-sdk Fumadocs (:3200; not a zone)
```
