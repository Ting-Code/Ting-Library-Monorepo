import CheckboxGroup from './index.vue'
import ElCheckboxGroup from 'element-plus/es/components/checkbox/src/checkbox-group.vue'
import ElCheckbox from 'element-plus/es/components/checkbox/src/checkbox.vue'
import {
  keepString,
  keepNumbers,
  stringSplitArray,
  stringSplitNumberArray,
  arrayJoinString
} from '@tingcode/utils'

// eslint-ignore
export const ReCheckboxGroupFormatMap = {
  keepNumbers,
  keepString,
  stringSplitArray,
  stringSplitNumberArray,
  arrayJoinString
}
export type ReCheckboxGroupFormatFn = (value: unknown) => any
export type ReCheckboxGroupFormatName = keyof typeof ReCheckboxGroupFormatMap
export type ReCheckboxGroupFormat =
  | (ReCheckboxGroupFormatName | ReCheckboxGroupFormatFn | string)[]
  | ReCheckboxGroupFormatName
  | ReCheckboxGroupFormatFn
  | string
export type ElCheckboxGroupInstance = InstanceType<typeof ElCheckboxGroup>
export type IElCheckboxGroupAttrs = ElCheckboxGroupInstance['$props']
export type IElCheckboxGroupSlots = ElCheckboxGroupInstance['$slots']
export type IElCheckboxGroupEmits = ElCheckboxGroupInstance['$emit']

export type ElCheckboxInstance = InstanceType<typeof ElCheckbox>
export type IElCheckboxAttrs = ElCheckboxInstance['$props']
export interface ReCheckboxGroupOptionItem extends /** @vue-ignore */ IElCheckboxAttrs {}

export interface ReCheckboxGroupProps extends /** @vue-ignore */ IElCheckboxGroupAttrs {
  modelValue: string[] | number[] | undefined
  options: ReCheckboxGroupOptionItem[]
  type?: 'default' | 'button'
  format?: ReCheckboxGroupFormat
  valueFormat?: ReCheckboxGroupFormat
}

export interface ReCheckboxGroupEmits {
  (event: 'change', events: unknown, updateValue: unknown): void
  (event: 'update:modelValue', events: unknown): void
}

export type ReCheckboxGroupSlots = IElCheckboxGroupSlots & {
  default(props: ReCheckboxGroupOptionItem): any
}
export const ReCheckboxGroup = CheckboxGroup
export default ReCheckboxGroup
