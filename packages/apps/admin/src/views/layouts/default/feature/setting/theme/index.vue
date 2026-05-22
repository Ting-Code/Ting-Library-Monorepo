<template>
  <el-divider>{{ t('layout.settings.theme') }}</el-divider>
  <el-switch v-model="switchTheme" inline-prompt @change="handleChange" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from '@/hooks/useI18n'
  import { useSetting } from '@/hooks/useSetting'

  const { t } = useI18n()

  const rootSetting = useSetting()
  const switchTheme = ref(rootSetting.getRootTheme.value === 'dark')
  const handleChange = () => {
    rootSetting.setRootTheme(switchTheme.value ? 'dark' : 'light')
  }

  defineOptions({
    name: 'SettingTheme'
  })
</script>
