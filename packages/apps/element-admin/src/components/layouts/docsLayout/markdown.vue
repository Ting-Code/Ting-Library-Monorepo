<template>
  <div class="markdown-body"> <slot></slot> </div>
</template>

<script setup lang="ts">
  import { defineOptions } from 'vue'

  defineOptions({
    name: 'Markdown'
  })
</script>
