# ADR 0011: Publishable @dndproperty/betterliving-ui

- Status: Accepted
- Date: 2026-07-23

## Context

Better Living needs a UI package that can be published (GitHub Packages) and consumed outside this Multi-Zones monorepo. Existing `@repo/ui` is private, source-exported, and tuned for Next zones (passport/storybook), not standalone publish.

## Decision

- Add **`packages/betterliving-ui`** named **`@dndproperty/betterliving-ui`**.
- Build: **`tsc` → `dist/`** + copy `globals.css` (no bundler); publish `"files": ["dist"]`.
- Registry: GitHub Packages (`publishConfig.registry`), restricted access.
- Keep **`@repo/ui`** for Multi-Zones shared UI (ADR [0007](./0007-tailwind-shadcn-ui.md)).

## Consequences

- Zone apps continue on `@repo/ui` unless explicitly migrated.
- Consumers of betterliving-ui must provide React + Tailwind v4 peers and `@source` the package `dist/` for class scanning.
- Auth for publish stays in local/user `.npmrc` / CI secrets — never commit tokens.

## Alternatives considered

- **Replace `@repo/ui`** — breaks passport/storybook design system; rejected for now.
- **Bundle with tsup** — unnecessary; source package is tsc-only and works for Next/Vite consumers.

## References

- Source: `betterliving-standalone/packages/ui`
- https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry
