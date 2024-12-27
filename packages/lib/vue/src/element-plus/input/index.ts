import Input from './index.vue'
import ElInput from 'element-plus/es/components/input/src/input.vue'
import { round2D } from '@tingcode/utils'

import {
  keepNumbers,
  fixed,
  fixed2D,
  fixedDown,
  fixedDown2D,
  numberToMoney,
  numberToSimplified,
  numberToTraditional,
  numberToUnit,
  round,
  roundDown,
  roundDown2D,
  thousands,
  thousands2D,
  thousandsRound2D
} from '@tingcode/utils'

// eslint-ignore
export const FormatMap = {
  keepNumbers,
  round,
  round2D,
  roundDown2D,
  roundDown,
  fixed,
  fixed2D,
  fixedDown,
  fixedDown2D,
  thousands,
  thousands2D,
  thousandsRound2D,
  numberToSimplified,
  numberToTraditional,
  numberToMoney,
  numberToUnit
}
export type FormatFn = (value: unknown) => any
export type FormatName = keyof typeof FormatMap
export type Format = (FormatName | FormatFn | string)[] | FormatName | FormatFn | string
export type ElInputInstance = InstanceType<typeof ElInput>
export type IElInputAttrs = ElInputInstance['$props']
export type IElInputSlots = ElInputInstance['$slots']
export type IElInputEmits = ElInputInstance['$emit']

export interface ReInputProps extends /** @vue-ignore */ IElInputAttrs {
  modelValue: string | number
  format?: Format
  valueFormat?: Format
}

export interface ReInputEmits {
  (event: 'focus', events: FocusEvent): void
  (event: 'blur', events: FocusEvent): void
  (event: 'update:modelValue', events: unknown): void
}

export type ReInputSlots = IElInputSlots
export const ReInput = Input
export default ReInput
