<template>
  <el-main :class="ns.b()">
    <router-view />
  </el-main>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({ name: 'LayoutMain' })

  const ns = useNamespace('layout-main')
</script>

<style lang="scss">
  @include b(layout-main) {
    background-color: getCssVar('bg-color', 'main');
  }
</style>
