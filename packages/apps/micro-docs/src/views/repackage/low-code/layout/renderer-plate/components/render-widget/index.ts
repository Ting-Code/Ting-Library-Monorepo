import { ReButton, ReButtonProps } from '@tingcode/lib-vue'

export const componentMap = {
  ReButton
}

type IFieldAttrs = ReButtonProps
export type ISlotName = string | { native?: string; name: string }

export interface IField {
  type: string
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
