<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 📊数据图表
      </pre>
    </Markdown>
    <CodeBlock :is="BaseDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import BaseDemo from './demo/base.demo.vue'
</script>
