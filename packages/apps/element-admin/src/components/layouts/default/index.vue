<template>
  <el-container :class="ns.b()">
    <LayoutFeature />
    <LayoutHeader fixed />
    <el-container>
      <el-main>
        <main> main </main>
      </el-main>
      <el-footer> Footer3 </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutFeature from './feature/index.vue'
  import LayoutHeader from './herder/index.vue'
  import { useNamespace } from '@/hooks/use-namespace'

  const ns = useNamespace('default-layout')
</script>

<style lang="scss">
  @include b(default-layout) {
    height: 100%;
  }
</style>
