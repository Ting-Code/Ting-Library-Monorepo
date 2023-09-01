import Demo from './demo.vue'

export { Demo }
export interface IDemoProps {
  loading?: boolean
  readonly?: boolean
  app?: string | undefined
  number: number
}
