# ADR 0016: betterliving-ui optional feature peer dependencies

- Status: Accepted
- Date: 2026-08-06

## Context

`@dndproperty/betterliving-ui` ships multiple entrypoints (`SwiperMainBanner`, `InventoryTimeline`, `DisplayUnitEditor`, …). Listing feature-heavy libraries as always-installed `dependencies` forces every consumer to download them even when they only import a light entrypoint (e.g. `UnitCard`).

Build stays **tsc → dist** (ADR [0011](./0011-betterliving-ui-publishable.md)); we only adjust package metadata.

## Decision

Move feature-scoped packages to **optional** `peerDependencies`:

| Peer | Entrypoint(s) |
|------|----------------|
| `swiper`, `motion` | `./components/SwiperMainBanner` |
| `dayjs`, `react-calendar-timeline` | `./components/InventoryTimeline` |
| `@dnd-kit/abstract`, `@dnd-kit/dom`, `@dnd-kit/helpers`, `@dnd-kit/react` | `./components/DisplayUnitEditor`, `./lib/dnd` |
| `@lottiefiles/dotlottie-react` | `./components/LottieRenderer` |

Mark them in `peerDependenciesMeta` with `"optional": true` so installs do not hard-fail when unused.

Keep shared UI runtime deps (`@base-ui/react`, cva/clsx/tailwind-merge, lucide-react, globals CSS packages). Remove unused `interactjs`.

Keep the same packages in `devDependencies` so the package itself typechecks and builds.

## Consequences

- Consumers must install peers for the features they use (documented via package.json / this ADR).
- Published package install graph is lighter for apps that omit unused features.
- Storybook / host apps may need explicit peer installs after upgrade.

## Alternatives considered

- **Bundler + manualChunks** — changes ADR 0011 build; rejected for this change.
- **Split into multiple npm packages** — more publish/version overhead; deferred.
- **Keep all as dependencies** — simplest DX, heaviest installs; rejected.

## References

- Plan: `plans/2026-08-06_094432-betterliving-ui-optional-peers.plan.md`
- ADR [0011](./0011-betterliving-ui-publishable.md)
