<template>
  <div :class="ns.b()" :style="{ paddingTop: isOpenFullRef ? '6px' : '0' }">
    <div :class="ns.e('left')">
      <el-tabs
        v-model="targetTabRef"
        type="card"
        @tab-change="handleTabsChange"
        @edit="handleTabsEdit"
        ref="tabs"
      >
        <el-tab-pane
          class="sortable"
          v-for="item in tabsList"
          :key="item.path"
          :label="item?.meta?.title as string"
          :name="item.path"
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
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { watch, ref, computed } from 'vue'
  import { useTabs } from '@/hooks/useTabs'
  import { useRoute } from 'vue-router'
  import { PageEnum, useNamespace } from '@tingcode/system'
  import { useGo } from '@/hooks/usePage'
  import { useSetting } from '@/hooks/useSetting'
  defineOptions({
    name: 'LayoutTabs'
  })
  const {
    initTabs,
    setStorageTabs,
    getRouteItem,
    addTabsList,
    getTabsList,
    setTabsList,
    removeTabByName
  } = useTabs()
  const targetTabRef = ref<string | null | undefined>(PageEnum.BASE_HOME_NAME)
  const tabs = ref<HTMLElement | null>(null)

  const ns = useNamespace('layout-tabs')
  const route = useRoute()
  const go = useGo()
  const { isOpenFullRef } = useSetting()

  initTabs()

  watch(
    () => route.path,
    () => {
      targetTabRef.value = route.path
      addTabsList(getRouteItem(route))
    },
    { immediate: true }
  )
  // 拖拽 相关逻辑
  const tabsList = computed({
    get: () => getTabsList.value,
    set: (val) => {
      setTabsList(val)
    }
  })
  useSortable('.ting-tabs__nav', tabsList, { handle: '.ting-tabs__item' })

  const handleTabsChange = (path) => {
    go({ path })
  }
  const handleTabsEdit = (path, action) => {
    if (action === 'remove') {
      removeTabByName(path)
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
      margin-left: 6px;
      background-color: getCssVar(bg-color);
    }
  }
</style>
