import {
  ReButton,
  ReButtonProps,
  ReInput,
  ReInputProps,
  ReRadio,
  ReRadioProps
} from '@tingcode/lib-vue'
import { ReForm, ReFormProps } from '../form/index'
import { ReFormItem, ReFormItemProps } from '../form-item/index'
export const ComponentMap = {
  ReButton,
  ReForm,
  ReFormItem,
  ReInput,
  ReRadio
}

type IFieldAttrs = ReButtonProps | ReFormProps | ReFormItemProps | ReInputProps | ReRadioProps

export type ISlotName = string | { native?: string; name: string }

export interface IField {
  type: keyof typeof ComponentMap
  attrs?: IFieldAttrs
  wrapper?: string
  wrapperAttrs?: IFieldAttrs
  wrapperSlotName?: string | ISlotName[] | ISlotName
  slotName?: string | ISlotName[] | ISlotName
  child?: IField[] | IField
}

export interface RenderWidgetProps {
  field: IField
}

export { default as RenderWidget, default } from './index.vue'
