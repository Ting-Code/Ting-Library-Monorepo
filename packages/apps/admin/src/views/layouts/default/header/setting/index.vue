<template>
  <Icon icon="layout-setting" size="20" @click="toggleIsOpenSetting" />
</template>

<script setup lang="ts">
  import { Icon } from '@tingcode/lib-vue'
  import { useSetting } from '@/hooks/useSetting'
  const { toggleIsOpenSetting } = useSetting()

  defineOptions({
    name: 'HeaderSetting'
  })
</script>
