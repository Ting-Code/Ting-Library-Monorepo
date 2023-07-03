import { ElDialog, ElConfigProvider } from 'element-plus'
import { Component, createApp, h, ref } from 'vue'
import { NAMESPACE } from '@/hooks/useNamespace'

export const useDialog = <T extends Partial<PropType<typeof ElDialog>>>(
  options?: T,
  component?: Component
) => {
  const Dialog = component || ElDialog
  const visible = ref<boolean>(false)
  const appDocument = document.querySelector('#app')!
  const div = document.createElement('div')
  appDocument.appendChild(div)

  const app = createApp({
    render() {
      return h(ElConfigProvider, { namespace: NAMESPACE }, () =>
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

  const close = () => {
    visible.value = false
  }
  const show = () => {
    visible.value = true
  }
  return {
    show,
    close
  }
}
