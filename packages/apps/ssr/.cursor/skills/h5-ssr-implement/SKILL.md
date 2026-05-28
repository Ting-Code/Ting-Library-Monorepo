---
name: h5-ssr-implement
description: >-
  Implements @apps/ssr H5 pages (MobileShell, next-themes, Tailwind v4). Use when building the mobile official site or profile page in packages/apps/ssr.


disable-model-invocation: true
---

# H5 SSR 实现清单

## 先读

- [AGENTS.md](../../../AGENTS.md)
- `lib/tokens.ts`、`app/globals.css`

## 目录

- Tab 页：`app/(main)/`；子功能：`app/heatmap/`、`app/dividend-rank/`（见 [AGENTS.md](../../../AGENTS.md)）
- 跨页壳层：`components/layout/MobileShell.tsx`、`TabBar.tsx`

## 布局

- `MobileShell`：顶栏 title + `ThemeToggle`，底栏 Tab（首页 / 我的），`max-w-[430px]`

## 主题

- `app/providers.tsx` — `next-themes`，`storageKey="h5-theme"`
- `components/theme/ThemeToggle.tsx` — 44×44

## 验收

- [ ] `pnpm --filter @apps/ssr build` 通过
