<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 🎨CSS架构设计

本系统CSS架构设计分为以下几个层级
1. 基础层（Base）全局样式初始化
2. 设置层（Settings）管理公共变量和方法
3. 主题层（Theme）主题相关设计及处理
4. 组件层（Component）复用组件的样式处理
5. 页面层（Page）页面相关样式处理

## Base层
**base层主要是整体项目全局样式**

1. 全局样式初始化，如：[normalize.css](https://necolas.github.io/normalize.css/8.0.1/normalize.css)， reset.css
2. 自己定义的全局样式。
3. 全局样式覆盖。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/admin/src/styles/base/reset.scss" />
    <Markdown>
      <pre>
## Settings层
提供一系列可复用的工具类，用于快速实现常见的样式效果，提升开发效率。
1. Less、Scss等插件的公共复用方法和变量，或原生CSS变量。
2. Settings 层Tailwind框架结合，通过覆盖框架的默认变量，实现定制化的样式。
3. 系统级别规范统一的样式，如：字体、颜色、间距、圆角、边框等。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/admin/src/styles/mixin/config.scss" />
    <Markdown>
      <pre>
## 主题层（Theme）
主题层主要负责处理与主题相关的设计及样式处理，它允许系统根据不同的主题需求来切换和定制界面风格。

### 主题方案
#### Scss实现的主题变量注入
通过定义不同的 Scss 变量文件，我们可以在编译时根据不同的主题需求注入不同的变量值，从而实现主题的切换。
1. 优点：编译时处理，性能较好，Scss 的强大功能，如嵌套、混合器等，提高代码的可维护性和复用性。
2. 缺点：因为变量是在编译时确定的，一旦编译完成，就无法再修改，不支持运行时动态切换主题，当然可以跳过不同css文件来实现切换，但较繁琐。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/admin/src/styles/theme/index.scss" />
    <Markdown>
      <pre>
#### css变量实现的主题变量注入
允许我们在 CSS 中定义变量，并在需要的地方使用这些变量。通过 JavaScript 动态修改这些变量的值，我们可以在运行时实现主题的切换。
1. 优点：支持运行时动态切换主题，无需额外的编译步骤。
2. 缺点：浏览器兼容性问题，会产生大量CSS冗余中间变量。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/admin/src/styles/theme/dark.scss" />
    <Markdown>
      <pre>
#### antd 5 的css-in-js 的 token 注入方案
Ant Design 5 引入了 CSS-in-JS 的方案，通过 `ConfigProvider` 组件提供的 `theme` 属性，我们可以注入自定义的主题变量（也称为 tokens），从而实现主题的定制。
1. 优点：支持运行时动态切换主题，用户可以在不刷新页面的情况下切换主题。
2. 缺点：依赖于 Ant Design 组件库，增加了代码的复杂度和新概念学习成本。

### 方案选择
1. 相对固定、对性能和兼容性要求较高，且代码需要较好的可维护性，建议选择 Scss 实现的主题变量注入方案
2. 如果兼容性要求不是特别苛刻，可以考虑 CSS 变量实现的主题变量注入方案
3. 如果项目大量使用 Ant Design 组件，且需要灵活的主题切换功能，antd 5 的 css - in - js 的 token 注入方案是一个不错的选择。

对于本微前端项目需要兼容不同技术栈，选择了CSS变量的方案。

## 组件层（Component）
 组件层样式的特点
1. **独立性**：每个组件的样式应该是独立的，应该有样式隔离机制。
2. **可复用性**：组件的样式应该具有高度的可复用性，避免重复编写相同的样式代码。
3. **可定制性**：组件的样式应该允许一定程度的定制，以满足不同页面的需求。

### 组件层样式方案
组件样式方案有很多
1. CSS Modules 或 Vue scoped
2. css in js
3. BEM
在微前端项目中，不同的技术栈可能会引入不同的样式，最早选择BEM来作为样式隔离方案。
BEM中每个子应用有对应的namespace，进行区别隔离，即保证了样式的独立性，又保证了样式的可复用性。
也可进行样式替换。
      </pre>
    </Markdown>
    <CodeBlock :is="Bem" type="html" :default-show-code="true" />
    <Markdown>
      <pre>
## 页面层（Page）
原子化 CSS 是一种将 CSS 类拆分成最小、最基本的功能单元的 CSS 架构方式。在页面层使用原子化 CSS 可以提高开发效率和代码可维护性。
      </pre>
    </Markdown>
    <CodeBlock :is="Tailwind" type="html" :default-show-code="true" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import Bem from './demo/bem.demo.vue'
  import Tailwind from './demo/tailwind.demo.vue'
</script>
