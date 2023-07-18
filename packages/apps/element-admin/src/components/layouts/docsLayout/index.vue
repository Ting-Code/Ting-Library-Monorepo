<template>
  <div :class="ns.b()">
    <div :class="ns.e('docs')" ref="codeDomRef">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { highlightAllUnder } from 'prismjs'
  import { defineOptions, nextTick, onMounted, ref } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'DocsLayout'
  })
  const ns = useNamespace('docs-layout')
  const codeDomRef = ref<HTMLDivElement>()

  onMounted(() => {
    nextTick(() => {
      if (codeDomRef.value) {
        highlightAllUnder(codeDomRef.value as any)
      }
    })
  })
</script>

<style lang="scss">
  @include b(docs-layout) {
    height: 100%;
    padding: 30px calc(8% - 18px) 80px;
    overflow: auto;
  }
</style>
