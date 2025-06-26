<template>
  <div class="container">
    <div class="source-box">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        :draggable="true"
        @dragstart="dragstart(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="target-box" @drop="drop" @dragover.prevent>
      <div v-for="(item, index) in targetList" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useSortable } from '@vueuse/integrations/useSortable'

  const dataList = ref(['item1', 'item2', 'item3'])
  const targetList = ref(['item6'])

  const draggedItem = ref(null)

  const dragstart = (item) => {
    draggedItem.value = item
  }

  const drop = () => {
    if (draggedItem.value) {
      targetList.value.push(draggedItem.value)
      dataList.value = dataList.value.filter((i) => i !== draggedItem.value)
      draggedItem.value = null
    }
  }

  // 依据类名添加选择器
  useSortable('.source-box', dataList, {})
  useSortable('.target-box', targetList, {})
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .source-box,
  .target-box {
    border: 1px solid #fc0707;
    padding: 10px;
    margin: 10px;
    width: 100%;
    min-height: 200px;
  }
</style>
