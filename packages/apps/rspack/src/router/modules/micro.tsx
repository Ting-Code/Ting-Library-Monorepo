import { RouteObject } from 'react-router-dom'
import { ErrorPage } from '@/views/common/error'
import React, { lazy, Suspense } from 'react'
const MicroAppDemo = lazy(() => import('@/views/micro/micro-app-demo/index'))
export const microRouters: RouteObject[] = [
  {
    path: '/microAppDemo',
    element: (
      <Suspense>
        <MicroAppDemo />
      </Suspense>
    ),
    errorElement: <ErrorPage />
  }
]
