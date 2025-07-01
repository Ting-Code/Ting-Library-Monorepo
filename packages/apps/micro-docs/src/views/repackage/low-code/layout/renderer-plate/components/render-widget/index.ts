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
import { ReRow, ReRowProps } from '../row/index'
import { ReCol, ReColProps } from '../col/index'
export const ComponentMap = {
  ReButton,
  ReForm,
  ReFormItem,
  ReInput,
  ReRadio,
  ReRow,
  ReCol
}

type IFieldAttrs =
  | ReButtonProps
  | ReFormProps
  | ReFormItemProps
  | ReInputProps
  | ReRadioProps
  | ReRowProps
  | ReColProps

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
  model?: any
}

export { default as RenderWidget, default } from './index.vue'
