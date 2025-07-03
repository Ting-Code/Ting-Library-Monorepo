<template>
  <div :class="ns.b()">
    <div :class="ns.e('source-box')">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        :draggable="true"
        @dragstart="dragstart(item)"
      >
        {{ item }}
      </div>
    </div>
    <div :class="ns.e('target-box')" @drop="drop" @dragover.prevent>
      <div v-for="(item, index) in targetList" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { useNamespace } from '@tingcode/system'

  defineOptions({ name: 'ComponentPlate' })
  const ns = useNamespace('component-plate')

  const dataList = ref(['item1', 'item2', 'item3'])
  const targetList = ref(['item6'])

  const draggedItem = ref(null)

  const dragstart = (item) => {
    draggedItem.value = item
  }

  const drop = () => {
    if (draggedItem.value) {
      targetList.value.push(draggedItem.value)
      draggedItem.value = null
    }
  }

  // 依据类名添加选择器
  useSortable(ns.e('source-box'), dataList, {})
  useSortable(ns.e('target-box'), targetList, {})
</script>

<style lang="scss" scoped>
  @include b(component-plate) {
    width: 100%;
    display: flex;
    flex-direction: column;
    @include e(source-box) {
      padding: 10px;
      margin: 10px;
      width: 100%;
      min-height: 200px;
    }
    @include e(target-box) {
      padding: 10px;
      margin: 10px;
      width: 100%;
      min-height: 200px;
    }
  }
</style>
