<template>
  <DocsLayout>
    <IndexMd />
    <CodeBlock src="@root/packages/lib/vue/vite.config.ts" />
    <MD>
      <pre>
## Button二次封装案例
利用```宏编译+TS```继承和增强类型提示。
      </pre>
    </MD>
    <CodeBlock :is="ReDemo" type="html" />
    <CodeBlock :is="ButtonDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import IndexMd from './index.md'
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
  import ReDemo from './demo/re.demo.vue'
</script>
