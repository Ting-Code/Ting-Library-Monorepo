<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 🌐 国际化（i18n）

**运行时翻译**由 `@tingcode/i18n` 负责；**文案维护**由子应用 `micro-i18n` 在浏览器里编辑并导出，真源仍是 `packages/lib/i18n/locales` 下的 JSON（经 Git 落盘）。

---

## 一、架构

```text
locales/*.json  →  @tingcode/i18n  →  admin（setupI18n + emitLocale）
                              └────►  micro-*（listenLocale + changeLocale）
micro-i18n：glob 读 locales · localStorage 暂存 · 导出 JSON
```

| 模块 | 路径 | 职责 |
|------|------|------|
| 文案 | `packages/lib/i18n/locales/` | 各语言、命名空间 JSON |
| 内核 | `@tingcode/i18n` | `t()`、切语言、持久化 |
| 广播 | `emitLocale` / `listenLocale` | 主应用切语言后通知子应用 |
| 编辑 | `micro-i18n` | 列表/详情、导出（不写仓库） |

---

## 二、`@tingcode/i18n` 内核

- 全仓只在 `packages/lib/i18n/locales` 维护 JSON；**命名空间 = 文件名**（`layout.json` → `layout.xxx` 或 `useI18n('layout')`）。
- JSON：**顶层 key = 词条组**，叶子 string = **子词条**（与编辑器一致）。
- `messages.ts` 构建期静态 import；新增 `{namespace}.json` 须注册 import 并重建包。语言：`zh-CN`、`en`。

| API | 说明 |
|-----|------|
| `createI18n` / `init()` | 创建并预加载文案 |
| `t(key, params?)` | 翻译，支持 `{name}` 插值 |
| `changeLocale` | 切语言 + localStorage + `onLocaleChange` |

**admin**：`setupI18n` → 设置里 `changeLocale` → `emitLocale`。**子应用**：`listenLocale` 后 `changeLocale`，语言以主应用为准。微前端下同域，语言只存主应用一份。

---

## 三、文案编辑 `micro-i18n`

入口：**方案与封装 → ✏️ 文案编辑**（生产 `/micro/i18n/`，本地 `/i18n/`）。

| 做 | 不做 |
|----|------|
| 编辑项目/组/子词条、localStorage 暂存、导出 JSON | 自动写 Git / 替代 CMS |

- **列表** `/list`：glob 扫描 `locales/*/*.json`，可新建/删除/隐藏项目。
- **详情** `/list/:namespace`：左侧树（组→子词条），右侧多语言编辑；支持重置、导出。

| localStorage | 含义 |
|--------------|------|
| `i18n:draft-namespaces` | 仅草稿、仓库无文件（「未落盘」） |
| `i18n:locale-overrides` | 未导出前的各语言覆盖 |
| `i18n:hidden-namespaces` | 列表隐藏（仓库文件须手删） |

**落盘**：导出 `zh-CN-{项目}.json` 等 → 放入 `locales/{语言}/{项目}.json` → commit → 重建依赖包。

---

## 四、为何只导出、不写盘？

管理端是纯前端，无法安全写开发者本机或线上仓库；dev 专用写盘会与生产行为不一致。当前：**编辑 + 暂存 + 导出**，真落盘靠 Git。未落盘 = 仅有草稿名；已落盘 = 仓库已有对应 JSON。

---

## 五、协作建议（DB + CLI）

多人/多环境时，建议 **DB/CMS 为真源**，JSON 为构建产物：`后台 → API 导出 → pnpm i18n:pull（待实现）→ locales → commit → CI`。表概念与编辑器对齐：`namespace` / `group_key` / `leaf_key` + 各语言 `value`。

| 场景 | 工具 |
|------|------|
| 正式发布、审计 | DB + CLI + PR |
| 本地急改、原型 | micro-i18n 导出后 commit |

`micro-i18n` 宜作 Git 流程补充，不宜作运营主流程。

---

## 六、新增文案与代码

1. 新增 `locales/{locale}/{namespace}.json`（或 CLI 生成）。
2. 在 `messages.ts` 注册 import，重建 `@tingcode/i18n`。
3. 使用 `t('{namespace}.group.leaf')`。

相关：`packages/lib/i18n`、`admin` / `micro-i18n` 的 `useI18n.ts`、`locale.ts`（广播）、`micro-i18n` 的 `locale-files` / `locale-tree` / `locale-export`。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/admin/src/hooks/useI18n.ts" :default-show-code="false" />
    <CodeBlock src="@root/packages/lib/system/src/hooks/locale.ts" :default-show-code="false" />
    <CodeBlock src="@root/packages/lib/i18n/src/locales/messages.ts" :default-show-code="false" />
  </DocsLayout>
</template>
