import { Navigate, RouteObject } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { ErrorPage } from '@/views/common/error'
import React from 'react'

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'home', element: <div>Hello name!</div> },
      { path: 'open', element: <div>Hello open!</div> },
      { index: true, element: <Navigate to="/home" /> }
    ]
  }
]
