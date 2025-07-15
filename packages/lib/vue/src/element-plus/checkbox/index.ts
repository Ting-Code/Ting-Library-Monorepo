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
export const ReCheckboxFormatMap = {
  keepNumbers,
  keepString,
  stringSplitArray,
  stringSplitNumberArray,
  arrayJoinString
}
export type ReCheckboxFormatFn = (value: unknown) => any
export type ReCheckboxFormatName = keyof typeof ReCheckboxFormatMap
export type ReCheckboxFormat =
  | (ReCheckboxFormatName | ReCheckboxFormatFn | string)[]
  | ReCheckboxFormatName
  | ReCheckboxFormatFn
  | string
export type ElCheckboxGroupInstance = InstanceType<typeof ElCheckboxGroup>
export type IElCheckboxGroupAttrs = ElCheckboxGroupInstance['$props']
export type IElCheckboxGroupSlots = ElCheckboxGroupInstance['$slots']
export type IElCheckboxGroupEmits = ElCheckboxGroupInstance['$emit']

export type ElCheckboxInstance = InstanceType<typeof ElCheckbox>
export type IElCheckboxAttrs = ElCheckboxInstance['$props']
export interface ReCheckboxOptionItem extends /** @vue-ignore */ IElCheckboxAttrs {}

export interface ReCheckboxProps extends /** @vue-ignore */ IElCheckboxGroupAttrs {
  modelValue: string[] | number[] | undefined
  options: ReCheckboxOptionItem[]
  type?: 'default' | 'button'
  format?: ReCheckboxFormat
  valueFormat?: ReCheckboxFormat
}

export interface ReCheckboxEmits {
  (event: 'change', events: unknown, updateValue: unknown): void
  (event: 'update:modelValue', events: unknown): void
}

export type ReCheckboxSlots = IElCheckboxGroupSlots & {
  default(props: ReCheckboxOptionItem): any
}
export const ReCheckbox = CheckboxGroup
export default ReCheckbox
