<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 📊数据图表
      </pre>
    </Markdown>
    <CodeBlock :is="ChartDemo" type="html" />
    <Markdown>
      <pre>
# 📊流程图
      </pre>
    </Markdown>
    <CodeBlock :is="FlowDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import ChartDemo from './demo/chart.demo.vue'
  import FlowDemo from './demo/flow.demo.vue'
</script>
