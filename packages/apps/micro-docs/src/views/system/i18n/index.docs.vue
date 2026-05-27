<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 🌐 国际化（i18n）

本 monorepo 将**运行时翻译**与**文案维护**拆成两层：内核包 `@tingcode/i18n` 负责读 JSON、切换语言、翻译；子应用 `micro-i18n` 负责在管理端里编辑 JSON 结构（不替代 Git 落盘流程）。

---

## 一、整体架构

```text
┌─────────────────────────────────────────────────────────────────┐
│  packages/lib/i18n/locales/{locale}/{namespace}.json  （真源文件） │
└───────────────────────────────┬─────────────────────────────────┘
                                │ 构建时打包 / import
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  @tingcode/i18n（内核）                                          │
│  createI18n · getMessages · translate · supportedLocales         │
└───────────────┬─────────────────────────────┬─────────────────────┘
                │                             │
        ┌───────▼───────┐             ┌───────▼────────┐
        │  admin 主应用  │             │  micro-* 子应用 │
        │  setupI18n    │             │  listenLocale   │
        │  emitLocale   │────────────►│  changeLocale   │
        └───────────────┘   Mitt 广播   └────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  micro-i18n（文案编辑，可选）                                     │
│  读 glob 扫描 locales · 编辑 · localStorage 暂存 · 导出 JSON      │
└─────────────────────────────────────────────────────────────────┘
```

| 模块 | 路径 | 职责 |
|------|------|------|
| 文案文件 | `packages/lib/i18n/locales/` | 各语言、各命名空间的 JSON |
| 内核 | `packages/lib/i18n` → `@tingcode/i18n` | 加载消息、`t()` 翻译、语言持久化 |
| 语言广播 | `@tingcode/system` → `emitLocale` / `listenLocale` | 主应用切换语言后通知子应用 |
| 主应用 | `packages/apps/admin` | 初始化 i18n、设置里切语言 |
| 文案编辑 | `packages/apps/micro-i18n` | 列表 / 详情编辑、导出（不写仓库） |

---

## 二、`@tingcode/i18n` 内核（独立能力）

### 2.1 设计原则

- **单一文案目录**：全仓只在 `packages/lib/i18n/locales` 维护 JSON，业务应用不各自建 `locales`。
- **命名空间 = 文件名**：`layout.json` → 代码里用 `layout.xxx`（或 `useI18n('layout')` + 短 key）。
- **与 UI 框架解耦**：内核不依赖 Vue；各应用用 `createI18n` + 薄封装 `useI18n`。

### 2.2 目录与 key 约定

```text
packages/lib/i18n/locales/
  zh-CN/
    layout.json      → t('layout.settings.title')
    common.json      → t('common.xxx')   （新增文件后需在 messages 注册，见下）
  en/
    layout.json
    common.json
```

JSON 结构：**顶层 key = 词条组**，其下 **叶子 key = 子词条**（字符串值），与编辑器的「词条组 / 子词条」一致。

```json
{
  "settings": {
    "title": "系统设置",
    "theme": "主题"
  },
  "locale": {
    "zh-CN": "简体中文"
  }
}
```

### 2.3 运行时加载（当前实现）

`packages/lib/i18n/src/locales/messages.ts` 在构建期 **静态 import** 各命名空间 JSON，并挂到 `messagesByLocale`：

- 已支持语言：`zh-CN`、`en`（`supportedLocales`）
- 新增 `{namespace}.json` 后，需在 `messages.ts` 中增加对应 import 与 `messagesByLocale` 条目，重新构建 `@tingcode/i18n` 后运行时才能 `t()` 到新文案。

（若后续命名空间增多，可改为 `import.meta.glob` + `mergeLocaleJson` 自动合并，与 `micro-i18n` 扫描方式对齐。）

### 2.4 核心 API

| API | 说明 |
|-----|------|
| `createI18n(createLocaleConfig(...))` | 创建实例：`loadMessages`、`defaultLocale`、`fallbackLocale` |
| `instance.init()` | 预加载当前语言与 fallback 文案 |
| `instance.t(key, params?)` | 按 key 翻译，支持 `{name}` 插值 |
| `instance.changeLocale(locale)` | 切换语言、写 localStorage、触发 `onLocaleChange` |
| `resolveKey(namespace, key)` | `useI18n('layout')` 时把 `title` 解析为 `layout.title` |
| `supportedLocales` | 当前启用语言列表 |

### 2.5 主应用用法（admin）

1. 启动时 `setupI18n(app)`：读持久化语言 → `resolveInitialLocale()` → `init()`。
2. 用户在设置抽屉切换语言 → `changeLocale()` → 内部 `onLocaleChange` → **`emitLocale`** 广播。
3. 组件内 `const { t } = useI18n()` 或 `useI18n('layout')`，模板 `{{
          t('layout.settings.title')
        }}`。

### 2.6 子应用用法（micro-i18n 等）

1. `setupI18n(app)` 使用同一套 `createLocaleConfig` / `getMessages`。
2. **`listenLocale`** 订阅主应用广播，收到后 `changeLocale`，并 `localeTick++` 驱动界面刷新。
3. 子应用**不**自行决定默认语言策略时，以主应用为准。

### 2.7 与微前端的关系

- 子应用路由挂在 `/micro/i18n/` 等路径，与主应用同域部署。
- 语言状态：**主应用 localStorage + Mitt**，子应用只跟随，避免各写一份语言配置。

---

## 三、文案编辑子应用 `micro-i18n`

### 3.1 定位

| 做 | 不做 |
|----|------|
| 可视化维护 JSON 结构（项目 / 组 / 子词条） | 自动写入 Git 仓库 |
| 本机 `localStorage` 暂存未提交修改 | 替代数据库/CMS 主流程 |
| 导出多语言 JSON 供开发者落盘 | 线上直接改 `locales` 文件 |

入口：侧栏 **方案与封装 → ✏️ 文案编辑**（生产 `/micro/i18n/`，本地 dev `/i18n/`）。

### 3.2 页面与数据流

```text
列表页 /list
  · 扫描构建期 glob：packages/lib/i18n/locales/*/*.json
  · 合并 localStorage 草稿项目、隐藏列表
  · 操作：新建项目、进入、删除

详情页 /list/:namespace
  · 加载各语言 JSON（仓库内容 + i18n:locale-overrides 覆盖）
  · 左侧树：词条组（顶层 key）→ 子词条（叶子 string）
  · 右侧：按 supportedLocales 编辑当前选中叶子
  · 操作：添加组 / 组旁＋加子词条 / 复制路径 / 删除 / 重置 / 导出
```

### 3.3 本地状态（浏览器）

| localStorage 键 | 含义 |
|-----------------|------|
| `i18n:draft-namespaces` | 新建但未在仓库出现 JSON 的项目名 → 列表显示「未落盘」 |
| `i18n:locale-overrides` | 某项目各语言完整 JSON 覆盖（编辑未导出前的暂存） |
| `i18n:hidden-namespaces` | 从列表隐藏的项目（仓库仍有文件时需手动删 JSON） |

### 3.4 操作说明

1. **新建项目**：校验命名 → 写入草稿列表 → 进入详情编辑空结构。
2. **编辑**：改右侧各语言输入框；数据在内存，可顺带写入 `locale-overrides`。
3. **重置**：丢弃覆盖，恢复为仓库打包进来的初始内容。
4. **导出**：下载 `zh-CN-{项目}.json`、`en-{项目}.json` → 重命名放入 `locales/{语言}/{项目}.json` → **git commit** → 重建/重启 dev。
5. **删除项目**：草稿直接删；已落盘项目从列表隐藏并清覆盖，**须自行删仓库 JSON**。
6. **删除词条组 / 子词条**：改内存结构并写覆盖；落盘仍靠导出 + Git。

---

## 四、为什么编辑端「只做导出」、不做自动写盘？

### 4.1 技术边界

管理端是**纯前端**（Vite 构建的静态资源 + 浏览器执行）：

- 无法安全访问开发者磁盘上的 `packages/lib/i18n/locales/`。
- 线上部署没有「把用户浏览器里的字写入服务器仓库」的标准能力。
- 若在 dev 单独加「写文件 API」，会出现 **本地能写、线上不能写** 的行为分裂，且易误用。

### 4.2 产品取舍

| 方案 | 优点 | 缺点 |
|------|------|------|
| **仅导出（当前）** | 本地/线上一致；落盘走 Git，可 Review | 需手动拷贝文件并 commit |
| dev 写盘插件 | 单人省事 | 仅 dev、无权限审计、与生产不一致 |
| 后端写文件 API | 可线上保存 | 要鉴权、防路径穿越、多环境同步、与 Git 流程再对齐 |

因此当前选择：**编辑 + 暂存 + 导出**；**真落盘 = 人/CI 把 JSON 放进仓库**。

### 4.3 与「未落盘」标签

- **未落盘**：`locales` 里还没有对应 JSON，只有草稿名。
- **已落盘**：仓库已有 `{locale}/{namespace}.json`（导出并 commit 后即视为已落盘）。

---

## 五、推荐实践：数据库真源 + CLI 拉取

当多人协作、运营改词、要环境隔离（dev/staging/prod）时，建议 **数据库（或 CMS）为唯一真源**，JSON 仅为**构建产物**。

### 5.1 推荐链路

```text
┌──────────────┐     ┌──────────────┐     ┌─────────────────────────┐
│ 运营/翻译后台 │ ──► │ 数据库        │ ──► │ API（按项目/语言导出）   │
│ 录入·审核·发布│     │ 项目/组/词条  │     └───────────┬─────────────┘
└──────────────┘     └──────────────┘                 │
                                                        ▼
                                            ┌─────────────────────────┐
                                            │ CLI：pnpm i18n:pull      │
                                            │ 写入 locales/*.json      │
                                            └───────────┬─────────────┘
                                                        ▼
                                            ┌─────────────────────────┐
                                            │ git commit · CI 构建     │
                                            │ @tingcode/i18n → 各应用  │
                                            └─────────────────────────┘
```

### 5.2 表结构（示意）

可与编辑器概念一一对应：

| 概念 | 表/字段示意 |
|------|-------------|
| 项目 | `namespace`（对应 `layout.json` 文件名） |
| 词条组 | `group_key`（JSON 顶层 key） |
| 子词条 | `leaf_key` + 各语言 `value` |
| 发布 | `status`、`version`、`published_at` |

### 5.3 CLI 职责（待实现）

建议在 monorepo 根或 `@tingcode/i18n` 增加脚本，例如：

```bash
pnpm i18n:pull              # 从配置的环境 API 拉全量
pnpm i18n:pull --namespace layout
```

行为：

1. 请求后台导出接口（或直连只读 DB）。
2. 按 `locales/{locale}/{namespace}.json` 落盘，格式化 JSON。
3. 可选：与本地 diff，防止误覆盖。

环境变量示例：`I18N_API_URL`、`I18N_API_TOKEN`（勿提交仓库）。

### 5.4 与 `micro-i18n` 的分工

| 场景 | 建议工具 |
|------|----------|
| 日常发布、多人、要审计 | **DB + CLI + PR** |
| 紧急改词、本地调试、原型 | **micro-i18n 导出** 后手工 commit |
| 校对翻译、看结构 | **micro-i18n** 只读浏览亦可 |

长期：**不要**让运营依赖「仅 localStorage + 导出」作为主流程；`micro-i18n` 是 Git 流程的补充，不是替代。

---

## 六、 checklist：新增一套文案

1. 在 `locales/zh-CN`、`locales/en` 下新增 `{namespace}.json`（或通过 DB+CLI 生成）。
2. 在 `packages/lib/i18n/src/locales/messages.ts` 注册 import（当前必需）。
3. 代码中使用 `t('{namespace}.group.leaf')`。
4. 构建 `@tingcode/i18n` 及依赖它的应用。
5. 可选：在 `micro-i18n` 中校验结构并导出补丁。

---

## 七、相关代码索引

- 内核：`packages/lib/i18n`
- 主应用封装：`packages/apps/admin/src/hooks/useI18n.ts`
- 子应用封装：`packages/apps/micro-i18n/src/hooks/useI18n.ts`
- 语言广播：`packages/lib/system/src/hooks/locale.ts`
- 编辑器：`packages/apps/micro-i18n`（`locale-files.ts`、`locale-tree.ts`、`locale-export.ts`）
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/admin/src/hooks/useI18n.ts" :default-show-code="false" />
    <CodeBlock src="@root/packages/lib/system/src/hooks/locale.ts" :default-show-code="false" />
    <CodeBlock src="@root/packages/lib/i18n/src/locales/messages.ts" :default-show-code="false" />
  </DocsLayout>
</template>
