# ADR 0005: Plan-first dated archive

- Status: Accepted
- Date: 2026-07-22

## Context

Work was planned in ad-hoc or single overwritten plan files. We need durable history and a default that agents implement from plans and project docs rather than inventing structure.

## Decision

- Store plans only under **`plans/`** with filenames `YYYY-MM-DD_HHmmss-short-kebab-slug.plan.md`.
- **Append-only**: do not overwrite or delete prior plans; supersede via new files + `status`.
- Prefer **plan → ADR (if architecture) → code**, documented in GUIDE / AGENTS / `.cursor/rules/plan-first.mdc`.
- Allow `plans/` in root directory allowlist.

## Consequences

- Clear audit trail of how the repo evolved.
- Slightly more process for agents on non-trivial tasks.
- Trivial fixes may skip a plan.

## Alternatives considered

- **Single mutable PLAN.md** — loses history.
- **Only Cursor cloud plans** — not in-repo; harder for humans/CI to review.

## References

- [`plans/README.md`](../../plans/README.md)
- `.cursor/rules/plan-first.mdc`
