import Select from './index.vue'
import ElSelect from 'element-plus/es/components/select/src/select.vue'
import {
  keepString,
  keepNumbers,
  stringSplitArray,
  stringSplitNumberArray,
  arrayJoinString
} from '@tingcode/utils'

// eslint-ignore
export const ReSelectFormatMap = {
  keepNumbers,
  keepString,
  stringSplitArray,
  stringSplitNumberArray,
  arrayJoinString
}
export type ReSelectFormatFn = (value: unknown) => any
export type ReSelectFormatName = keyof typeof ReSelectFormatMap
export type ReSelectFormat =
  | (ReSelectFormatName | ReSelectFormatFn | string)[]
  | ReSelectFormatName
  | ReSelectFormatFn
  | string
export type ElSelectInstance = InstanceType<typeof ElSelect>
export type IElSelectAttrs = ElSelectInstance['$props']
export type IElSelectSlots = ElSelectInstance['$slots']
export type IElSelectEmits = ElSelectInstance['$emit']

export type ReSelectOptionItem = {
  value: string | number | boolean
  label: string | number
  disabled?: boolean
  slot?: string
}

export type ReSelectGroupOptionItem = {
  label: string | number
  disabled?: boolean
  slot?: string
  options: ReSelectOptionItem[]
}

export interface ReSelectProps extends /** @vue-ignore */ IElSelectAttrs {
  modelValue: string | number | boolean | undefined
  options: ReSelectOptionItem[] | ReSelectGroupOptionItem[]
  type?: 'default' | 'group'
  format?: ReSelectFormat
  valueFormat?: ReSelectFormat
}

export interface ReSelectEmits {
  (event: 'change', events: unknown, updateValue: unknown): void
  (event: 'update:modelValue', events: unknown): void
}

export type ReSelectSlots = IElSelectSlots & {
  default(props: any): any
  header(props: any): any
  footer(props: any): any
  prefix(props: any): any
  empty(props: any): any
  tag(props: any): any
  loading(props: any): any
  label(props: any): any
}
export const ReSelect = Select
export default ReSelect
