import { ref, computed, ComputedRef, unref } from 'vue'
import { useEventListener } from '@/hooks/useEventListener'

export enum sizeEnum {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
}

export enum screenEnum {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600
}

const screenMap = new Map<sizeEnum, number>()

screenMap.set(sizeEnum.XS, screenEnum.XS)
screenMap.set(sizeEnum.SM, screenEnum.SM)
screenMap.set(sizeEnum.MD, screenEnum.MD)
screenMap.set(sizeEnum.LG, screenEnum.LG)
screenMap.set(sizeEnum.XL, screenEnum.XL)
screenMap.set(sizeEnum.XXL, screenEnum.XXL)
export { screenMap }

export interface CreateCallbackParams {
  screen: ComputedRef<sizeEnum | undefined>
  width: ComputedRef<number>
  realWidth: ComputedRef<number>
  isMobile: ComputedRef<boolean>
  screenEnum: typeof screenEnum
  screenMap: Map<sizeEnum, number>
  sizeEnum: typeof sizeEnum
}

/**
 *  @description 监听视窗大小触发事件
 * */
export function useBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
  const screenRef = ref<sizeEnum>(sizeEnum.XL)
  const realWidthRef = ref(window.innerWidth)

  function getWindowWidth() {
    const width = document.body.clientWidth
    const xs = screenMap.get(sizeEnum.XS)!
    const sm = screenMap.get(sizeEnum.SM)!
    const md = screenMap.get(sizeEnum.MD)!
    const lg = screenMap.get(sizeEnum.LG)!
    const xl = screenMap.get(sizeEnum.XL)!
    if (width < xs) {
      screenRef.value = sizeEnum.XS
    } else if (width < sm) {
      screenRef.value = sizeEnum.SM
    } else if (width < md) {
      screenRef.value = sizeEnum.MD
    } else if (width < lg) {
      screenRef.value = sizeEnum.LG
    } else if (width < xl) {
      screenRef.value = sizeEnum.XL
    } else {
      screenRef.value = sizeEnum.XXL
    }
    realWidthRef.value = width
    if (width < xs) {
      screenRef.value = sizeEnum.XS
    } else if (width < sm) {
      screenRef.value = sizeEnum.SM
    } else if (width < md) {
      screenRef.value = sizeEnum.MD
    } else if (width < lg) {
      screenRef.value = sizeEnum.LG
    } else if (width < xl) {
      screenRef.value = sizeEnum.XL
    } else {
      screenRef.value = sizeEnum.XXL
    }
    realWidthRef.value = width
  }

  useEventListener({
    el: window,
    name: 'resize',

    listener: () => {
      getWindowWidth()
      resizeFn()
    }
    // wait: 100,
  })

  getWindowWidth()
  const screenComputedRef = computed(() => unref(screenRef))
  const widthComputedRef = computed((): number => screenMap.get(unref(screenRef)!)!)
  const realWidthComputedRef = computed((): number => unref(realWidthRef))
  const isMobileComputedRef = computed((): boolean => {
    const lgWidth = screenMap.get(sizeEnum.LG)!
    return unref(realWidthRef) - 1 < lgWidth
  })
  function resizeFn() {
    fn?.({
      screenEnum,
      screenMap,
      sizeEnum,
      screen: screenComputedRef,
      width: widthComputedRef,
      realWidth: realWidthComputedRef,
      isMobile: isMobileComputedRef
    })
  }

  resizeFn()
  return {
    screenEnum,
    screenMap,
    sizeEnum,
    screenComputedRef,
    widthComputedRef,
    realWidthComputedRef,
    isMobileComputedRef
  }
}
