# ADR 0007: Tailwind + shadcn in @repo/ui

- Status: Accepted
- Date: 2026-07-23

## Context

Shared UI used inline styles. We need a consistent design system for zones (passport, storybook, and future apps).

## Decision

- Host **Tailwind CSS v4** + **shadcn/ui (new-york)** in [`packages/ui`](../../packages/ui).
- Export tokens via `@repo/ui/globals.css`; apps import it and use `@tailwindcss/postcss`.
- Components live under `packages/ui/src/components/ui/*` with `cn` in `lib/utils`.
- CLI could not auto-detect a framework in the package; config is manual (`components.json`) for future `shadcn add`.

## Consequences

- Zones must import globals CSS and transpile `@repo/ui`.
- Adding components: prefer `pnpm dlx shadcn@latest add <name> --cwd packages/ui` once CLI works, or copy registry source into `components/ui`.

## Alternatives considered

- Per-app shadcn — duplicates tokens/components across zones.
- CSS-in-JS only — worse Storybook/Tailwind alignment.

## References

- https://ui.shadcn.com/docs
- Related: [0008](./0008-passport-zone.md)
