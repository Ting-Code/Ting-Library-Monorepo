<template>
  <CodeBlock src="./main.ts" />
  <CodeBlock :is="Demo" />
  <markdown>
    <!-- prettier-ignore -->
    <pre>
2123
qwee
# 66666
# asasdasd
``` title ```
<a id="aaa">sdadsasdsdasdasd</a>
# asd
</pre>
  </markdown>
</template>

<script setup lang="ts">
  // @ts-ignore
  import Demo from './app.demo.vue'
  import CodeBlock from './CodeBlock.vue'

  console.log(Demo)
</script>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
</style>
