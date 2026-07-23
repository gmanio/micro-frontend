# ADR 0003: News zone shape

- Status: Superseded
- Date: 2026-07-22
- Superseded by: [0009](./0009-remove-news-passport-3100.md)

## Context

The news surface must own `/news` without colliding with home assets, following current Multi-Zones guidance.

## Decision

Implement **`apps/news`** with:

- Routes under `app/news/*` (URL `/news`)
- `assetPrefix: '/news-static'`
- **No** `basePath`

Home rewrites `/news`, `/news/:path+`, and `/news-static/_next/:path+` to the news origin.

## Consequences

- Matches the canary with-zones `blog` app pattern.
- Avoids double-prefix issues from combining `basePath` and `assetPrefix`.

## Alternatives considered

- **`basePath: '/news'`** — older README wording; canary example uses route segments + `assetPrefix` instead.

## References

- https://nextjs.org/docs/app/guides/multi-zones
- ADR [0002](./0002-home-as-router.md)
