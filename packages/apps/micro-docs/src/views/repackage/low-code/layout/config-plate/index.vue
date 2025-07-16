<template>
  <div :class="ns.b()"> </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'

  defineOptions({ name: 'ConfigPlate' })
  const ns = useNamespace('config-plate')
</script>

<style lang="scss" scoped>
  @include b(config-plate) {
    border: 2px solid getCssVar('text-color', 'placeholder');
    padding-top: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
