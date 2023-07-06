<template>
  <el-container :class="ns.b()">
    <!--  所以弹出层  -->
    <LayoutFeature />
    <el-container>
      <!--   侧边栏menu   -->
      <LayoutAside v-if="!isMobile && !isOpenFullRef" />
      <el-container :class="ns.e('container')">
        <!--   头部header   -->
        <el-header v-if="!isOpenFullRef">
          <LayoutHeader />
        </el-header>
        <div :class="ns.e('main')">
          <LayoutTabs />
          <LayoutMain />
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutTabs from './tabs/index.vue'
  import LayoutAside from './aside/index.vue'
  import LayoutMain from './main/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutFeature from './feature/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { useAppProviderContext } from '@/components/application/useAppContext'
  import { toRefs } from 'vue'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  defineOptions({
    name: 'DefaultLayout'
  })
  const ns = useNamespace('default-layout')
  const { isMobile } = toRefs(useAppProviderContext())
  const { isOpenFullRef } = useRootSetting()
</script>

<style lang="scss">
  @include b(default-layout) {
    height: 100%;
    width: 100%;
    overflow: hidden;

    @include e(container) {
      display: flex;
      flex-direction: column;
    }

    @include e(main) {
      display: flex;
      flex: 1;
      overflow: hidden;
      flex-direction: column;
    }
  }
</style>
