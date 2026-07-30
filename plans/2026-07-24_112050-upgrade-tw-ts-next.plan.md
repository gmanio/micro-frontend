---
name: Upgrade Tailwind, TypeScript, Next
created: 2026-07-24T11:20:50+09:00
updated: 2026-07-24T11:25:00+09:00
status: completed
overview: Align monorepo package ranges to latest stable Tailwind 4.3.3, TypeScript 7.0.2, and Next.js 16.2.11; refresh lockfile.
todos:
  - id: bump-ranges
    content: Bump typescript/tailwind/@tailwindcss*/next ranges in all package.json
    status: completed
  - id: install
    content: pnpm install / update lockfile to resolve latest
    status: completed
  - id: verify
    content: Spot-check typecheck / why for resolved versions
    status: completed
  - id: close-plan
    content: Mark plan completed; update plans/README.md
    status: completed
---

# Upgrade Tailwind, TypeScript, Next

## Targets (npm `latest`, 2026-07-24)

| Package | Latest | Result |
|---------|--------|--------|
| `next` | 16.2.11 | Already latest; lock confirmed |
| `typescript` | 7.0.2 | All packages → `^7.0.2`; resolved 7.0.2 |
| `tailwindcss` / `@tailwindcss/*` | 4.3.3 | Ranges → `^4.3.3`; resolved 4.3.3 |

## Follow-ups done

- Removed obsolete `baseUrl` from `packages/ui/tsconfig.json` (TS 7 `TS5102`)
- `tw-animate-css` → `^1.4.0` in `@repo/ui`

## Known peer lag

- `typescript-eslint@8.65` still peers `typescript <6.1.0` — install warns; typecheck/build OK
