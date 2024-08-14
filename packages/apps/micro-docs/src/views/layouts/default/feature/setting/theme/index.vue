<template>
  <el-divider>主题</el-divider>
  <el-switch v-model="switchTheme" inline-prompt @change="handleChange" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useSetting } from '@/hooks/useSetting'

  const rootSetting = useSetting()
  const switchTheme = ref(rootSetting.getRootTheme.value === 'dark')
  const handleChange = () => {
    rootSetting.setRootTheme(switchTheme.value ? 'dark' : 'light')
  }
</script>
