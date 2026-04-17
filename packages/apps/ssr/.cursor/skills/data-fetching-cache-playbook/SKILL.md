---
name: data-fetching-cache-playbook
description: Choose safe Next.js data-fetching and cache/revalidation strategies for server-rendered pages. Use when implementing or reviewing fetch logic, cache behavior, and loading/error states in the SSR app.
---

# Data Fetching and Cache Playbook

Use this skill when adding read paths in `app/` or shared fetch helpers in `lib/`.

## Decision Flow

1. Is data user-specific or sensitive?
   - Yes: prefer per-request fresh data strategy.
   - No: consider cache/revalidation.
2. Is freshness strict?
   - Strict: reduce caching and make refresh explicit.
   - Flexible: use revalidation window.
3. Is response slow or unstable?
   - Add loading fallback and error UI path.

## Required Checks

- Data states

  - Implement loading, empty, success, and error states.
  - Ensure fallback content is meaningful.

- Cache correctness

  - Document chosen strategy and why.
  - Confirm post-mutation views can refresh/revalidate.

- Boundary safety

  - Keep server-only logic in server context.
  - Do not expose sensitive fields to client components.

- Failure handling
  - Handle network timeouts and partial failures gracefully.
  - Keep user-visible error messages stable and safe.

## Output Format

- Fetch location and data source
- Cache/revalidation strategy
- State handling coverage
- Risks and mitigation
- Verification checklist
