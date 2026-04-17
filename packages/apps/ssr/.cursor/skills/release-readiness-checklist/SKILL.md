---
name: release-readiness-checklist
description: Run a pre-release quality and risk checklist for Next.js SSR changes. Use before merging or releasing features to verify correctness, safety, and operational readiness.
---

# Release Readiness Checklist

Use this skill before merge or deployment for `packages/apps/ssr/`.

## Checklist

1. Functional correctness

   - Acceptance criteria are met.
   - Core happy path and edge paths are verified.

2. SSR and runtime safety

   - Server/Client boundaries are valid.
   - No browser-only APIs in server contexts.
   - Metadata/layout changes do not break route hierarchy.

3. Data and mutation safety

   - Prisma schema assumptions match runtime usage.
   - Nullable/optional fields are handled.
   - Server Actions and API writes include validation and safe errors.

4. Performance sanity

   - No unnecessary client bundle growth.
   - No accidental extra round-trips on first render.

5. Validation gates
   - `npm run lint` passes.
   - `npm run build` passes.
   - Manual regression steps are documented for changed flows.

## Output Format

- Release scope
- High/medium/low risks
- Gate results (lint/build/manual)
- Blockers
- Follow-up items after merge
