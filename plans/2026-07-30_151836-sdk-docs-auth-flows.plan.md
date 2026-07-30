---
name: SDK docs auth flows
created: 2026-07-30T15:18:36+09:00
updated: 2026-07-30T15:30:00+09:00
status: completed
overview: Fumadocs에 Passport 기준 가입·로그인·로그아웃 플로우를 문서화하고, 독립 SDK(반응형)를 semver로 배포한다.
todos:
  - id: plan-adr
    content: Dated plan + ADR 0015; supersede 0014; indexes/AGENTS/GUIDE/README
    status: completed
  - id: fumadocs-auth-flows
    content: Fumadocs auth Flows MDX; strip UI docs; Guides/API stubs
    status: completed
  - id: scaffold-responsive
    content: Scaffold packages/betterliving-sdk ./responsive
    status: completed
  - id: wire-demos-ci
    content: Guides/API demos + CI sdk then docs
    status: completed
  - id: version-publish
    content: 0.1.0 changelog + tag/manual GitHub Packages publish
    status: completed
  - id: verify
    content: Local docs + static build; close plan
    status: completed
---

# SDK docs: Passport auth flows first

Completed. See ADR [0015](../docs/adr/0015-betterliving-sdk-docs.md).

## Delivered

- `apps/docs` retargeted to `@dndproperty/betterliving-sdk` with Flows (signup/login/logout/overview)
- `packages/betterliving-sdk` @ 0.1.0 (`./globals.css`, `./responsive`)
- Docs CI builds sdk → docs; `sdk-publish.yml` on `sdk-v*` tags
- ADR 0015 Accepted; 0014 Superseded
