<template>
  <div class="fixation-height-wrapper">
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
  import { VirtualScroll } from '@tingcode/lib-vue'
  defineOptions({
    name: 'FixationHeight',
    inheritAttrs: false
  })
  const list: unknown[] = []
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
  .fixation-height-wrapper {
    height: 300px;
  }
</style>
