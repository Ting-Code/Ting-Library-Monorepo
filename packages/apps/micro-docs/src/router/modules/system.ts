import { RouteRecordRaw } from 'vue-router'

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
    path: '/system/home',
    name: 'system_home',
    component: () => import('@/views/system/home/index.docs.vue')
  },
  {
    path: '/system/engineering',
    name: 'system_engineering',
    component: () => import('@/views/system/engineering/index.docs.vue')
  },
  {
    path: '/system/markdown',
    name: 'system_markdown',
    component: () => import('@/views/system/docs/index.docs.vue')
  },
  {
    path: '/system/micro',
    name: 'system_micro',
    component: () => import('@/views/system/micro/index.docs.vue')
  },
  {
    path: '/system/css',
    name: 'system_css',
    component: () => import('@/views/system/css/index.docs.vue')
  },
  {
    path: '/system/auto-publish',
    name: 'system_auto_publish',
    component: () => import('@/views/system/auto-publish/index.docs.vue')
  },
  {
    path: '/system/404',
    name: 'system_404',
    meta: {
      transition: true
    },
    component: () => import('@/views/common/error/404.vue')
  }
]

export default routes
