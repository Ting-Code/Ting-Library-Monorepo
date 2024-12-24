import Input from './index.vue'
import ElInput from 'element-plus/es/components/input/src/input.vue'

export type ElInputInstance = InstanceType<typeof ElInput>
export type IElInputAttrs = ElInputInstance['$props']
export type IElInputSlots = ElInputInstance['$slots']
export type IElInputEmits = ElInputInstance['$emit']
export type ReInputProps = /** @vue-ignore */ IElInputAttrs

export type ReInputEmits = /** @vue-ignore */ IElInputEmits

export type ReInputSlots = IElInputSlots
export const ReInput = Input
export default ReInput
