<template>
  <div :class="ns.b()">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'
  const ns = useNamespace('visual-flow')
</script>

<style lang="scss" scoped>
  @include b(visual-flow) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
