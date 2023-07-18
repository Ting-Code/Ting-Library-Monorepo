<template>
  <DocsLayout>
    <Index />
    <MD>
      <pre>
## Vite 插件实现
Vite插件中有许多的钩子，主要常用的钩子有
* `transform` 重要用于编译时转换，可以获取到`code(源码)`和`id(路径)，返回转化后的code`
* `handleHotUpdate` 用于热更新
`createFilter`用于筛选出目标文件，也有利于性能。`.demo.vue`和`.docs.vue` 才做处理
      </pre>
    </MD>
    <CodeBlock
      src="@root/packages/plugin/vite/vite-plugin-code/src/index.ts"
      :defaultShowCode="false"
    />
    <MD>
      <pre>
### 解析V ue代码
`transform` 中可以获取到`code(源码)`和`id(路径)`都是字符串类型。
那么我需要找到`CodeBlock`组件并做一些处理，这时候就需要用到`@vue/compiler-sfc`的`compileTemplate`函数解析Vue文件,许多博客推荐是是`@vue/compiler-core`发现不能编译宏。
* Vue 中写 Markdown： 需要找到MD标签取出内容，`markdown-it`转化后返回
* 渲染效果同时显示源代码的代码块 ： 找到`.demo.vue`文件，将添加一个属性将`code`字符串注入进去并返回
* 根据src显示源代码： 找到CodeBlock下的src属性，`fs`读取src路径文件，将`code`字符串注入`code`属性
      </pre>
    </MD>
    <CodeBlock
      src="@root/packages/plugin/vite/vite-plugin-code/src/transform.ts"
      :defaultShowCode="false"
    />
  </DocsLayout>
</template>

<script setup lang="ts">
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import Index from './index.md'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
</script>
