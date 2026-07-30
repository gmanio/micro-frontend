# ADR 0015: Better Living SDK docs-first + independent package

- Status: Accepted
- Date: 2026-07-30
- Deciders: —

## Context

ADR [0014](./0014-betterliving-ui-docs-site.md) targeted `apps/docs` at `@dndproperty/betterliving-ui` component API. Product docs need **service flows** (Passport signup / login / logout) first, and a separate publishable **SDK** for Better Living app layout (`./responsive`) that must not depend on betterliving-ui.

Auth UI and backend remain owned by Better Living Passport; the docs site documents flows without shipping auth APIs in the SDK.

## Decision

- Retarget **`apps/docs`** (Fumadocs, static export → GitHub Pages) to **`@dndproperty/betterliving-sdk`** only: Flows (auth), Guides, responsive API, Changelog.
- Add **`packages/betterliving-sdk`** (`@dndproperty/betterliving-sdk`), independent of betterliving-ui; v1 exports `./globals.css` and `./responsive` only (no `screens/*`).
- **Docs-first:** auth flow MDX lands before or with the responsive API; no live auth demos (no backend in docs).
- **Semver** publish to GitHub Packages; publish is **tag/manual** (e.g. `sdk-v*`), not on every main push.
- Docs CI builds **sdk → docs**. Standalone site remains **not** a Multi-Zone (no home `/docs` rewrite).

This **supersedes** ADR [0014](./0014-betterliving-ui-docs-site.md) for the public docs target. betterliving-ui remains a separate publishable package (ADR [0011](./0011-betterliving-ui-publishable.md)); its Storybook/zone usage is unchanged.

## Consequences

- Consumers of the docs site follow Passport auth contracts and SDK responsive mount, not atom component catalogs.
- Versioning of SDK and docs changelog are coupled; UI package versioning stays separate.
- Root `pnpm dev:docs` still serves `:3200` for local docs.

## Alternatives considered

- **Keep docs on betterliving-ui** — rejected; flows and SDK are the product reference surface.
- **Ship auth screens in SDK v1** — rejected; Passport owns routes/API; docs-only for auth in v1.
- **Zone under `/docs`** — still rejected (same as 0014).

## References

- Better Living Passport auth flows (`/passport` — signup / login / logout)
- ADR [0011](./0011-betterliving-ui-publishable.md), [0014](./0014-betterliving-ui-docs-site.md)
- https://fumadocs.dev
