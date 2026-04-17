# PR Review Checklist (SSR)

Use this skill to review pull requests affecting `packages/apps/ssr/`.

## Review Priorities

1. Correctness and regressions
2. Data safety and null handling
3. Next.js rendering/runtime constraints
4. Maintainability and scope control
5. Verification completeness

## Checklist

- Behavior

  - Does the change satisfy stated acceptance criteria?
  - Are edge cases covered (empty, null, loading, error)?

- Next.js specific

  - Server vs Client Component boundaries are correct.
  - Route/layout conventions remain valid under `app/`.
  - No browser-only APIs used in server-only contexts.

- Prisma/data

  - Schema and usage are consistent.
  - Nullable fields are handled defensively.
  - No secrets or sensitive values exposed.

- Code quality

  - Diff is focused and free of unrelated refactors.
  - Naming and structure follow local conventions.
  - Comments are concise and only where necessary.

- Validation
  - `npm run lint` passes.
  - `npm run build` passes.
  - Manual verification steps are provided when tests are absent.

## Severity Rubric

- High: user-visible breakage, data loss/corruption risk, security issue
- Medium: functional edge-case risk, significant maintainability problem
- Low: minor clarity/style issue with low behavior risk

## Review Output Format

- Findings first, ordered by severity
- For each finding: risk, impacted file, recommended fix
- Open questions/assumptions
- Brief change summary
- Residual risk and follow-up tests

## Guardrails

- Focus on risks and behavior, not personal style preference.
- Keep recommendations actionable and scoped.
- Do not require changes outside `packages/apps/ssr/` unless unavoidable.
