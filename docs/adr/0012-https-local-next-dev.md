# ADR 0012: HTTPS for local Next.js Multi-Zones

- Status: Accepted
- Date: 2026-07-23

## Context

Local Multi-Zones previously used plain HTTP. Features that require a secure context (cookies/`Secure`, some auth flows, browser APIs) need HTTPS on localhost. Next.js provides `next dev --experimental-https` (mkcert-backed self-signed certs).

## Decision

- All Next apps (`home`, `passport`, `storybook`) run **`next dev --experimental-https`**.
- Zone rewrite defaults / `.env*`: **`https://localhost:3100`**, **`https://localhost:6006`**.
- Root `pnpm dev` sets **`NODE_EXTRA_CA_CERTS=$(mkcert -CAROOT)/rootCA.pem`** so home’s Node rewrites trust mkcert certs.
- Generated `certificates/` dirs are gitignored.
- **Out of scope:** Storybook CLI HMR (`dev:stories` on `:6007`) stays HTTP; `next start` / production remain deployment HTTPS.

## Consequences

- Dev URLs are `https://localhost:3000` (and direct zone ports).
- First run may prompt/install mkcert CA; `mkcert` must be available on PATH for cert generation and `NODE_EXTRA_CA_CERTS`.
- Browser may show a trust warning until the local CA is installed (`mkcert -install`).

## Alternatives considered

- **HTTP only** — insufficient for secure-context testing.
- **Custom reverse proxy (Caddy/nginx)** — more moving parts for local DX; rejected for now.
- **`NODE_TLS_REJECT_UNAUTHORIZED=0`** — disables all TLS verification; prefer mkcert CA injection.

## References

- https://nextjs.org/docs/app/api-reference/cli/next#next-dev-options
- https://vercel.com/kb/guide/access-nextjs-localhost-https-certificate-self-signed
