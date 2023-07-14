<template>
  <CodeBlock src="./main.ts" />
  <CodeBlock :is="Demo" />
  <markdown>
    # 66666 # asasdasdasdasdasdasdasdasdasdasdda asdasdasdasd asdasdasdasdasd asdasdasdasdasdads ```
    title ```
    <!--    <a id="aaa">sdadsasdsdasdasd</a>-->
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
