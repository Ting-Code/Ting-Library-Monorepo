<template>
  <el-container :class="ns.b()">
    <LayoutFeature />
    <LayoutHeader fixed />
    <el-container>
      <el-main>
        <main> main </main>
      </el-main>
      <el-footer> footer {{ width }} </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutFeature from './feature/index.vue'
  import LayoutHeader from './herder/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { useAppProviderContext } from '@/components/application/useAppContext'

  const ns = useNamespace('default-layout')
  const { width } = useAppProviderContext()
  setTimeout(() => {
    console.log(width)
  }, 3000)
</script>

<style lang="scss">
  @include b(default-layout) {
    height: 100%;
  }
</style>
