---
name: route-handler-api-best-practices
description: Define and review Next.js Route Handler API design, validation, error mapping, and response consistency. Use when creating or modifying app/api routes, backend endpoints, or request/response contracts in the SSR app.
---

# Route Handler API Best Practices

Use this skill for files under `app/api/**/route.ts`.

## Quick Rules

1. Keep handlers thin; move business logic to `lib/`.
2. Validate input early (query/body/params).
3. Return stable JSON shape for both success and error.
4. Map internal exceptions to safe client-facing messages.
5. Use explicit status codes (`400`, `401`, `403`, `404`, `409`, `500`).

## Implementation Checklist

- Contract

  - Define expected request fields and response fields first.
  - Keep naming consistent across all endpoints.

- Validation

  - Validate required fields and type shape before writes.
  - Return `400` on malformed requests with actionable message.

- Auth/Authz

  - Verify identity and permissions before sensitive reads/writes.
  - Never trust client-provided ownership identifiers directly.

- Data Safety

  - Handle nullable DB fields defensively.
  - Avoid leaking internal IDs or stack traces in responses.

- Error Strategy
  - Use deterministic error payload format.
  - Keep internal logs detailed, external errors minimal.

## Output Format

- Endpoint(s) changed
- Input/output contract
- Validation and auth checks added
- Error mapping table
- Verification steps and results
