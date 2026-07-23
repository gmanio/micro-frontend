# Guide

## Plan-first workflow

이 프로젝트는 **플랜 베이스**로 진화하는 것을 권장한다.

1. **Plan** — `plans/`에 날짜·시간 파일명으로 새 플랜 추가 (히스토리 유지, 덮어쓰기 금지)
2. **Decide** — 아키텍처면 `docs/adr/`에 ADR
3. **Implement** — 활성 플랜 + Accepted ADR + 이 GUIDE + `AGENTS.md`를 따름
4. **Close** — 플랜 `status: completed`, `plans/README.md` 인덱스 갱신

| Doc | Purpose |
|-----|---------|
| [`plans/`](../plans/README.md) | 작업 플랜 아카이브 (실행 단위) |
| [`docs/adr/`](./adr/README.md) | 아키텍처 결정 (오래 가는 규칙) |
| [`AGENTS.md`](../AGENTS.md) | 에이전트 체크리스트 |
| `.cursor/rules/` | 항상 적용되는 Cursor rules |

## Local development

**Prerequisite:** [mkcert](https://github.com/FiloSottile/mkcert) on PATH (`brew install mkcert && mkcert -install`). Next `dev` uses `--experimental-https`; root `pnpm dev` injects the mkcert CA so home can rewrite to HTTPS zones — ADR [0012](./adr/0012-https-local-next-dev.md).

```bash
pnpm install
pnpm --filter @repo/storybook build:storybook   # once if public/storybook missing
pnpm dev
```

| URL | App |
|-----|-----|
| https://localhost:3000 | Home (router) |
| https://localhost:3000/passport | Passport |
| https://localhost:3000/storybook/ | Storybook UI |
| https://localhost:3100/passport | Passport direct |
| https://localhost:6006/storybook/ | Storybook Next zone direct |
| http://localhost:6007 | Storybook HMR (`dev:stories`, HTTP) |

Env: `apps/home/.env.example` → `.env.local` (`PASSPORT_URL`, `STORYBOOK_URL` as `https://…`).

### Shared UI (`@repo/ui`)

- Tailwind v4 + shadcn (new-york) — ADR [0007](./adr/0007-tailwind-shadcn-ui.md)
- Apps: import `@repo/ui/globals.css` (via local `app/globals.css`), `@tailwindcss/postcss`, `transpilePackages: ['@repo/ui']`

### Publishable UI (`@dndproperty/betterliving-ui`)

- Standalone package at `packages/betterliving-ui` — ADR [0011](./adr/0011-betterliving-ui-publishable.md)
- Build: `pnpm --filter @dndproperty/betterliving-ui build` → `dist/`
- Publish: GitHub Packages (`pnpm --filter @dndproperty/betterliving-ui publish`) with auth in user/CI `.npmrc`

### Storybook zone

- Next.js `:6006`, `assetPrefix: /storybook-static` — ADR [0006](./adr/0006-nextjs-storybook-zone.md)
- HMR: `pnpm --filter @repo/storybook dev:stories` (`:6007`)

### Passport zone

- Next.js `:3100`, `/passport`, `assetPrefix: /passport-static` — ADR [0008](./adr/0008-passport-zone.md), [0009](./adr/0009-remove-news-passport-3100.md)

## Multi-Zones verification

```bash
pnpm dev
open https://localhost:3000/passport
open https://localhost:3000/storybook/
```

## Adding a Next.js zone

1. Dated plan under `plans/`
2. `apps/<name>` with `app/<name>` routes + `assetPrefix: '/<name>-static'`
3. Home rewrites + `allowedOrigins`
4. Cross-zone `<a>`; ADR + index update

## References

- [Multi-Zones](https://nextjs.org/docs/app/guides/multi-zones)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Storybook nextjs-vite](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite)
