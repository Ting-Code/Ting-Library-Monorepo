import Radio from './index.vue'
import ElRadioGroup from 'element-plus/es/components/radio/src/radio-group.vue'
import { keepNumbers } from '@tingcode/utils'

// eslint-ignore
export const ReRadioFormatMap = {
  keepNumbers
}
export type ReRadioFormatFn = (value: unknown) => any
export type ReRadioFormatName = keyof typeof ReRadioFormatMap
export type ReRadioFormat =
  | (ReRadioFormatName | ReRadioFormatFn | string)[]
  | ReRadioFormatName
  | ReRadioFormatFn
  | string
export type ElRadioInstance = InstanceType<typeof ElRadioGroup>
export type IElRadioAttrs = ElRadioInstance['$props']
export type IElRadioSlots = ElRadioInstance['$slots']
export type IElRadioEmits = ElRadioInstance['$emit']

export type ReRadioOptionItem = {
  value: string | number | boolean
  label: string | number | boolean
  disabled?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  name?: string
}

export interface ReRadioProps extends /** @vue-ignore */ IElRadioAttrs {
  modelValue: string | number | boolean | undefined
  options: ReRadioOptionItem[]
  type?: 'default' | 'button'
  format?: ReRadioFormat
  valueFormat?: ReRadioFormat
}

export interface ReRadioEmits {
  (event: 'change', events: unknown, updateValue: unknown): void
  (event: 'update:modelValue', events: unknown): void
}

export type ReRadioSlots = {
  default(props: ReRadioOptionItem): any
}
export const ReRadio = Radio
export default ReRadio
