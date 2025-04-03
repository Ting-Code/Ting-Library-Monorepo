<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 📊数据图表
      </pre>
    </Markdown>
    <CodeBlock :is="ChartDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import ChartDemo from './demo/chart.demo.vue'
</script>
