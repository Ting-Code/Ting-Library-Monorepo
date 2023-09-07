import type { AppRouteRecordRaw } from '@/router/type'
import { PageEnum } from '@/router/type'
export const ErrorPage = () => import('@/views/common/error/404.vue')
export const Layout = () => import('@/components/layouts/default/index.vue')
export const ParentLayout = () => import('@/components/layouts/parentLayout/index.vue')

export const publicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/login/index.vue'),
    meta: {
      title: 'Ting Library'
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

export const RedirectRouter: AppRouteRecordRaw = {
  path: '/redirect',
  component: Layout,
  name: 'redirect',
  meta: {
    title: PageEnum.REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)',
      name: PageEnum.REDIRECT_NAME,
      component: () => import('@/views/common/redirect/index.vue'),
      meta: {
        title: PageEnum.REDIRECT_NAME,
        hideBreadcrumb: true
      }
    }
  ]
}
