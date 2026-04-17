# Fix Bug Workflow (SSR)

Use this skill when fixing defects in `packages/apps/ssr/`.

## Goal

Deliver a fix that is reproducible, minimal, verified, and safe for Next.js + Prisma behavior.

## Inputs Required

- Bug description and expected behavior
- Reproduction steps (if available)
- Scope boundaries (files/features that must not change)

## Procedure

1. Reproduce the issue

   - Capture the exact failing behavior and trigger conditions.
   - If not reproducible, define a hypothesis and the most likely failing path.

2. Locate root cause

   - Trace from entry point (`app/` route/component) to helper layer (`lib/`) and DB layer (`prisma/`) when applicable.
   - Confirm root cause with evidence (state, condition, nullability, or API mismatch).

3. Implement a minimal fix

   - Change the smallest set of files that resolves the defect.
   - Preserve existing architecture and naming patterns.
   - Add defensive checks for nullable/optional values when needed.

4. Add or update verification

   - Add a regression check where possible.
   - If no test framework exists, provide deterministic manual verification steps.

5. Validate before completion
   - Run `npm run lint`.
   - Run `npm run build`.
   - Report outcomes and any residual risk.

## Output Format

- Root cause
- Files changed
- Why this fix is safe
- Verification results
- Remaining risks / follow-up items

## Guardrails

- Do not expand scope into unrelated refactors.
- Do not introduce new dependencies unless necessary.
- Do not touch files outside `packages/apps/ssr/` unless explicitly requested.
