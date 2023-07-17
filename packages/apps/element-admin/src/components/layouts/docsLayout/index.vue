<template>
  <div :class="ns.b()">
    <div :class="ns.e('docs')">
      <slot></slot>
    </div>
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
    padding: 30px calc(8% - 18px) 80px;
    overflow: auto;
  }
</style>
