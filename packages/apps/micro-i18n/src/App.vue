<template>
  <el-config-provider :namespace="namespace">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { initSettingMitt, NAMESPACE } from '@/hooks/useSetting'
  import { useSettingStoreWithOut } from '@/store/modules/setting'

  const namespace = ref(NAMESPACE)
  let offSettingMitt: (() => void) | undefined

  onMounted(() => {
    const store = useSettingStoreWithOut()
    store.setRootTheme(store.getRootTheme)
    offSettingMitt = initSettingMitt()
  })

  onBeforeUnmount(() => {
    offSettingMitt?.()
  })
</script>
