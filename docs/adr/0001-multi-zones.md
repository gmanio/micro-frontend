# ADR 0001: Adopt Next.js Multi-Zones

- Status: Accepted
- Date: 2026-07-22

## Context

We need a micro-frontend approach for independently developed surfaces under one product domain, starting with news and Storybook.

## Decision

Use **Next.js Multi-Zones** (path-based apps + rewrites/proxy) instead of Module Federation or a single monolith.

## Consequences

- Zones deploy and build independently.
- Cross-zone navigation is a hard navigation.
- A domain router (home) or HTTP proxy is required for a single origin.

## Alternatives considered

- **Module Federation** — richer runtime sharing, more operational complexity; deferred.
- **Single Next app** — simpler, but couples build/deploy of unrelated surfaces.

## References

- https://nextjs.org/docs/app/guides/multi-zones
- https://github.com/vercel/next.js/tree/canary/examples/with-zones
- Related: [0002](./0002-home-as-router.md)
