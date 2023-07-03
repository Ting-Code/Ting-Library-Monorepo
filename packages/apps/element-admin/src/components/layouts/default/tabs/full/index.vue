<template>
  <Icon icon="layout-full" size="20" v-if="!isMobile" @click="toggleIsOpenSetting" />
</template>

<script setup lang="ts">
  import Icon from '@/components/Icon/Icon.vue'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  import { toRefs } from 'vue'
  import { useAppProviderContext } from '@/components/application/useAppContext'
  const { toggleIsOpenSetting } = useRootSetting()
  defineOptions({
    name: 'TabsFull'
  })

  const { isMobile } = toRefs(useAppProviderContext())
</script>
