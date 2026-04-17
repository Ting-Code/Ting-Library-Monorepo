# New Feature Next.js Workflow (SSR)

Use this skill when implementing a new feature in `packages/apps/ssr/`.

## Goal

Ship a feature that is correct, minimal, and aligned with Next.js App Router conventions.

## Inputs Required

- Feature goal and acceptance criteria
- Affected route(s) and files in `app/`, `lib/`, and `prisma/` (if any)
- Non-goals and explicit scope boundaries

## Procedure

1. Define implementation strategy

   - Identify whether logic belongs in Server Components, Client Components, Route Handlers, or Server Actions.
   - Explain the chosen boundaries and why they are safe.

2. Model data flow

   - Define data source and fetch path.
   - Specify loading, empty, success, and error states.
   - Define cache/revalidation behavior for read paths.

3. Implement minimal slices

   - Build feature incrementally with small, focused edits.
   - Keep route structure and file conventions under `app/` intact.
   - Move reusable logic to `lib/` only when used by multiple call sites.

4. Validate edge behavior

   - Verify null/optional data handling.
   - Verify fallback UI for slow and failed requests.
   - Verify server/client boundary correctness.

5. Final validation
   - Run `npm run lint`.
   - Run `npm run build`.
   - Provide manual QA steps when automated tests are unavailable.

## Output Format

- Feature scope implemented
- Files changed and purpose
- Boundary decisions (server/client/runtime)
- Validation results
- Known limitations and next steps

## Guardrails

- Do not add unrelated refactors.
- Do not introduce new dependencies unless required.
- Do not modify files outside `packages/apps/ssr/` unless explicitly requested.
