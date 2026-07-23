# ADR 0009: Remove news zone; passport on 3100

- Status: Accepted
- Date: 2026-07-23
- Supersedes: [0003](./0003-news-zone.md)
- Updates: [0008](./0008-passport-zone.md) (port)

## Context

`/news` is no longer needed. Passport should run on port **3100** instead of 3002.

## Decision

- Delete **`apps/news`** and all home rewrites / env for `NEWS_URL`.
- Run **`apps/passport`** on port **3100**; `PASSPORT_URL=http://localhost:3100`.
- Remaining product zones: home, passport, storybook.

## Consequences

- Canonical secondary-zone example for new apps is passport (or storybook), not news.
- ADR 0003 is historical only (Superseded).

## Alternatives considered

- Keep news as a stub — rejected; unused surface.

## References

- [0003](./0003-news-zone.md), [0008](./0008-passport-zone.md)
