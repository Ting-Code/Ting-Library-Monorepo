import REButton from './index.vue'
import { ElButton, ButtonProps } from 'element-plus'
import { ExtractPropTypes } from 'vue'

export type IButtonMapType = 'confirm' | 'cancel' | 'search'
export type ITButtonType = IButtonMapType | 'native'

// 获取子组件props类型
type IElButton = InstanceType<typeof ElButton>
export type IElButtonAttrs = IElButton['$props']
export type IElButtonSlots = IElButton['$slots']
export type IElButtonEmits = IElButton['$emit']

export interface ITButtonPropsPS extends /** @vue-ignore */ Omit<ButtonProps, 'type'> {
  readonly type?: ITButtonType | ButtonProps['type']
  // [key: string]: any
}
export type ITButtonProps = ExtractPropTypes<ITButtonPropsPS>

export interface ITButtonEmits extends /** @vue-ignore */ IElButtonEmits {}

export interface ITButtonSlots extends /** @vue-ignore */ IElButtonSlots {
  default(): any
  loading(): any
  icon(): any
}

export { REButton }
