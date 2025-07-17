import FormItem from './index.vue'
import ElFormItem from 'element-plus/es/components/form/src/form-item.vue'

export type ElFormItemInstance = InstanceType<typeof ElFormItem>
export type IElFormItemAttrs = ElFormItemInstance['$props']
export type IElFormItemSlots = ElFormItemInstance['$slots']
export type IElFormItemEmits = ElFormItemInstance['$emit']

export interface ReFormItemProps extends /** @vue-ignore */ IElFormItemAttrs {}

export interface ReFormItemEmits {
  // (event: 'focus', events: FocusEvent): void
  // (event: 'blur', events: FocusEvent): void
  // (event: 'update:modelValue', events: unknown): void
}

export type ReFormItemSlots = IElFormItemSlots
export const ReFormItem = FormItem
export default ReFormItem
