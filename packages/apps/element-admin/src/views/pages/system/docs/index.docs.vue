<template>
  <DocsLayout>
    <code-block :is="button" />
    <div><Index /> </div>
    <CodeBlock src="@root/packages/apps/element-admin/index.html" />
    <MD>
      <pre>
# Markdown

# title
```
tiele
```
      </pre>
    </MD>
    <CodeBlock src="../../../../App.vue" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import button from './demo/button.demo.vue'
  import Index from './index.md'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
</script>
