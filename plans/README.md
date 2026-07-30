# Plans

이 폴더는 **덮어쓰지 않고 아래에 계속 쌓는** 작업 플랜 아카이브다. 구현은 가급적 플랜 → ADR/GUIDE → 코드 순으로 진행한다.

## Naming

```text
YYYY-MM-DD_HHmmss-short-kebab-slug.plan.md
```

예: `2026-07-22_174300-multi-zones-scaffold.plan.md`

- 시각은 **로컬 타임존** (이 레포는 KST 기준 기록)
- 같은 주제를 고쳐도 **기존 파일을 수정·삭제하지 말고** 새 timestamp 파일 추가
- 이전 플랜을 대체하면 이전 파일 `status: superseded`, 새 파일에서 링크

## Frontmatter

```yaml
---
name: Short title
created: 2026-07-22T17:43:00+09:00
updated: 2026-07-22T17:49:00+09:00
status: active | completed | superseded
overview: One-line summary
todos:
  - id: step-id
    content: What to do
    status: pending | completed | cancelled
---
```

## Index (newest first)

| File | Name | Status | Created |
|------|------|--------|---------|
| [2026-07-30_160918-docs-domain-ia-modusign.plan.md](./2026-07-30_160918-docs-domain-ia-modusign.plan.md) | Docs domain IA + ModuSign | completed | 2026-07-30T16:09:18+09:00 |
| [2026-07-30_155305-betterliving-contract-docs.plan.md](./2026-07-30_155305-betterliving-contract-docs.plan.md) | Better Living contract docs | completed | 2026-07-30T15:53:05+09:00 |
| [2026-07-30_154058-betterliving-i18n-docs.plan.md](./2026-07-30_154058-betterliving-i18n-docs.plan.md) | Better Living i18n docs | completed | 2026-07-30T15:40:58+09:00 |
| [2026-07-30_151836-sdk-docs-auth-flows.plan.md](./2026-07-30_151836-sdk-docs-auth-flows.plan.md) | SDK docs auth flows | completed | 2026-07-30T15:18:36+09:00 |
| [2026-07-30_100343-betterliving-ui-docs-site.plan.md](./2026-07-30_100343-betterliving-ui-docs-site.plan.md) | Betterliving UI docs site | completed | 2026-07-30T10:03:43+09:00 |
| [2026-07-24_112050-upgrade-tw-ts-next.plan.md](./2026-07-24_112050-upgrade-tw-ts-next.plan.md) | Upgrade TW / TS / Next | completed | 2026-07-24T11:20:50+09:00 |
| [2026-07-23_110023-storybook-zone-hmr-dev.plan.md](./2026-07-23_110023-storybook-zone-hmr-dev.plan.md) | Storybook zone live HMR | completed | 2026-07-23T11:00:23+09:00 |
| [2026-07-23_100918-storybook-all-ui-components.plan.md](./2026-07-23_100918-storybook-all-ui-components.plan.md) | Storybook all UI components | completed | 2026-07-23T10:09:18+09:00 |
| [2026-07-23_100758-add-all-shadcn-ui.plan.md](./2026-07-23_100758-add-all-shadcn-ui.plan.md) | Add all shadcn to @repo/ui | completed | 2026-07-23T10:07:58+09:00 |
| [2026-07-23_093556-https-local-next-dev.plan.md](./2026-07-23_093556-https-local-next-dev.plan.md) | HTTPS local Next.js dev | completed | 2026-07-23T09:35:56+09:00 |
| [2026-07-23_093430-add-betterliving-ui.plan.md](./2026-07-23_093430-add-betterliving-ui.plan.md) | Add betterliving-ui package | completed | 2026-07-23T09:34:30+09:00 |
| [2026-07-23_090323-fix-storybook-blank-ui.plan.md](./2026-07-23_090323-fix-storybook-blank-ui.plan.md) | Fix Storybook blank UI | completed | 2026-07-23T09:03:23+09:00 |
| [2026-07-23_085308-upgrade-nextjs-16.plan.md](./2026-07-23_085308-upgrade-nextjs-16.plan.md) | Upgrade Next.js 16 | completed | 2026-07-23T08:53:08+09:00 |
| [2026-07-23_084621-readme-ttarotoggati.plan.md](./2026-07-23_084621-readme-ttarotoggati.plan.md) | README 따로또같이 | completed | 2026-07-23T08:46:21+09:00 |
| [2026-07-23_083149-remove-news-passport-3100.plan.md](./2026-07-23_083149-remove-news-passport-3100.plan.md) | Remove news; passport 3100 | completed | 2026-07-23T08:31:49+09:00 |
| [2026-07-23_075937-ui-shadcn-passport-zone.plan.md](./2026-07-23_075937-ui-shadcn-passport-zone.plan.md) | UI shadcn + passport zone | completed | 2026-07-23T07:59:37+09:00 |
| [2026-07-22_180500-nextjs-storybook-zone.plan.md](./2026-07-22_180500-nextjs-storybook-zone.plan.md) | Next.js Storybook Zone | completed | 2026-07-22T18:05:00+09:00 |
| [2026-07-22_175200-plan-based-workflow.plan.md](./2026-07-22_175200-plan-based-workflow.plan.md) | Plan-based workflow | completed | 2026-07-22T17:52:00+09:00 |
| [2026-07-22_174300-multi-zones-scaffold.plan.md](./2026-07-22_174300-multi-zones-scaffold.plan.md) | Multi-Zones Scaffold | completed | 2026-07-22T17:43:00+09:00 |

## Workflow

1. 비트리비얼 작업 시작 전 `plans/`에 새 플랜 작성 (`status: active`)
2. 사용자 확인 후 구현 (또는 사용자가 실행을 명시한 경우)
3. 아키텍처 결정이면 같은 변경에 `docs/adr/` ADR 추가
4. 완료 시 플랜 todos/`status: completed`, 이 README 인덱스 갱신

자세한 규칙은 `docs/GUIDE.md`, `AGENTS.md`, `.cursor/rules/plan-first.mdc` 참고.
