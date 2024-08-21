import { createBrowserRouter } from 'react-router-dom'
import { routers } from '@/router/baseRouters'
import { isProdMode } from '@/utils/env'

export const router: any = createBrowserRouter(routers, {
  basename: isProdMode() ? '/micro/react' : ''
})
