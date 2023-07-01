<template>
  <div :class="ns.b()">
    <el-tabs type="card" closable @edit="handleTabsEdit" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in getTabsList()"
        :key="item.fullPath"
        :label="item?.meta?.title"
        :name="item.fullPath"
      />
    </el-tabs>
    <p>icon</p>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import { watch } from 'vue'
  import { useTabs } from '@/hooks/useTabs'
  import { useRoute } from 'vue-router'

  defineOptions({
    name: 'LayoutTabs'
  })

  const { initTabs, setStorageTabs, getRouteItem, addTabsList, getTabsList, removeTabByName } =
    useTabs()

  const ns = useNamespace('layout-tabs')
  const route = useRoute()
  initTabs()

  watch(
    () => route.fullPath,
    () => {
      addTabsList(getRouteItem(route))
    },
    { immediate: true }
  )

  const removeTab = (e) => {
    console.log(e)
  }
  const handleTabsEdit = (targetName, action) => {
    console.log(targetName, action)
    if (action === 'remove') {
      removeTabByName(targetName)
    }
  }

  // 在页面关闭或刷新之前，保存数据
  window.addEventListener('beforeunload', () => {
    setStorageTabs()
  })
</script>

<style lang="scss">
  @include b(layout-tabs) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
