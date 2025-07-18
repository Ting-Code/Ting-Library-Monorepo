<template>
  <ElCheckboxGroup v-bind="$attrs" :model-value="displayValue" @change="handleChange">
    <template v-if="props.type === 'button'">
      <ElCheckboxButton
        v-for="item in props.options as ReCheckboxOptionItem[]"
        :disabled="!!item.disabled"
        :value="item.value"
        :label="item.label"
        :key="`${item.value}${item.label}`"
        v-bind="{ ...item }"
      >
        <template v-if="slots.default && slots.default({})">
          <slot name="default" v-bind="{ ...item }"></slot>
        </template>
        <template v-else>
          {{ item.label }}
        </template>
      </ElCheckboxButton>
    </template>
    <template v-else>
      <ElCheckbox
        v-for="item in props.options as ReCheckboxOptionItem[]"
        :disabled="!!item.disabled"
        :value="item.value"
        :label="item.label"
        :key="`${item.value}${item.label}`"
        v-bind="{ ...item }"
      >
        <template v-if="slots.default && slots.default({})">
          <slot name="default" v-bind="{ ...item }"></slot>
        </template>
        <template v-else>
          {{ item.label }}
        </template>
      </ElCheckbox>
    </template>
  </ElCheckboxGroup>
</template>

<script setup lang="ts">
  import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton } from 'element-plus'
  import {
    ReCheckboxProps,
    ReCheckboxSlots,
    ReCheckboxEmits,
    ReCheckboxFormat,
    ReCheckboxFormatMap,
    ReCheckboxOptionItem
  } from './index'
  import { computed } from 'vue'
  import { isArray, isFunction, isString } from '@tingcode/utils'

  defineOptions({
    name: 'ReCheckbox',
    inheritAttrs: false
  })

  // 继承子组件props类型
  const props = withDefaults(defineProps<ReCheckboxProps>(), {
    type: 'default',
    format: () => (val: unknown) => val,
    valueFormat: () => (val: unknown) => val
  })

  const slots = defineSlots<ReCheckboxSlots>()

  const emits = defineEmits<ReCheckboxEmits>()

  const displayValue = computed(() => {
    if (isArray(props.format)) {
      return props.format.reduce((value, format) => {
        return transformFormatValue(format, value)
      }, props.modelValue)
    }
    return transformFormatValue(props.format, props.modelValue)
  })

  const transformFormatValue = (format: ReCheckboxFormat, value: unknown) => {
    if (isString(format)) {
      return ReCheckboxFormatMap[format] ? ReCheckboxFormatMap[format]?.(value) : value
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
    emits('change', event, updateValue)
    emits('update:modelValue', updateValue)
  }
</script>
