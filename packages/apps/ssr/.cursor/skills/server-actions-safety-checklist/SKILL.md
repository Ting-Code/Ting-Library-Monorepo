# Server Actions Safety Checklist (SSR)

Use this skill whenever adding or modifying Server Actions in `packages/apps/ssr/`.

## Goal

Ensure write operations are safe, predictable, and observable.

## Checklist

1. Input validation

   - Validate all action inputs before business logic.
   - Reject malformed or missing required values with clear errors.

2. Authorization and trust boundaries

   - Verify caller permissions for sensitive operations.
   - Never trust client-provided identifiers without server-side checks.

3. Idempotency and duplicate submissions

   - Consider repeated submissions due to retries/user double-clicks.
   - Add idempotency protection where duplicate writes are harmful.

4. Prisma write safety

   - Handle nullable fields and defaults explicitly.
   - Keep schema assumptions aligned with `prisma/schema.prisma`.
   - Use transaction boundaries when multiple dependent writes are required.

5. Error mapping

   - Map internal errors to stable, user-safe messages.
   - Avoid leaking stack traces or sensitive details to clients.

6. Cache and UI consistency

   - Trigger required revalidation or refresh behavior after successful writes.
   - Confirm post-action UI reflects latest server state.

7. Observability

   - Add concise server-side logs for action start/failure/success when appropriate.
   - Include identifiers that help troubleshooting without exposing secrets.

8. Verification
   - Validate happy path, invalid input, unauthorized path, and duplicate submission scenario.
   - Run `npm run lint` and `npm run build`.

## Output Format

- Action risks reviewed
- Checks applied
- Files changed
- Validation evidence
- Residual risks and follow-up work

## Guardrails

- Keep action scope minimal and explicit.
- Avoid hidden side effects across unrelated routes/components.
- Do not modify files outside `packages/apps/ssr/` unless explicitly requested.
