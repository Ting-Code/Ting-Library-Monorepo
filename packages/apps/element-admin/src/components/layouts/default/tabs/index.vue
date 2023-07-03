<template>
  <div :class="ns.b()" :style="{ paddingTop: isOpenFullRef ? '6px' : '0' }">
    <div :class="ns.e('left')">
      <el-tabs
        v-model="targetTabRef"
        type="card"
        @tab-change="handleTabsChange"
        @edit="handleTabsEdit"
      >
        <el-tab-pane
          v-for="item in getTabsList()"
          :key="item.fullPath"
          :label="item?.meta?.title"
          :name="item.fullPath"
          :closable="true"
        />
      </el-tabs>
    </div>
    <div :class="ns.e('right')">
      <SetIcon />
      <FullIcon />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import SetIcon from './set/index.vue'
  import FullIcon from './full/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { watch, ref } from 'vue'
  import { useTabs } from '@/hooks/useTabs'
  import { useRoute } from 'vue-router'
  import { PageEnum } from '@/router/type'
  import { useGo } from '@/hooks/usePage'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'

  defineOptions({
    name: 'LayoutTabs'
  })

  const targetTabRef = ref<string>(PageEnum.BASE_HOME)

  const { initTabs, setStorageTabs, getRouteItem, addTabsList, getTabsList, removeTabByName } =
    useTabs()

  const ns = useNamespace('layout-tabs')
  const route = useRoute()
  const go = useGo()
  const { isOpenFullRef } = useRootSetting()

  initTabs()

  watch(
    () => route.fullPath,
    () => {
      targetTabRef.value = route.fullPath
      addTabsList(getRouteItem(route))
    },
    { immediate: true }
  )

  const handleTabsChange = (fullPath) => {
    go(fullPath)
  }
  const handleTabsEdit = (fullPath, action) => {
    if (action === 'remove') {
      removeTabByName(fullPath)
    }
  }

  // 在页面关闭或刷新之前，保存数据
  window.addEventListener('beforeunload', () => {
    setStorageTabs()
  })
</script>

<style lang="scss" scoped>
  @include b(layout-tabs) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: getCssVar(bg-cokor);

    @include e(left) {
      flex: 1;
      overflow: hidden;
    }

    @include e(right) {
      padding-left: 12px;
      > svg {
        margin: 0 12px 3px 12px;
      }
    }

    :deep(.#{$namespace}-tabs__nav) {
      border: none !important;
    }
    :deep(.#{$namespace}-tabs__header) {
      border: none !important;
      margin-bottom: 6px !important;
    }

    :deep(.#{$namespace}-tabs__item) {
      border: 1px solid getCssVar(border-color) !important;
      border-radius: 2px;
      margin-left: 3px;
    }
  }
</style>
