import { DialogProps, ElDialog, ElConfigProvider } from 'element-plus'
import { App, Component, createApp, h, ref } from 'vue'

export const useDialog = <T extends Partial<DialogProps>>(
  options?: T,
  component?: Component,
  namespace: string = 'admin'
) => {
  const Dialog = component || ElDialog
  const visible = ref<boolean>(false)
  const appDocument = document.querySelector('#app')!
  let div: HTMLDivElement
  let app: App<Element>
  const create = () => {
    div = document.createElement('div')
    appDocument.appendChild(div)
    app = createApp({
      render() {
        return h(ElConfigProvider, { namespace } as any, () =>
          h(Dialog, {
            modelValue: visible.value,
            'onUpdate:modelValue': (newVisible) => {
              visible.value = newVisible
            },
            ...options
          })
        )
      }
    })
    app.mount(div)
  }
  const close = () => {
    app.unmount()
    div.remove()
  }
  const hide = () => {
    visible.value = false
  }
  const show = () => {
    visible.value = true
  }
  return {
    hide,
    show,
    close,
    create
  }
}
