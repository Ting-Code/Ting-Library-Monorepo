<template>
  <ElInput v-bind="$attrs" v-model="displayValue" @focus="handleFocus" @blur="handleBlur">
    <template v-for="(_, name) in slots" #[name]="native">
      <slot :name="name" v-bind="native || {}"></slot>
    </template>
  </ElInput>
</template>

<script setup lang="ts">
  import { ElInput } from 'element-plus'
  import {
    ReInputProps,
    ReInputSlots,
    ReInputEmits,
    ReInputFormat,
    ReInputFormatMap
  } from './index'
  import { watchEffect, ref } from 'vue'
  import { isArray, isFunction, isString } from '@tingcode/utils'

  defineOptions({
    name: 'ReInput',
    inheritAttrs: false
  })

  // 继承子组件props类型
  const props = withDefaults(defineProps<ReInputProps>(), {
    format: () => (val: unknown) => val,
    valueFormat: () => (val: unknown) => val
  })

  const slots = defineSlots<ReInputSlots>()

  const emits = defineEmits<ReInputEmits>()

  const isShowOriginValue = ref<boolean>(false)

  const displayValue = ref(props.modelValue)

  const transformFormatValue = (format: ReInputFormat, value: unknown) => {
    if (isString(format)) {
      return ReInputFormatMap[format] ? ReInputFormatMap[format]?.(value) : value
    }
    if (isFunction(format)) {
      return format(value)
    }
    return value
  }

  watchEffect(() => {
    if (isShowOriginValue.value) {
      displayValue.value = props.modelValue
      return
    }
    if (isArray(props.format)) {
      displayValue.value = props.format.reduce((value, format) => {
        return transformFormatValue(format, value)
      }, props.modelValue)
      return
    }
    displayValue.value = transformFormatValue(props.format, props.modelValue)
  })

  const handleFocus = (event: FocusEvent) => {
    isShowOriginValue.value = true
    emits('focus', event)
  }

  const handleBlur = (event: FocusEvent) => {
    let updateValue
    if (isArray(props.valueFormat)) {
      updateValue = props.valueFormat.reduce((preValue, format) => {
        return transformFormatValue(format, preValue)
      }, displayValue.value)
    } else {
      updateValue = transformFormatValue(props.valueFormat, displayValue.value)
    }
    emits('update:modelValue', updateValue)
    isShowOriginValue.value = false
    emits('blur', event)
  }
</script>
