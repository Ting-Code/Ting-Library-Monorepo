<template>
  <DocsLayout>
    <Markdown>
      <pre>
## 大学人数统计
      </pre>
    </Markdown>
    <CodeBlock :is="ChartDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import ChartDemo from './demo/chart.demo.vue'
</script>
