<template>
  <div :class="ns.b()">
    <el-tabs type="card" closable @tab-remove="removeTab">
      <el-tab-pane label="label" name="name" />
      <el-tab-pane
        v-for="item in getTabsList()"
        :key="item.fullPath"
        :label="item?.meta?.title"
        :name="item.name"
      />
    </el-tabs>
    <p>icon</p>
  </div>
  {{ getTabsList() }}
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import { onUnmounted, watch } from 'vue'
  import { useTabs } from '@/hooks/useTabs'
  import { useRoute } from 'vue-router'

  defineOptions({
    name: 'LayoutTabs'
  })

  const { initTabs, setStorageTabs, getRouteItem, addTabsList, getTabsList } = useTabs()

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

  onUnmounted(() => {
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
