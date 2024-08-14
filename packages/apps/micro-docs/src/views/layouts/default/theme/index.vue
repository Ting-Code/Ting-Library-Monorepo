<template>
  <Icon icon="layout-dark" size="20" v-if="switchTheme" @click="handleChange" />
  <Icon icon="layout-light" size="23" v-if="!switchTheme" @click="handleChange" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useSetting } from '@/hooks/useSetting'

  const rootSetting = useSetting()
  const switchTheme = ref(rootSetting.getRootTheme.value === 'dark')
  const handleChange = () => {
    rootSetting.setRootTheme(switchTheme.value ? 'light' : 'dark')
    switchTheme.value = rootSetting.getRootTheme.value === 'dark'
  }

  defineOptions({
    name: 'HeaderTheme'
  })
</script>
