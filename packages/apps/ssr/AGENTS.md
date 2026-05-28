# @apps/ssr — H5 官网

Next.js 16 App Router，mobile-first（375 设计稿，`max-w-[430px]` 居中）。

## Read first

1. [lib/tokens.ts](./lib/tokens.ts) — 布局与主题色常量
2. [app/globals.css](./app/globals.css) — `:root` / `.dark` 语义色

## Commands

```bash
pnpm --filter @apps/ssr dev
pnpm --filter @apps/ssr build
pnpm --filter @apps/ssr lint:eslint:check
```

## Conventions

- 主题：`next-themes`，`attribute="class"`，`storageKey="h5-theme"`；禁止 `bg-white` / 硬编码色值
- 布局：`MobileShell`（Header 44px、TabBar 50px、safe-area）；内容 `px-4`
- 路由：`/` 首页 → `/heatmap`（Canvas 热力图，数据经 `app/heatmap/api/*` 服务端拉取）、`/dividend-rank` 占位；`/profile` 我的
- **不使用 Pencil**：无 `design/*.pen`，UI 以代码与 `lib/tokens.ts` 为准
- 不改 monorepo 内其他应用（`admin` / `micro-*`）

## Cursor 配置（本包 `.cursor/`）

- [.cursor/rules/h5-conventions.mdc](./.cursor/rules/h5-conventions.mdc)
- [.cursor/rules/h5-theme.mdc](./.cursor/rules/h5-theme.mdc)
- [.cursor/skills/h5-ssr-implement](./.cursor/skills/h5-ssr-implement/SKILL.md)
