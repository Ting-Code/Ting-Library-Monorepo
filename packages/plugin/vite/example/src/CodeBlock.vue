<template>
  <div>Code Block</div>
  <div>{{ src }}</div>
  <div>{{ code }}</div>
  <component :is="props.is" ref="demo" />
</template>

<script setup lang="ts">
  // @ts-ignore
  import { nextTick, ref, defineProps, computed } from 'vue'
  // @ts-ignore
  import type { Component } from 'vue'

  const props = defineProps<{
    src?: string
    code?: string
    is?: Component
  }>()
  const demo = ref()
  const code = ref('')

  const src = computed(() => {
    return props.src
  })

  nextTick(() => {
    code.value = decodeURIComponent(demo?.value?.__getSoundCode() || '')
    setInterval(() => {
      console.log(decodeURIComponent(demo?.value?.__getSoundCode()) || '')
    }, 1000)
  })
</script>
