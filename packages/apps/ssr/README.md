# SSR App

Minimal Next.js App Router starter for the `packages/apps/ssr` workspace.

## Scripts

在 **`packages/apps/ssr`** 下推荐使用 **pnpm**（与 monorepo 根目录一致）：

- `pnpm dev`: start local development server (Next.js)
- `pnpm lint` / `pnpm lint:eslint`: ESLint checks（继承仓库根目录 **Flat Config**：`eslint.config.mjs` → `configs/lint/eslint.mjs`）
- `pnpm build`: production build
- `pnpm start`: production server after `pnpm build`

## Structure

- `app/`: routes, layouts, and pages
- `lib/`: shared server-side utilities
- `prisma/`: Prisma schema
- `.cursor/skills/`: project-specific AI workflows

## Notes

- Keep all app-specific changes inside `packages/apps/ssr/`.
- For AI collaboration conventions, see `AGENTS.md`.
