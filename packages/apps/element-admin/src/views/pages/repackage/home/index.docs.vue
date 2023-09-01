<template>
  <DocsLayout>
    <MD>
      <pre>
# 二次封装

      </pre>
    </MD>
    <CodeBlock :is="ReDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import ReDemo from './demo/re.demo.vue'
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
</script>
