import Col from './index.vue'
import ElCol from 'element-plus/es/components/col/src/col.vue'

export type ElColInstance = InstanceType<typeof ElCol>
export type IElColAttrs = ElColInstance['$props']
export type IElColSlots = ElColInstance['$slots']
export type IElColEmits = ElColInstance['$emit']

export interface ReColProps extends /** @vue-ignore */ IElColAttrs {}

export interface ReColEmits {
  // (event: 'focus', events: FocusEvent): void
  // (event: 'blur', events: FocusEvent): void
  // (event: 'update:modelValue', events: unknown): void
}

export type ReColSlots = IElColSlots
export const ReCol = Col
export default ReCol
