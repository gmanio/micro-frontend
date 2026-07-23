# ADR 0008: Passport zone

- Status: Accepted
- Date: 2026-07-23

## Context

Need an auth/account surface as its own deployable Multi-Zones app.

## Decision

- Add **`apps/passport`** Next.js App Router zone.
- Path **`/passport`**, port **3100**, **`assetPrefix: '/passport-static'`** (no `basePath`).
- Home rewrites `/passport`, `/passport/:path+`, `/passport-static/_next/:path+` via `PASSPORT_URL` (`http://localhost:3100`).
- Uses `@repo/ui` (shadcn Button) + Tailwind globals.

## Consequences

- Cross-zone links use `<a href="/passport">`.
- `apps/home/.env*` includes `PASSPORT_URL=http://localhost:3100`.

## Alternatives considered

- Put auth under home — couples builds and conflicts with zone independence.

## References

- [0007](./0007-tailwind-shadcn-ui.md), [0009](./0009-remove-news-passport-3100.md) (port / news removal)
- https://nextjs.org/docs/app/guides/multi-zones
