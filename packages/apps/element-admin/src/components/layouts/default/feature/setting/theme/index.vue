<template>
  <el-divider>主题</el-divider>
  <el-switch v-model="value2" inline-prompt />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const value2 = ref(true)
</script>
