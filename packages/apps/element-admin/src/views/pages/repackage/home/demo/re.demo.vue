<template>
  <Demo ref="demo" v-bind="{ ...props, ...$attrs }">
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </Demo>
</template>
<script setup lang="ts">
  import { Demo } from '@tingcli/element-plus'
  type IChildInstance = InstanceType<typeof Demo>['$props']
  const props = defineProps<IChildInstance>()
  defineOptions({
    name: 'ReDemo'
  })
  const slots = defineSlots()
</script>
