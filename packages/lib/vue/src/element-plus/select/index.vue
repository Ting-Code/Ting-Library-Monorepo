<template>
  <ElSelect v-bind="$attrs" :model-value="displayValue" @change="handleChange">
    <template v-for="(_, name) in slots" #[name]="slotData">
      <template v-if="name !== 'default'">
        <slot :name="name" v-bind="slotData"></slot>
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
          v-for="selectItem in selectGroupItem.options"
          :disabled="!!selectItem.disabled"
          :value="selectItem.value"
          :label="selectItem.label"
          :key="`${selectItem.value}${selectItem.label}`"
        >
          <template v-for="(_, name) in slots" #[name]="native">
            <template v-if="selectItem.slot === name">
              <slot :name="name" v-bind="{ selectGroupItem, selectItem, native }"></slot>
            </template>
          </template>
        </ElOption>
        <template v-for="(_, name) in slots" #[name]="native">
          <template v-if="selectGroupItem.slot === name">
            <slot :name="name" v-bind="{ selectGroupItem, native }"></slot>
          </template>
        </template>
      </ElOptionGroup>
    </template>
    <template v-else>
      <ElOption
        v-for="selectItem in props.options as ReSelectOptionItem[]"
        :disabled="!!selectItem.disabled"
        :value="selectItem.value"
        :label="selectItem.label"
        :key="`${selectItem.value}${selectItem.label}`"
      >
        <template v-for="(_, name) in slots" #[name]="native">
          <template v-if="selectItem.slot === name">
            <slot :name="name" v-bind="{ selectItem, native }"></slot>
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
  import { ref, computed } from 'vue'
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

  const isShowOriginValue = ref<boolean>(false)

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
    isShowOriginValue.value = true
    emits('change', event, updateValue)
    emits('update:modelValue', updateValue)
  }
</script>
