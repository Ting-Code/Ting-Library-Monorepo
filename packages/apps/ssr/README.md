# SSR App

Minimal Next.js App Router starter for the `packages/apps/ssr` workspace.

## Scripts

- `npm run dev`: start local development server
- `npm run lint`: run eslint checks
- `npm run build`: run production build checks
- `npm run start`: start production server after build

## Structure

- `app/`: routes, layouts, and pages
- `lib/`: shared server-side utilities
- `prisma/`: Prisma schema
- `.cursor/skills/`: project-specific AI workflows

## Notes

- Keep all app-specific changes inside `packages/apps/ssr/`.
- For AI collaboration conventions, see `AGENTS.md`.
