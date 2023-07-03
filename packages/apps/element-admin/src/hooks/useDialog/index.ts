import { ElDialog } from 'element-plus'
import { Component, createApp, h, ref } from 'vue'
// @ts-ignore
export const useDialog = <T extends PropType<ElDialog>>(options?: T, component?: Component) => {
  const Dialog = component || ElDialog
  const visible = ref<boolean>(false)
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp({
    render() {
      return h(Dialog, {
        modelValue: visible.value,
        'onUpdate:modelValue': (newVisible) => {
          console.log(newVisible)
          visible.value = newVisible
        },
        ...(options as any)
      })
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
