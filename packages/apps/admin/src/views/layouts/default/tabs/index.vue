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
  import { ref, computed } from 'vue'
  // @ts-ignore
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { useTabs } from '@/hooks/useTabs'
  import { onMittRouter, PageEnum, setUrl, useNamespace } from '@tingcode/system'
  import { NAMESPACE, useSetting } from '@/hooks/useSetting'
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
  const targetTabRef = ref<string | undefined>(PageEnum.BASE_HOME_NAME)
  const tabs = ref<HTMLElement | null>(null)

  const ns = useNamespace('layout-tabs')
  const { isOpenFullRef } = useSetting()

  initTabs()

  onMittRouter((route) => {
    targetTabRef.value = route.path
    addTabsList(getRouteItem(route))
  })
  // 拖拽 相关逻辑
  const tabsList = computed({
    get: () => getTabsList.value,
    set: (val) => {
      setTabsList(val)
    }
  })
  useSortable(`.${NAMESPACE}-tabs__nav`, tabsList, { handle: `.${NAMESPACE}-tabs__item` })

  const handleTabsChange = (path) => {
    const route = tabsList.value.find((item) => item.path === path)
    setUrl({ path, name: route?.meta?.module as string, query: route?.query || {} })
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
    background-color: getCssVar(bg-color);

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
