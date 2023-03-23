<template>
  <div @click.stop="toggleCollapsed">
    <Icon icon="common-left" size="18" v-if="getCollapsed" />
    <Icon icon="common-right" size="18" v-else />
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@common/components'
  import { useMenuSetting } from '@/hooks/use-setting/useMenuSetting'
  const { getCollapsed, toggleCollapsed } = useMenuSetting()
</script>
