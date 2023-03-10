<template>
  <Icon icon="common-setting" @click="handleClick" />
  <el-drawer v-model="isOpenSetting" size="300">
    <template #header>
      <h4>系统设置</h4>
    </template>
    <template #default> 设置区域 </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Icon } from '@common/components'
  const isOpenSetting = ref(false)
  const handleClick = () => {
    isOpenSetting.value = true
  }
</script>
