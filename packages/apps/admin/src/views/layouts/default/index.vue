<template>
  <el-container :class="ns.b()">
    <!--  弹出层  -->
    <LayoutFeature />
    <el-container>
      <!--   侧边栏menu   -->
      <LayoutAside v-if="!isMobile && !isOpenFullRef" />
      <el-container :class="ns.e('container')">
        <!--   头部header   -->
        <el-header :class="ns.e('header')" v-if="!isOpenFullRef">
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
  import { useNamespace } from '@tingcode/system'
  import { useAppProviderContext } from '@/views/application/useAppContext'
  import { toRefs } from 'vue'
  import { useSetting } from '@/hooks/useSetting'
  defineOptions({
    name: 'DefaultLayout'
  })
  const ns = useNamespace('default-layout')
  const { isMobile } = toRefs(useAppProviderContext())
  const { isOpenFullRef } = useSetting()
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

    @include e(header) {
      padding-left: calc(2vw);
      padding-right: calc(2vw);
    }

    @include e(main) {
      display: flex;
      flex: 1;
      overflow: hidden;
      flex-direction: column;
    }
  }
</style>
