<template>
  <div class="dynamic-height-wrapper">
    <VirtualScroll :itemHeight="40" :items="listRef" :height="300" width="100%">
      <template #default="{ item }">
        <div :style="{ border: '1px solid #eee' }">
          {{ item.label }}
        </div>
      </template>
    </VirtualScroll>
  </div>
</template>

<script setup lang="ts">
  import { VirtualScroll } from '@tingcli/lib-vue'
  defineOptions({
    name: 'DynamicHeight',
    inheritAttrs: false
  })
  const list = []
  for (let i = 0; i < 10000; i++) {
    list.push({
      id: i,
      label: `virtual-list ${i}`
    })
  }
  const listRef = ref(list)
  console.log(listRef)
</script>

<style lang="scss" scoped>
  .dynamic-height-wrapper {
    height: 300px;
    border: 1px solid #797979;
  }
</style>
