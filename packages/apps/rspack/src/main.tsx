import React from 'react'
import ReactDOM from 'react-dom/client'
import { Application } from '@/components/application/inedx'
import '@/style/index.less'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routers } from '@/router'

const router = createBrowserRouter(routers)
const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <Application>
    <RouterProvider router={router} />
  </Application>
)
