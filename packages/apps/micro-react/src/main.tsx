import React from 'react'
import ReactDOM from 'react-dom/client'
import { Application } from '@/components/application/inedx'
import '@/style/index.less'
import('@/style/test.less')
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'

const rootElement = document.getElementById('rspack') as HTMLElement
let rspack: ReactDOM.Root

window.mount = () => {
  rspack = ReactDOM.createRoot(rootElement)
  rspack.render(
    <Application>
      <RouterProvider router={router} />
    </Application>
  )
}

window.unmount = () => {
  rspack.unmount()
}
// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}
