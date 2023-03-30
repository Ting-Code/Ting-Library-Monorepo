import React from 'react'
import ReactDOM from 'react-dom/client'
import { Application } from '@/components/application/inedx'
import '@/style/index.less'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <Application>
    <RouterProvider router={router} />
  </Application>
)
