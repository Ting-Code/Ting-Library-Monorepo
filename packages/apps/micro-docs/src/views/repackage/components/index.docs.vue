<template>
  <DocsLayout>
    <Markdown>
      <pre>
## Input二次封装案例
利用```format```以及```valueFormat```来预处理输入值，其中```format```用来处理非焦点情况下显示值，```valueFormat```预处理绑定值。都可以使用一系列预设函数或者自定义函数来处理。
      </pre>
    </Markdown>
    <CodeBlock :is="InputDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  // import IndexMd from './index.md'
  import InputDemo from './demo/input.demo.vue'
</script>
