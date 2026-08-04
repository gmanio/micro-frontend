---
name: InventoryTimeline UI component
created: 2026-07-31T16:13:10+09:00
updated: 2026-07-31T16:13:10+09:00
status: completed
overview: Port lp-admin inventory timeline into @dndproperty/betterliving-ui as InventoryTimeline; Storybook mock from Creator Town Seogyo rooms API.
todos:
  - id: dated-plan-inv-tl
    content: Dated plan + plans/README for InventoryTimeline
    status: completed
  - id: scaffold-inv-tl
    content: Add react-calendar-timeline@0.30.0-beta.18 + dayjs; scaffold InventoryTimeline + CSS + exports
    status: completed
  - id: port-timeline-ui
    content: Port map/colors/renderers from lp-admin inventory + FacilityActiveTable
    status: completed
  - id: verify-inv-tl
    content: Storybook fixture mock + stories; build package; asset/inventory docs note
    status: completed
---

# InventoryTimeline in betterliving-ui

## Goal

Presentational `InventoryTimeline` in [`packages/betterliving-ui`](../packages/betterliving-ui), patterned after DisplayUnitEditor. Host owns fetch/dialogs/routing.

## Package surface

- `@dndproperty/betterliving-ui/components/InventoryTimeline`
- `@dndproperty/betterliving-ui/inventory-timeline.css`
- Deps: `react-calendar-timeline@0.30.0-beta.18`, `dayjs`

## Mock / Storybook

- Fixture from Creator Town Seogyo rooms API shape
- Stories: Default (bars) + EmptyBars
- Wire Vite alias for `@dndproperty/betterliving-ui` in apps/storybook

## Non-goals

- Admin app migration; SDK inventory fetch; ADR (component-only under 0011)
