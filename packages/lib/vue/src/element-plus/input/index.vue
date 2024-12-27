<template>
  <ElInput
    v-bind="$attrs"
    :model-value="displayValue"
    @focus="handleFocus"
    @input="emitInput"
    @blur="handleBlur"
  >
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </ElInput>
</template>

<script setup lang="ts">
  import { ElInput } from 'element-plus'
  import { ReInputProps, ReInputSlots, ReInputEmits, Format, FormatMap } from './index'
  import { computed, onMounted, ref } from 'vue'
  import { isArray, isFunction, isString } from '@tingcode/utils'

  defineOptions({
    name: 'ReInput',
    inheritAttrs: false
  })

  // 继承子组件props类型
  const props = withDefaults(defineProps<ReInputProps>(), {
    format: () => [(val: unknown) => val],
    valueFormat: () => (val: unknown) => val
  })

  onMounted(() => {
    console.log(props, props.modelValue, props.size, props.format)
  })

  const slots = defineSlots<ReInputSlots>()

  const emits = defineEmits<ReInputEmits>()

  const isShowOriginValue = ref<boolean>(false)

  const displayValue = computed(() => {
    console.log('========modelValue=========', props.modelValue, props.size, props.format)
    if (isShowOriginValue.value) return props.modelValue
    if (isArray(props.format)) {
      return props.format.reduce((value, format) => {
        return transformFormatValue(format, value)
      }, props.modelValue)
    }
    return transformFormatValue(props.format, props.modelValue)
  })

  const transformFormatValue = (format: Format, value: unknown) => {
    if (isString(format)) {
      return FormatMap[format] ? FormatMap[format]?.(value) : value
    }
    if (isFunction(format)) {
      return format(value)
    }
    return value
  }

  const emitInput = (value) => {
    console.log('=========input============', value)
    let updateValue = value
    if (isArray(props.valueFormat)) {
      updateValue = props.valueFormat.reduce((preValue, format) => {
        return transformFormatValue(format, preValue)
      }, value)
    } else {
      updateValue = transformFormatValue(props.valueFormat, value)
    }
    emits('update:modelValue', updateValue)
    emits('input', updateValue)
  }

  const handleFocus = (event: FocusEvent) => {
    console.log('=========handleFocus===============')
    isShowOriginValue.value = true
    emits('focus', event)
  }

  const handleBlur = (event: FocusEvent) => {
    isShowOriginValue.value = false
    emits('blur', event)
  }
</script>
