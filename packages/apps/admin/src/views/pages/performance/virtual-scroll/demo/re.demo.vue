<template>
  <Demo v-bind="$attrs" />
  <ReButton type="cancel" @click.stop="(e) => console.log(e)" />
</template>
<script setup lang="ts">
  import { Demo } from '@tingcli/lib-vue'
  import { ReButton } from '@tingcli/lib-vue'
  defineOptions({
    name: 'ReDemo',
    inheritAttrs: false
  })
</script>
