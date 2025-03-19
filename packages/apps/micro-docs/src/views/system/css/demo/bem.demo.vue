<template>
  <div :class="ns.b()">
    <div :class="ns.e('box')">
      <div :class="ns.em('box', 'text')">我是组件</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'HeaderNavIcon'
  })

  const ns = useNamespace('bem-demo')
</script>

<style lang="scss" scoped>
  @include b(bem-demo) {
    @include e(box) {
      border: 1px solid getCssVar('text-color', 'primary');
      @include m(text) {
        padding: 20px;
        border: 1px solid royalblue;
        color: getCssVar('text-color', 'primary');
      }
    }
  }
</style>
