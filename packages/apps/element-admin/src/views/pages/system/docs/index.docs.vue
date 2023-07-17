<template>
  <DocsLayout>
    <Index />
    <MD>
      <pre>
## <a id="Vite插件实现">Vite 插件实现</a>
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
  </DocsLayout>
</template>

<script setup lang="ts">
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import Index from './index.md'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
</script>
