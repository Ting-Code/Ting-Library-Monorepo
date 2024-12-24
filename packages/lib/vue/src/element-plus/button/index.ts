import Button from './index.vue'
import ElButton from 'element-plus/es/components/button/src/button.vue'

export type IButtonMapType = 'confirm' | 'cancel' | 'search'
export type ITButtonType = IButtonMapType | 'native'

export type ElButtonInstance = InstanceType<typeof ElButton>
export type IElButtonAttrs = ElButtonInstance['$props']
export type IElButtonSlots = ElButtonInstance['$slots']
export type IElButtonEmits = ElButtonInstance['$emit']

export interface ITButtonProps extends /** @vue-ignore */ Omit<IElButtonAttrs, 'type'> {
  type?: ITButtonType | IElButtonAttrs['type']
}
export type ReButtonProps = ITButtonProps

export interface ReButtonEmits extends /** @vue-ignore */ IElButtonEmits {}

export type ReButtonSlots = IElButtonSlots
export const ReButton = Button
export default ReButton
