<template>
  <DocsLayout>
    <IndexMd />
    <CodeBlock :is="FixationHeight" type="html" />
    <CodeBlock :is="DynamicHeight" type="html" />
    <CodeBlock src="@root/packages/lib/vue/vite.config.ts" />
    <MD>
      <pre>
## Button二次封装案例
利用```宏编译+TS```继承和增强类型提示。
      </pre>
    </MD>
  </DocsLayout>
</template>

<script setup lang="ts">
  import IndexMd from './index.md'
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
  import FixationHeight from './demo/fixation-height.demo.vue'
  import DynamicHeight from './demo/dynamic-height.demo.vue'
</script>
