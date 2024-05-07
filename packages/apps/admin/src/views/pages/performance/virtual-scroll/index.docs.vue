<template>
  <DocsLayout>
    <IndexMd />
    <CodeBlock :is="FixationHeight" type="html" />
    <Markdown>
      <pre>
## 动态高度列表（待更新）
      </pre>
    </Markdown>
    <CodeBlock :is="DynamicHeight" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import IndexMd from './index.md'
  import FixationHeight from './demo/fixation-height.demo.vue'
  import DynamicHeight from './demo/dynamic-height.demo.vue'
</script>
