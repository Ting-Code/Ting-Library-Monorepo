import ReButton from './index.vue'
import { ElButton, ButtonProps } from 'element-plus'
import { ExtractPropTypes } from 'vue'

export type IButtonMapType = 'confirm' | 'cancel' | 'search'
export type ITButtonType = IButtonMapType | 'native'

// 获取子组件props类型
type IElButton = InstanceType<typeof ElButton>
export type IElButtonAttrs = IElButton['$props']
export type IElButtonSlots = IElButton['$slots']
export type IElButtonEmits = IElButton['$emit']

export interface ITButtonProps extends /** @vue-ignore */ Omit<ButtonProps, 'type'> {
  readonly type?: ITButtonType | ButtonProps['type']
}
export type ReButtonProps = ExtractPropTypes<ITButtonProps>

export interface ReButtonEmits extends /** @vue-ignore */ IElButtonEmits {}

export interface ReButtonSlots extends /** @vue-ignore */ IElButtonSlots {
  default(): any
  loading(): any
  icon(): any
}

export { ReButton }
