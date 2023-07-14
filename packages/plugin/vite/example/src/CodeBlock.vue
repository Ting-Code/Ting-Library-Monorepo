<template>
  <div>Code Block</div>
  <a :href="src">{{ src }}</a>
  <pre>{{ code }}</pre>
  <component :is="props.is" ref="demo" />
</template>

<script setup lang="ts">
  // @ts-ignore
  import { ref, defineProps, computed, nextTick } from 'vue'
  // @ts-ignore
  import type { Component } from 'vue'

  const props = defineProps<{
    src?: string
    code?: string
    is?: Component
  }>()
  const demo = ref()
  const soundPath = ref()
  const soundCode = ref()

  nextTick(() => {
    if (demo?.value?.__getSoundPath) {
      soundPath.value = demo?.value?.__getSoundPath()
    }
    if (demo?.value?.__getSoundCode) {
      soundCode.value = demo?.value?.__getSoundCode()
    }
  })

  const src = computed(() => {
    return `https://github.com/Ting-Code/Ting-Library-Monorepo/blob/master${
      props.src || soundPath.value || '.'
    }`
  })
  const code = computed(() => {
    return decodeURIComponent(props.code || soundCode.value || '')
  })
</script>
