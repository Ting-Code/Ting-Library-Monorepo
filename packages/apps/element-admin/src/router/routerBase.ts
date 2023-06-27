import type { AppRouteRecordRaw } from '@/router/type'
import { PageEnum } from '@/router/type'
export const RedirectName = 'Redirect'
export const ErrorPage = () => import('@/views/common/error/404.vue')
export const Layout = () => import('@/components/layouts/default/index.vue')
export const ParentLayout = () => import('@/components/layouts/parentLayout/index.vue')

export const publicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: 'Root'
    }
  }
]

// 404 on a page
export const ErrorPageRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true
      }
    }
  ]
}
