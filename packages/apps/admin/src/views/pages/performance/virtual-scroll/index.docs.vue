<template>
  <DocsLayout>
    <IndexMd />
    <CodeBlock :is="FixationHeight" type="html" />
    <MD>
      <pre>
## 动态高度列表（待更新）
      </pre>
    </MD>
    <CodeBlock :is="DynamicHeight" type="html" />
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
