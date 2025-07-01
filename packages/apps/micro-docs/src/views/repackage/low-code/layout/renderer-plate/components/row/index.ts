import Row from './index.vue'
import ElRow from 'element-plus/es/components/row/src/row.vue'

export type ElRowInstance = InstanceType<typeof ElRow>
export type IElRowAttrs = ElRowInstance['$props']
export type IElRowSlots = ElRowInstance['$slots']
export type IElRowEmits = ElRowInstance['$emit']

export interface ReRowProps extends /** @vue-ignore */ IElRowAttrs {}

export interface ReRowEmits {
  // (event: 'focus', events: FocusEvent): void
  // (event: 'blur', events: FocusEvent): void
  // (event: 'update:modelValue', events: unknown): void
}

export type ReRowSlots = IElRowSlots
export const ReRow = Row
export default ReRow
