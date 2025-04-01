<template>
  <ElSelect v-bind="$attrs" :model-value="displayValue" @change="handleChange">
    <template v-for="(_, name) in slots" #[name]="native">
      <template v-if="name !== 'default'">
        <slot :name="name" v-bind="native"></slot>
      </template>
    </template>
    <template v-if="props.type === 'group'">
      <ElOptionGroup
        v-for="selectGroupItem in props.options as ReSelectGroupOptionItem[]"
        :lable="selectGroupItem.label"
        :disabled="!!selectGroupItem.disabled"
        :key="selectGroupItem.label"
      >
        <ElOption
          v-for="item in selectGroupItem.options"
          :disabled="!!item.disabled"
          :value="item.value"
          :label="item.label"
          :key="`${item.value}${item.label}`"
        >
          <template v-for="(_, name) in slots" #[name]="native">
            <template v-if="item.slot === name">
              <slot :name="name" v-bind="{ groupRow: selectGroupItem, row: item, native }"></slot>
            </template>
          </template>
        </ElOption>
        <template v-for="(_, name) in slots" #[name]="native">
          <template v-if="selectGroupItem.slot === name">
            <slot :name="name" v-bind="{ groupRow: selectGroupItem, native }"></slot>
          </template>
        </template>
      </ElOptionGroup>
    </template>
    <template v-else>
      <ElOption
        v-for="item in props.options as ReSelectOptionItem[]"
        :disabled="!!item.disabled"
        :value="item.value"
        :label="item.label"
        :key="`${item.value}${item.label}`"
      >
        <template v-for="(_, name) in slots" #[name]="native">
          <template v-if="item.slot === name">
            <slot :name="name" v-bind="{ row: item, native }"></slot>
          </template>
        </template>
      </ElOption>
    </template>
  </ElSelect>
</template>

<script setup lang="ts">
  import { ElSelect, ElOption, ElOptionGroup } from 'element-plus'
  import {
    ReSelectProps,
    ReSelectSlots,
    ReSelectEmits,
    ReSelectFormat,
    ReSelectFormatMap,
    ReSelectGroupOptionItem,
    ReSelectOptionItem
  } from './index'
  import { computed } from 'vue'
  import { isArray, isFunction, isString } from '@tingcode/utils'

  defineOptions({
    name: 'ReSelect',
    inheritAttrs: false
  })

  // 继承子组件props类型
  const props = withDefaults(defineProps<ReSelectProps>(), {
    type: 'default',
    format: () => (val: unknown) => val,
    valueFormat: () => (val: unknown) => val
  })

  const slots = defineSlots<ReSelectSlots>()

  const emits = defineEmits<ReSelectEmits>()

  const displayValue = computed(() => {
    if (isArray(props.format)) {
      return props.format.reduce((value, format) => {
        return transformFormatValue(format, value)
      }, props.modelValue)
    }
    return transformFormatValue(props.format, props.modelValue)
  })

  const transformFormatValue = (format: ReSelectFormat, value: unknown) => {
    if (isString(format)) {
      return ReSelectFormatMap[format] ? ReSelectFormatMap[format]?.(value) : value
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
