import Input from './index.vue'
import ElInput from 'element-plus/es/components/input/src/input.vue'
import { round2D } from '@tingcode/utils'

import {
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

export type FormatName = keyof typeof FormatMap
export type Format = ((value: unknown) => string | number) | FormatName
export type ElInputInstance = InstanceType<typeof ElInput>
export type IElInputAttrs = ElInputInstance['$props']
export type IElInputSlots = ElInputInstance['$slots']
export type IElInputEmits = ElInputInstance['$emit']
export type ReInputProps = /** @vue-ignore */ IElInputAttrs & {
  format?: Format | Format[]
  valueFormat?: Format | Format[]
}

export type ReInputEmits = /** @vue-ignore */ IElInputEmits

export type ReInputSlots = IElInputSlots
export const ReInput = Input
export default ReInput
