<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 🌐 国际化（i18n）

文案统一维护在 monorepo 包 `@tingcode/i18n`，子应用不单独维护 `locales` 目录。

## 文案目录

```
packages/lib/i18n/locales/{语言}/{命名空间}.json
```

示例：`packages/lib/i18n/locales/zh-CN/layout.json`

## 主应用

1. `setupI18n(app)` 初始化（持久化 → 浏览器语言）
2. `changeLocale` 切换语言并 `emitLocale` 广播到子应用
3. 设置抽屉内可切换语言，界面文案通过 `useI18n().t()` 响应式更新

## 子应用

1. 依赖 `@tingcode/i18n`，实现薄封装 `useI18n`（`listenLocale` 跟随主应用语言）
2. 组件内使用 `t('layout.xxx')` 取文案，不写死字符串

## 编辑与拉回本地

在侧栏 **方案与封装 → ✏️文案编辑** 中：

1. 列表按 **项目**（如 `layout` → 各语言下的 `layout.json`）展示，可 **新建项目**
2. 进入 **详情** 后左侧为合并树：分组可添加子词条，**仅叶子节点**可在右侧编辑各语言文案
3. **导出全部语言** 下载 JSON，覆盖到 `packages/lib/i18n/locales/{语言}/`
4. 重新构建 `@tingcode/i18n` 或重启 dev 后生效
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/admin/src/hooks/useI18n.ts" :default-show-code="false" />
    <CodeBlock src="@root/packages/lib/system/src/hooks/locale.ts" :default-show-code="false" />
  </DocsLayout>
</template>
