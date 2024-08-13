import { throttle, debounce } from '@tingcode/utils'

export type RemoveEventFn = () => void
export interface UseEventParams {
  el?: Element | Window | any
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}
export function useEventListener({
  el = window,
  name,
  listener,
  options,
  isDebounce = true,
  wait = 80
}: UseEventParams): { removeEvent: RemoveEventFn } {
  let remove: RemoveEventFn = () => {}

  if (el) {
    const element = el as Element

    const handler = isDebounce ? debounce(listener, wait) : throttle(listener, wait)
    const realHandler = wait ? handler : listener
    const removeEventListener = (e: Element) => {
      e.removeEventListener(name, realHandler, options)
    }
    const addEventListener = (e: Element = el) => e.addEventListener(name, realHandler, options)

    addEventListener()

    remove = () => {
      removeEventListener(element)
    }
  }
  return { removeEvent: remove }
}
