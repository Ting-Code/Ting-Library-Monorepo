<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import { Icon } from '@components/common'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <Icon icon="common-vite" size="38" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="CommonVue" alt="" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
