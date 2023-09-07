<template>
  <Demo ref="demo" v-bind="{ ...props?.attrs }">
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </Demo>
</template>
<script setup lang="ts">
  import { Demo } from '@tingcli/lib-vue'

  defineOptions({
    name: 'ReDemo',
    inheritAttrs: false
  })

  // 获取子组件props类型
  type IChildComponentType = InstanceType<typeof Demo>
  type IChildAttrs = IChildComponentType['$props']
  type IChildSlots = IChildComponentType['$slots']
  type IChildEmits = IChildComponentType['$emit']
  // 继承子组件props类型
  interface IProps {
    attrs: IChildAttrs
    slots?: IChildSlots
    emits: IChildEmits
    myType: any
  }
  // 继承子组件props类型
  const props = defineProps<IProps>()

  const slots = defineSlots<{
    default(props: { msg: string }): any
    ting(props: { ting: string }): any
    king(props: { msg: string }): any
  }>()
</script>
