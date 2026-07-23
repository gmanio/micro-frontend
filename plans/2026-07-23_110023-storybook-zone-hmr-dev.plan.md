---
name: Storybook zone live HMR
created: 2026-07-23T11:00:23+09:00
updated: 2026-07-23T11:10:00+09:00
status: completed
overview: Local /storybook via home proxies Storybook Vite HMR so UI/story edits apply without rebuild.
todos:
  - id: plan-adr
    content: Add ADR 0013; adjust ADR 0010 base note
    status: completed
  - id: vite-base-hmr
    content: Vite base=/storybook/ + HMR clientPort 6007
    status: completed
  - id: dev-script
    content: Storybook package dev runs Next+Vite; env points home to :6007
    status: completed
  - id: docs
    content: Update GUIDE, AGENTS, multi-zones rule, ADR/plans indexes
    status: completed
  - id: verify
    content: Smoke zone URL HMR without rebuild
    status: completed
---

# Storybook zone live HMR in local dev

See Cursor plan + ADR 0013.

Local default: `STORYBOOK_URL=http://localhost:6007` with Vite `base: /storybook/`. Static verification still available via `https://localhost:6006`.
