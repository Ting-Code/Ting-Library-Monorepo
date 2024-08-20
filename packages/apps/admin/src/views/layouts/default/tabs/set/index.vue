<template>
  <el-dropdown trigger="click">
    <Icon icon="layout-set" size="20" />

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="EPIcon['Refresh']" @click="reloadPage">
          刷新页面
        </el-dropdown-item>
        <el-dropdown-item :icon="EPIcon['CircleCloseFilled']" @click="() => removeTab()">
          关闭当前
        </el-dropdown-item>
        <el-dropdown-item :icon="EPIcon['CloseBold']" @click="closeAll">
          关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { Icon } from '@tingcode/lib-vue'
  import { EPIcon } from '@/main'
  import { useTabs } from '@/hooks/useTabs'
  defineOptions({
    name: 'TabsSet'
  })

  const { closeAll, removeTab, reloadPage } = useTabs()
</script>
