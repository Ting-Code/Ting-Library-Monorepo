# @apps/ssr — H5 官网

Next.js 16 App Router，mobile-first（375 设计稿，`max-w-[430px]` 居中）。

## Read first

1. [lib/tokens.ts](./lib/tokens.ts) — 布局与主题色常量
2. [app/globals.css](./app/globals.css) — `:root` / `.dark` 语义色

## 目录结构（App Router）

```
packages/apps/ssr/
├── app/
│   ├── layout.tsx              # 根 HTML / Providers
│   ├── providers.tsx
│   ├── globals.css
│   ├── (main)/                 # 路由组：带底 Tab（URL 不变）
│   │   ├── page.tsx            # / 首页
│   │   ├── HomeEntryList.tsx
│   │   └── profile/page.tsx    # /profile
│   ├── heatmap/                # /heatmap 全屏子页
│   │   ├── page.tsx
│   │   ├── _components/        # 私有 UI（非路由）
│   │   ├── lib/                # 客户端 + treemap/canvas
│   │   │   └── server/         # 仅服务端（行情、JSON）
│   │   └── api/                # Route Handlers
│   └── dividend-rank/          # /dividend-rank
│       ├── page.tsx
│       ├── components/
│       ├── lib/types.ts
│       ├── data/dividend-2025.json
│       └── spot/route.ts       # GET /dividend-rank/spot
├── components/                 # 跨路由：layout、theme
├── lib/                        # 全站：cn、tokens
├── scripts/                    # 离线校验脚本（非运行时）
└── public/
```

**约定**

| 放哪                         | 内容                                                 |
| ---------------------------- | ---------------------------------------------------- |
| `app/(main)/`                | 底栏 Tab 页（`/`、`/profile`）                       |
| `app/<feature>/`             | 独立功能路由 + 其 `components`、`lib`、`data`、`api` |
| `app/<feature>/_components/` | 下划线前缀 = Next 私有目录，避免与路由混淆           |
| `components/`                | 仅 `MobileShell`、`TabBar`、`ThemeToggle` 等复用壳层 |
| `lib/`                       | 与路由无关的工具与 design tokens                     |
| `scripts/`                   | Node 维护脚本，不打包进页面                          |

## Commands

```bash
pnpm --filter @apps/ssr dev
pnpm --filter @apps/ssr build
pnpm --filter @apps/ssr lint:eslint:check
node packages/apps/ssr/scripts/validate-dividend.mjs
```

## Conventions

- 主题：`next-themes`，`attribute="class"`，`storageKey="h5-theme"`；禁止 `bg-white` / 硬编码色值
- 布局：`MobileShell`（Header 44px、TabBar 50px、safe-area）；二级页 `showBack` + `hideTabBar`
- 路由：`/`、`/profile`（Tab）→ `/heatmap`、`/dividend-rank`（全屏子页）
- **不使用 Pencil**：UI 以代码与 `lib/tokens.ts` 为准
- 不改 monorepo 内其他应用（`admin` / `micro-*`）

## Cursor 配置（本包 `.cursor/`）

- [.cursor/rules/h5-conventions.mdc](./.cursor/rules/h5-conventions.mdc)
- [.cursor/rules/h5-theme.mdc](./.cursor/rules/h5-theme.mdc)
- [.cursor/skills/h5-ssr-implement](./.cursor/skills/h5-ssr-implement/SKILL.md)
