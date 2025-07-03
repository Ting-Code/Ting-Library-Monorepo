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

type ISchemaAttrs =
  | ReButtonProps
  | ReFormProps
  | ReFormItemProps
  | ReInputProps
  | ReRadioProps
  | ReRowProps
  | ReColProps

export type ISlotName = string | { native?: string; name: string }

export interface ISchema {
  type: keyof typeof ComponentMap
  field?: string
  attrs?: ISchemaAttrs
  slotName?: string | ISlotName[] | ISlotName
  child?: ISchema[] | ISchema
  hide?: boolean
  key?: string
}

export interface RenderWidgetProps {
  schema: ISchema
  model?: any
}

export { default as RenderWidget, default } from './index.vue'
