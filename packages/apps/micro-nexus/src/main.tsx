import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from '@/router'
import '@/styles/globals.css'

const mount = document.getElementById('nexus')
if (!mount) {
  throw new Error('[micro-nexus] 挂载节点 #nexus 不存在，请检查 index.html')
}

createRoot(mount).render(
  <StrictMode>
    <div className="nexus-app-shell">
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </div>
  </StrictMode>
)
