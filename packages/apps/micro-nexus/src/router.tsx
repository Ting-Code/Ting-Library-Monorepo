import { createBrowserRouter } from 'react-router-dom'

import { HeatmapPage } from '@/routes/heatmap-page'

/** 与 `vite.config.ts` 的 `base` 一致，由 Vite 注入 `import.meta.env.BASE_URL` */
const basename = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '') || '/'

export const router = createBrowserRouter(
  [
    { path: '/', element: <HeatmapPage /> },
    { path: '*', element: <HeatmapPage /> }
  ],
  { basename }
)
