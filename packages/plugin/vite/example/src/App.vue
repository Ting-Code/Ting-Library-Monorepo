<template>
  <text />
  <page :is="Demo" />
  <page :is="Demo">
    <Demo />
  </page>
</template>

<script setup lang="ts">
  // @ts-ignore
  import Demo from './app.demo.vue'
  import Page from './page.vue'

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
