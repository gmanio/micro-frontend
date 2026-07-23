---
name: HTTPS local Next.js dev
created: 2026-07-23T09:35:56+09:00
updated: 2026-07-23T09:37:30+09:00
status: completed
overview: apps/* Next.js dev를 --experimental-https로 통일하고, zone rewrite/환경변수/가이드를 https://localhost 기준으로 갱신한다.
todos:
  - id: scripts-env
    content: next apps dev에 --experimental-https + PASSPORT/STORYBOOK https URL
    status: completed
  - id: ca-trust
    content: root pnpm dev에 NODE_EXTRA_CA_CERTS(mkcert) + certificates gitignore
    status: completed
  - id: docs-adr
    content: ADR 0012 + GUIDE/AGENTS/README/multi-zones 규칙 갱신
    status: completed
---

# HTTPS local Next.js dev

## Decision

- `next dev --experimental-https` on home / passport / storybook
- Default zone URLs `https://localhost:3100` / `:6006`
- Home rewrite TLS: `NODE_EXTRA_CA_CERTS=$(mkcert -CAROOT)/rootCA.pem`
- Storybook CLI (`dev:stories` :6007) stays HTTP (not a Next app)

## Verified

- `next dev --experimental-https --port 3000` → `https://localhost:3000` Ready
