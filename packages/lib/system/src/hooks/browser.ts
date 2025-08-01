import { useEventListener } from './eventListener'
import { getGlobalDataMitt } from '../global-data/mitt'
import { warn } from '@tingcode/utils'

export enum screenSizeEnum {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
}

export enum screenWidthEnum {
  XS = 576,
  SM = 768,
  MD = 992,
  LG = 1300,
  XL = 2000,
  XXL = 2600
}

const screenMap = new Map<screenSizeEnum, number>()

screenMap.set(screenSizeEnum.XS, screenWidthEnum.XS)
screenMap.set(screenSizeEnum.SM, screenWidthEnum.SM)
screenMap.set(screenSizeEnum.MD, screenWidthEnum.MD)
screenMap.set(screenSizeEnum.LG, screenWidthEnum.LG)
screenMap.set(screenSizeEnum.XL, screenWidthEnum.XL)
screenMap.set(screenSizeEnum.XXL, screenWidthEnum.XXL)
export { screenMap }

export interface CreateCallbackParams {
  screen: screenSizeEnum | undefined
  width: number
  screenWidth: number | undefined
  isMobile: boolean
}

export function getWindowScreen() {
  let screen: screenSizeEnum = screenSizeEnum.XL
  const width = document.body.clientWidth
  const xs = screenMap.get(screenSizeEnum.XS)!
  const sm = screenMap.get(screenSizeEnum.SM)!
  const md = screenMap.get(screenSizeEnum.MD)!
  const lg = screenMap.get(screenSizeEnum.LG)!
  const xl = screenMap.get(screenSizeEnum.XL)!
  if (width < xs) {
    screen = screenSizeEnum.XS
  } else if (width < sm) {
    screen = screenSizeEnum.SM
  } else if (width < md) {
    screen = screenSizeEnum.MD
  } else if (width < lg) {
    screen = screenSizeEnum.LG
  } else if (width < xl) {
    screen = screenSizeEnum.XL
  } else {
    screen = screenSizeEnum.XXL
  }
  const screenWidth = screenMap.get(screen)
  const lgWidth = screenMap.get(screenSizeEnum.MD)!
  const isMobile = width - 1 < lgWidth
  return { screen, width, screenWidth, isMobile }
}

/**
 *  @description 监听视窗大小触发事件
 * */
export function screenListen(fn?: (opt: CreateCallbackParams) => void) {
  useEventListener({
    el: window,
    name: 'resize',
    listener: () => {
      const opt = getWindowScreen()
      resizeFn(opt)
    }
    // wait: 100,
  })

  const { screen, width, screenWidth, isMobile } = getWindowScreen()

  function resizeFn(opt: CreateCallbackParams) {
    fn?.(opt)
  }

  resizeFn({ screen, width, screenWidth, isMobile })

  return {
    screen,
    width,
    screenWidth,
    isMobile
  }
}

export function addScreenListen() {
  const mitt = getGlobalDataMitt()
  if (!mitt) return warn('Mitt is not init')

  screenListen((opt) => {
    mitt.emit('browserScreen', opt)
  })
}

export function onScreenListen(fn: (opt: CreateCallbackParams) => void) {
  const mitt = getGlobalDataMitt()
  if (!mitt) return warn('Mitt is not init')
  mitt.on('browserScreen', fn)
}
