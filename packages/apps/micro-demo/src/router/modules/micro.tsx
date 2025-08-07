import type { NonIndexRouteObject } from 'react-router-dom'
import { ErrorPage } from '@/views/common/error'
import React, { lazy, Suspense } from 'react'
const MicroAppDemo = lazy(() => import('@/views/micro/micro-app-demo/index'))
const ProjectIntro = lazy(() => import('@/views/micro/project-intro/index'))

interface RouteObject extends NonIndexRouteObject {
  meta?: {
    title?: string
    description?: string
    [key: string]: any
  }
}

export const microRouters: RouteObject[] = [
  {
    path: '/microAppDemo',
    element: (
      <Suspense>
        <MicroAppDemo />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    meta: {
      title: '微应用演示',
      description: '微应用演示页面，展示如何加载和使用微应用'
    }
  },
  {
    path: '/projectIntro',
    element: (
      <Suspense>
        <ProjectIntro />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    meta: {
      title: '项目功能介绍',
      description: '项目功能介绍页面，展示当前项目所有已实现的功能'
    }
  }
]
