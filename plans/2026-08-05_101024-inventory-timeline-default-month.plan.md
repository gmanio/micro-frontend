---
name: InventoryTimeline default month zoom
created: 2026-08-05T10:10:24+09:00
updated: 2026-08-05T10:15:00+09:00
status: completed
overview: Change InventoryTimeline default visible range so react-calendar-timeline renders month columns instead of day columns.
todos:
  - id: default-range-year
    content: Widen getInventoryTimelineDefaultDateStart/End to calendar year (month unit via getMinUnit)
    status: completed
  - id: month-label
    content: Tweak secondary header month label for ko locale if needed
    status: completed
  - id: mark-done
    content: Mark plan completed + plans/README index
    status: completed
---

# InventoryTimeline default month unit

## Context

`react-calendar-timeline` picks header unit with `getMinUnit(zoom, width)`. Current default visible range is **this calendar month**, so on typical widths the secondary header is **day** (`24(금)`).

## Decision

Default visible range → **current calendar year** (`startOf("year")` … `endOf("year")`) so secondary header is **month** and primary is **year**. Zoom-in still allowed (`minZoom` ≈ 24 days) for day columns.

## Files

- `packages/betterliving-ui/src/components/InventoryTimeline/dayjs-setup.ts`
- Optional label tweak in `InventoryTimeline.tsx`
- Storybook already uses the same helpers — no story change required
