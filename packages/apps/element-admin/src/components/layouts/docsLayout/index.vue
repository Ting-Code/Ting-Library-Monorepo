<template>
  <div :class="ns.b()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'DocsLayout'
  })

  const ns = useNamespace('docs-layout')
</script>

<style lang="scss">
  @include b(docs-layout) {
    height: 100%;
    padding: 100px;
    overflow: auto;
  }
</style>
