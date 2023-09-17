import REButton from './index.vue'
import { ElButton } from 'element-plus'

export type IButtonMapType = 'confirm' | 'cancel' | 'search'
export type ITButtonType = IButtonMapType | 'native'

// 获取子组件props类型
type IElButton = InstanceType<typeof ElButton>
export type IElButtonAttrs = IElButton['$props']
export type IElButtonSlots = IElButton['$slots']
export type IElButtonEmits = IElButton['$emit']

export interface ITButtonProps extends /** @vue-ignore */ Omit<IElButtonAttrs, 'type'> {
  type?: ITButtonType | IElButtonAttrs['type']
}

export interface ITButtonEmits extends /** @vue-ignore */ IElButtonEmits {}

export interface ITButtonSlots extends /** @vue-ignore */ IElButtonSlots {
  default(): any
  loading(): any
  icon(): any
}

export { REButton }
