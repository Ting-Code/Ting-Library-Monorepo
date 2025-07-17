import Form from './index.vue'
import ElForm from 'element-plus/es/components/form/src/form.vue'

export type ElFormInstance = InstanceType<typeof ElForm>
export type IElFormAttrs = ElFormInstance['$props']
export type IElFormSlots = ElFormInstance['$slots']
export type IElFormEmits = ElFormInstance['$emit']

export interface ReFormProps extends /** @vue-ignore */ IElFormAttrs {}

export interface ReFormEmits {
  // (event: 'focus', events: FocusEvent): void
  // (event: 'blur', events: FocusEvent): void
  // (event: 'update:modelValue', events: unknown): void
}

export type ReFormSlots = IElFormSlots
export const ReForm = Form
export default ReForm
