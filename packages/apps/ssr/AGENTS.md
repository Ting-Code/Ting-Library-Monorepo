<!-- BEGIN:nextjs-agent-rules -->

# SSR App Agent Rules

This app uses a newer Next.js version and may differ from common examples. Before adding or changing framework-level behavior, check the local docs in `node_modules/next/dist/docs/` and follow deprecation guidance.

<!-- END:nextjs-agent-rules -->

## Scope

- Apply these rules only inside `packages/apps/ssr/`.
- Do not modify files outside this app unless explicitly asked.

## Architecture Constraints

- Keep App Router structure under `app/` (`layout.tsx`, `page.tsx`, route folders).
- Reusable server-side helpers go in `lib/`.
- Prisma schema lives in `prisma/schema.prisma`.
- Prefer Server Components by default; use Client Components only when browser APIs or interactivity are required.

## Implementation Standards

- Keep changes minimal and focused on the requested task.
- Preserve existing naming/style conventions in touched files.
- Add small comments only when logic is not obvious.
- Avoid introducing new dependencies unless required.

## Validation Checklist

After code changes in this app, run:

1. `npm run lint`
2. `npm run build` for framework/type safety verification

If a command cannot be run, explain why and provide manual verification steps.

## Prisma and Data Safety

- Update `prisma/schema.prisma` and related usage together.
- Do not commit secrets or credentials.
- Prefer defensive handling for nullable DB fields in UI and server logic.

## Prompting Conventions for AI Agents

When requesting implementation work, include:

- Goal and acceptance criteria
- Affected files/folders under `packages/apps/ssr/`
- Non-goals (what must not change)
- Required validation commands

## Local Skills

Project-specific reusable skills are available in:

- `.cursor/skills/fix-bug-workflow/SKILL.md`
- `.cursor/skills/pr-review-checklist/SKILL.md`
