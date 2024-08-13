import { emitMitt, onMitt } from '../global-data/mitt'

export function emitIsOpenSetting(value: boolean) {
  emitMitt('isOpenSetting', value)
}
export function onIsOpenSetting(fn: (opt: boolean) => void) {
  onMitt('isOpenSetting', fn)
}

export function emitIsOpenSlider(value: boolean) {
  emitMitt('isOpenSlider', value)
}
export function onIsOpenSlider(fn: (opt: boolean) => void) {
  onMitt('isOpenSlider', fn)
}
export function emitIsOpenFull(value: boolean) {
  emitMitt('isOpenFull', value)
}
export function onIsOpenFull(fn: (opt: boolean) => void) {
  onMitt('isOpenFull', fn)
}
export function emitTheme(value: string) {
  emitMitt('theme', value)
}
export function onTheme(fn: (opt: string) => void) {
  onMitt('theme', fn)
}
