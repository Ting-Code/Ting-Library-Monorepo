<template>
  <el-container :class="ns.b()">
    <LayoutFeature />
    <el-container>
      <el-drawer v-if="isMobile">
        <LayoutAside />
      </el-drawer>
      <LayoutAside v-else />
      <el-container>
        <LayoutHeader />
        <el-main>
          <main> main </main>
        </el-main>
        <el-footer> footer {{ width }} </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutAside from './aside/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutFeature from './feature/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { useAppProviderContext } from '@/components/application/useAppContext'
  import { toRefs } from 'vue'

  defineOptions({
    name: 'DefaultLayout'
  })
  const ns = useNamespace('default-layout')
  const { width, isMobile } = toRefs(useAppProviderContext())
</script>

<style lang="scss">
  @include b(default-layout) {
    min-height: 100%;
  }
</style>
