import RenderWidget from './index.vue'

import {
  ReButton,
  ReButtonProps,
  ReInput,
  ReInputProps,
  ReRadio,
  ReRadioProps,
  ReSelect,
  ReSelectProps,
  ReCheckbox,
  ReCheckboxProps
} from '@/element-plus/index'
import { ReForm, ReFormProps } from '../form/index'
import { ReFormItem, ReFormItemProps } from '../form-item/index'
import { ReRow, ReRowProps } from '../row/index'
import { ReCol, ReColProps } from '../col/index'
import type { ISlotName } from '@/hooks'
import type { SortableEvent } from 'sortablejs'
export const ComponentMap = {
  ReButton,
  ReForm,
  ReFormItem,
  ReInput,
  ReRadio,
  ReRow,
  ReCol,
  ReSelect,
  ReCheckbox
}

type ISchemaAttrs =
  | ReButtonProps
  | ReFormProps
  | ReFormItemProps
  | ReInputProps
  | ReRadioProps
  | ReRowProps
  | ReColProps
  | ReSelectProps
  | ReCheckboxProps

export interface ISchema {
  type: keyof typeof ComponentMap
  field?: string
  attrs?: ISchemaAttrs
  slotName?: string | ISlotName[] | ISlotName
  child?: ISchema[] | ISchema | never[]
  hide?: boolean
  id?: string
}

export interface RenderWidgetProps {
  schema: ISchema
  model?: any
  isDrag?: boolean
  index?: number
  parentSchema?: ISchema
  parentSchemaId?: string
  parentSchemaType?: keyof typeof ComponentMap
  selectSchemaId?: string
}

export interface RenderWidgetEmits {
  (event: 'click', events: FocusEvent): void
  (event: 'selectSchema', schemaItem: ISchema): void
  (event: 'startSchema', schemaItem: ISchema, evt: SortableEvent): void
  (event: 'addSchema', schemaItem: ISchema, evt: SortableEvent): void
  (event: 'removeSchema', schemaItem: ISchema, evt: SortableEvent): void
  (event: 'updateSchema', schemaItem: ISchema, evt: SortableEvent): void
  (event: 'endSchema', schemaItem: ISchema, evt: SortableEvent): void
  (event: 'upLevel', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
  (event: 'moveUp', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
  (event: 'moveDown', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
  (event: 'delete', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
  (event: 'copy', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
}

export { RenderWidget }
export default RenderWidget
