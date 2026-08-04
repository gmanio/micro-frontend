---
name: betterliving-ui deps latest + build
created: 2026-07-31T16:22:12+09:00
updated: 2026-07-31T16:26:00+09:00
status: completed
overview: Install @dndproperty/betterliving-ui dependencies at latest (add missing timeline deps), then verify package build.
todos:
  - id: add-missing-deps
    content: Add dayjs + react-calendar-timeline + interactjs to package.json
    status: completed
  - id: install-latest
    content: pnpm update/install latest for betterliving-ui deps
    status: completed
  - id: verify-build
    content: Run package build and confirm success
    status: completed
---

# betterliving-ui deps latest + build

## Goal

Resolve `"latest"` (and missing) deps for `@dndproperty/betterliving-ui`, install, and confirm `pnpm --filter @dndproperty/betterliving-ui build` succeeds.

## Notes

- Added `dayjs`, `react-calendar-timeline@0.30.0-beta.19`, `interactjs` for InventoryTimeline.
- pnpm rejects `"latest"` in `peerDependencies`; peers use valid semver.
- TypeScript npm `latest` is 7.x, which breaks `typescript-eslint` peer (`<6.1.0`); pin TypeScript to latest 5.x if peers matter for lint.
