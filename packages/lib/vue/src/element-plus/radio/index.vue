<template>
  <ElRadioGroup v-bind="$attrs" :model-value="displayValue" @change="handleChange">
    <template v-if="props.type === 'button'">
      <ElRadioButton
        v-for="item in props.options"
        v-bind="{ ...item }"
        :key="`${item.value}${item.label}`"
      >
        <template v-for="(_, name) in slots" #[name]="native">
          <slot :name="name" v-bind="{ row: item, native }"></slot>
        </template>
      </ElRadioButton>
    </template>
    <template v-else>
      <ElRadio
        v-for="item in props.options"
        v-bind="{ ...item }"
        :key="`${item.value}${item.label}`"
      >
        <template v-for="(_, name) in slots" #[name]="native">
          <slot :name="name" v-bind="{ row: item, native }"></slot>
        </template>
      </ElRadio>
    </template>
  </ElRadioGroup>
</template>

<script setup lang="ts">
  import { ElRadio, ElRadioGroup, ElRadioButton } from 'element-plus'
  import {
    ReRadioProps,
    ReRadioSlots,
    ReRadioEmits,
    ReRadioFormat,
    ReRadioFormatMap
  } from './index'
  import { ref, computed } from 'vue'
  import { isArray, isFunction, isString } from '@tingcode/utils'

  defineOptions({
    name: 'ReRadio',
    inheritAttrs: false
  })

  // 继承子组件props类型
  const props = withDefaults(defineProps<ReRadioProps>(), {
    type: 'default',
    format: () => (val: unknown) => val,
    valueFormat: () => (val: unknown) => val
  })

  const slots = defineSlots<ReRadioSlots>()

  const emits = defineEmits<ReRadioEmits>()

  const isShowOriginValue = ref<boolean>(false)

  const displayValue = computed(() => {
    if (isArray(props.format)) {
      return props.format.reduce((value, format) => {
        return transformFormatValue(format, value)
      }, props.modelValue)
    }
    return transformFormatValue(props.format, props.modelValue)
  })

  const transformFormatValue = (format: ReRadioFormat, value: unknown) => {
    if (isString(format)) {
      return ReRadioFormatMap[format] ? ReRadioFormatMap[format]?.(value) : value
    }
    if (isFunction(format)) {
      return format(value)
    }
    return value
  }

  const handleChange = (event: unknown) => {
    let updateValue
    if (isArray(props.valueFormat)) {
      updateValue = props.valueFormat.reduce((preValue, format) => {
        return transformFormatValue(format, preValue)
      }, event)
    } else {
      updateValue = transformFormatValue(props.valueFormat, event)
    }
    isShowOriginValue.value = true
    emits('change', event, updateValue)
    emits('update:modelValue', updateValue)
  }
</script>
