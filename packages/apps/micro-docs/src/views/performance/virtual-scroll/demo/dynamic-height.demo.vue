<template>
  <div class="dynamic-height-wrapper">
    <DynamicScroller :items="listRef" :min-item-size="50" key-field="id" class="scroller">
      <template #default="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" :data-index="index">
          <div class="item-box" :style="{ height: item.height }">
            <h3>{{ item.id }}</h3>
            <p>{{ item.label }}</p>
            <p>height：{{ item.height }}</p>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore
  import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  defineOptions({
    name: 'DynamicHeight',
    inheritAttrs: false
  })
  const list: unknown[] = []
  // 用于生成随机高度
  const getRandomHeight = () => {
    return Math.floor(Math.random() * (120 - 60 + 1)) + 60
  }
  for (let i = 0; i < 10000; i++) {
    list.push({
      id: i,
      label: `virtual-list ${i}`,
      height: `${getRandomHeight()}px`
    })
  }
  const listRef = ref(list)
</script>

<style lang="scss" scoped>
  .dynamic-height-wrapper {
    .scroller {
      height: 300px;
    }
    .item-box {
      display: flex;
      align-items: center;
      border: 1px solid white;
    }
  }
</style>
