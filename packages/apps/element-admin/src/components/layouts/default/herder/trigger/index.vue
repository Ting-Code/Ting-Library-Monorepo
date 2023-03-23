<template>
  <SideTrigger v-if="props.sider" />
  <HeaderTrigger v-else />
</template>

<script lang="ts" setup>
  import SideTrigger from './SideTrigger.vue'
  import HeaderTrigger from './HeaderTrigger.vue'

  const props = withDefaults(defineProps<{ sider: boolean }>(), { sider: true })
</script>
