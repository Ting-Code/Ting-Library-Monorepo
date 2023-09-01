<template>
  <div>
    <div>{{ props }}</div>
    <slot name="ting" ting="ting作用域插槽"></slot>
    <slot name="king" msg="king作用域插槽"></slot>
    <slot name="default" default="king作用域插槽"></slot>
    <el-button @click="() => handleChange"> 按钮change </el-button>
    <el-button @click="() => handleUpdate"> 按钮update </el-button>
  </div>
</template>

<script setup lang="ts">
  import { IDemoProps } from './index'

  defineOptions({
    name: 'TDemo'
  })
  const props = defineProps<IDemoProps>()

  defineSlots<{
    default(props: { msg: string }): any
    ting(props: { ting: string }): any
    king(props: { msg: string }): any
  }>()

  const emit = defineEmits<{
    change: [id: number]
    update: [value: string]
  }>()

  const handleChange = (id = 123) => {
    console.log('内部封装change', id)
    emit('change', id)
  }
  const handleUpdate = (value = 'value') => {
    console.log('内部封装update', value)
    emit('update', 'value')
  }

  defineExpose({
    handleChange,
    handleUpdate
  })
</script>
