import { Navigate, RouteObject, Link } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { ErrorPage } from '@/views/common/error'
import { microRouters } from './modules/micro'
import React from 'react'

export const routers: RouteObject[] = [
  ...microRouters,
  {
    path: '/',
    element: <Navigate to="/layout/home" />,
    errorElement: <ErrorPage />
  },
  {
    path: '/layout',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'home', element: <Link to="/microAppDemo">跳转到路径</Link> },
      { path: 'open', element: <div>Hello open!</div> },
      { index: true, element: <Navigate to="/layout/home" /> }
    ]
  }
]
