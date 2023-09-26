<template>
  <Demo v-bind="$attrs" />
</template>
<script setup lang="ts">
  import { Demo } from '@tingcli/lib-vue'

  defineOptions({
    name: 'ReDemo',
    inheritAttrs: false
  })
</script>
