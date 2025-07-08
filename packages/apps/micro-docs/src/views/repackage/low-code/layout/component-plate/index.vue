<template>
  <div :class="ns.b()">
    <div :class="ns.e('source-box')" ref="el">
      <div v-for="(item, index) in dataList" :key="index" :class="ns.em('source-box', 'item')">
        {{ item }}
      </div>
    </div>
    <div :class="ns.e('target-box')" ref="el2">
      <div v-for="(item, index) in targetList" :key="index" @click="selectItem = item">
        <span
          v-if="item === selectItem"
          :class="{ [`${ns.em('target-box', 'item')}`]: item === selectItem }"
        >
          {{ selectItem }}
        </span>
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { useNamespace } from '@tingcode/system'

  defineOptions({ name: 'ComponentPlate' })
  const ns = useNamespace('component-plate')

  const dataList = ref(['item1', 'item2', 'item3'])
  const targetList = ref(['item6'])
  const el = useTemplateRef<HTMLElement>('el')
  const el2 = useTemplateRef<HTMLElement>('el2')
  const selectItem = ref('')
  // 依据类名添加选择器
  const group = { name: 'items', pull: true, put: true }
  useSortable(el, dataList, {
    handle: `.${ns.em('source-box', 'item')}`,
    group,
    onUpdate: (evt) => {
      console.log('🚀 ~ onUpdate:', evt)
    },
    // 开始拖拽的时候
    onStart: (evt) => {
      console.log('🚀 ~ onStart:', evt)
    },
    // 结束拖拽
    onEnd: (evt) => {
      console.log('🚀 ~ onEnd:', evt)
    },
    // 元素从一个列表拖拽到另一个列表
    onAdd: (evt) => {
      console.log('🚀 ~ onAdd:', evt)
    },
    // 元素从列表中移除进入另一个列表
    onRemove: (evt) => {
      console.log('🚀 ~ onRemove:', evt)
    }
  })
  useSortable(el2, targetList, {
    handle: `.${ns.em('target-box', 'item')}`,
    group,
    draggable: `.${ns.em('target-box', 'item')}`,
    onUpdate: (e) => {
      console.log('🚀 ~ e: target-box', e, targetList.value)
    }
  })
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
