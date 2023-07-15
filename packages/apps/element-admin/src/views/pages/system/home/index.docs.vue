<template>
  <DocsLayout>
    <Markdown>
      <pre>
# Markdown

# title
```
tiele
```
      </pre>
    </Markdown>
    <CodeBlock src="../../../../App.vue" />
    <CodeBlock src="@root/packages/apps/element-admin/index.html" />
    <CodeBlock :is="Test" />
    <div><HomeIndex /> </div>
  </DocsLayout>
</template>

<script setup lang="ts">
  import Test from './test.demo.vue'
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import HomeIndex from './index.md'
  import Markdown from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/CodeBlock.vue'
</script>
