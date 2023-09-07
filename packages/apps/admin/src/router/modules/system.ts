import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../routerBase'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/home',
    component: Layout,
    meta: {
      title: '架构设计',
      icon: 'Setting',
      sort: 1
    },
    children: [
      {
        path: 'home',
        name: 'system_home',
        meta: {
          title: '介绍'
        },
        component: () => import('@/views/pages/system/home/index.docs.vue')
      },
      {
        path: 'markdown',
        name: 'system_markdown',
        meta: {
          title: '🔥文档设计'
        },
        component: () => import('@/views/pages/system/docs/index.docs.vue')
      },
      {
        path: 'micro',
        name: 'system_micro',
        meta: {
          title: '微前端'
        },
        component: () => import('@/views/pages/system/micro/index.docs.vue')
      },
      {
        path: '404',
        name: 'system_404',
        meta: {
          title: '404页面',
          transition: true
        },
        component: () => import('@/views/common/error/404.vue')
      }
    ]
  }
]

export default routes
