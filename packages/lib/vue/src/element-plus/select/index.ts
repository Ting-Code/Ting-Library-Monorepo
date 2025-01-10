import Select from './index.vue'
import ElSelect from 'element-plus/es/components/select/src/select.vue'
import { keepNumbers } from '@tingcode/utils'

// eslint-ignore
export const ReSelectFormatMap = {
  keepNumbers
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
  default(props: unknown): unknown
  header(props: unknown): unknown
  footer(props: unknown): unknown
  prefix(props: unknown): unknown
  empty(props: unknown): unknown
  tag(props: unknown): unknown
  loading(props: unknown): unknown
  label(props: unknown): unknown
}
export const ReSelect = Select
export default ReSelect
