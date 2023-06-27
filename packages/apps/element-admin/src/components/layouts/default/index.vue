<template>
  <el-container :class="ns.b()">
    <!--  所以弹出层  -->
    <LayoutFeature />
    <el-container>
      <!--   侧边栏menu   -->
      <LayoutAside v-if="!isMobile" />
      <el-container>
        <!--   头部header   -->
        <el-header>
          <LayoutHeader />
        </el-header>
        <!--   内容main   -->
        <LayoutMain />
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutAside from './aside/index.vue'
  import LayoutMain from './main/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutFeature from './feature/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { useAppProviderContext } from '@/components/application/useAppContext'
  import { toRefs } from 'vue'

  defineOptions({
    name: 'DefaultLayout'
  })
  const ns = useNamespace('default-layout')
  const { isMobile } = toRefs(useAppProviderContext())
</script>

<style lang="scss">
  @include b(default-layout) {
    min-height: 100%;
  }
</style>
