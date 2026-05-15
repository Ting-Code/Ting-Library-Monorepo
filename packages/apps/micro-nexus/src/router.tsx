import { createBrowserRouter } from 'react-router-dom'

import { HeatmapPage } from '@/routes/heatmap-page'

const basename = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '') || '/'

export const router = createBrowserRouter(
  [
    { path: '/', element: <HeatmapPage /> },
    { path: '*', element: <HeatmapPage /> }
  ],
  { basename }
)
