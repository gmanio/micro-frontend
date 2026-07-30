---
name: Betterliving UI docs site
created: 2026-07-30T10:03:43+09:00
updated: 2026-07-30T10:20:00+09:00
status: completed
overview: Fumadocs static site for @dndproperty/betterliving-ui consumers; GitHub Pages; not a Multi-Zone.
todos:
  - id: plan-adr
    content: Add dated plan + ADR 0014; update indexes/GUIDE/AGENTS
    status: completed
  - id: scaffold-docs
    content: Scaffold apps/docs with Fumadocs static export
    status: completed
  - id: content-ia
    content: Landing + Guides + API MDX with demos
    status: completed
  - id: gh-pages-ci
    content: GitHub Actions Pages workflow
    status: completed
  - id: verify
    content: Static build preview; mark plan completed
    status: completed
---

# Better Living UI docs site (Fumadocs → GitHub Pages)

Shipped: `apps/docs` + ADR [0014](../docs/adr/0014-betterliving-ui-docs-site.md) + `.github/workflows/docs.yml`.

Local: `pnpm --filter @dndproperty/betterliving-ui build && pnpm dev:docs` → http://localhost:3200  
Pages: enable GitHub Actions source; URL `https://<org>.github.io/micro-frontend/`.
