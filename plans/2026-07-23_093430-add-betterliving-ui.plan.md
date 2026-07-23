---
name: Add betterliving-ui package
created: 2026-07-23T09:34:30+09:00
updated: 2026-07-23T09:36:30+09:00
status: completed
overview: betterliving-standalone의 UI를 packages/betterliving-ui(@dndproperty/betterliving-ui)로 가져와 tsc+dist 기반 GitHub Packages 배포 가능하게 추가한다. @repo/ui는 유지.
todos:
  - id: copy-pkg
    content: packages/betterliving-ui 소스 복사 (dist/node_modules/.npmrc 토큰 제외)
    status: completed
  - id: wire-build
    content: .npmrc(registry only), README 정리, pnpm install + build 검증
    status: completed
  - id: adr-docs
    content: ADR 0011 + GUIDE/AGENTS/plans index
    status: completed
---

# Add @dndproperty/betterliving-ui

## Decision

- New package at `packages/betterliving-ui` (keep existing `@repo/ui` for Multi-Zones shared shadcn).
- Publish shape matches betterliving-standalone: `tsc` → `dist/`, explicit `exports`, GitHub Packages `publishConfig`.
- Do not copy auth tokens from source `.npmrc`.

## Done

- `pnpm --filter @dndproperty/betterliving-ui build` + `typecheck` OK
- ADR 0011 Accepted

## Non-goals

- Migrate passport/storybook off `@repo/ui`
- Publish to registry in this change (build only)
