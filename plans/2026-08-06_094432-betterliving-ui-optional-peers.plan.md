---
name: betterliving-ui optional peer deps
created: 2026-08-06T09:44:32+09:00
updated: 2026-08-06T09:50:00+09:00
status: completed
overview: Keep tsc build; move feature-heavy deps to optional peerDependencies so consumers only install what their entrypoints need.
todos:
  - id: plan-peers
    content: Dated plan + ADR for optional peer deps
    status: completed
  - id: package-json-peers
    content: Move swiper/motion/dayjs/RCT/dnd-kit to optional peers; remove unused interactjs; keep in devDeps
    status: completed
  - id: storybook-peers
    content: Add missing peer packages to apps/storybook for InventoryTimeline / DisplayUnitEditor stories
    status: completed
  - id: verify-build
    content: pnpm install + betterliving-ui build + storybook typecheck
    status: completed
---

# betterliving-ui optional peer dependencies

## Goal

Lighter install for consumers without changing `tsc` build (ADR 0011).

## Peers (optional)

| Package | Used by |
|---------|---------|
| `swiper` | SwiperMainBanner |
| `motion` | SwiperMainBanner |
| `dayjs` | InventoryTimeline |
| `react-calendar-timeline` | InventoryTimeline |
| `@dnd-kit/abstract`, `@dnd-kit/dom`, `@dnd-kit/helpers`, `@dnd-kit/react` | DisplayUnitEditor / `lib/dnd` |

Remove unused `interactjs`.

Keep as runtime deps: `@base-ui/react`, cva/clsx/tailwind-merge, lucide-react, shadcn/fontsource/tw-animate (globals), zod if needed.

## Consumer note

Apps importing those entrypoints must install the matching peers (lp-admin, warp-web, storybook).
