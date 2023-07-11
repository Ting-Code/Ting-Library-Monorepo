<template>
  {{ code }}
  <component :is="props.is" ref="demo" />
</template>

<script setup lang="ts">
  import { defineProps, ref, nextTick } from 'vue'
  import type { Component } from 'vue'

  const demo = ref()
  const code = ref('')
  const props = defineProps<{
    is: Component
  }>()

  nextTick(() => {
    code.value = decodeURIComponent(demo.value.__getSoundCode())
    setInterval(() => {
      console.log(decodeURIComponent(demo.value.__getSoundCode()))
    }, 1000)
  })
</script>
