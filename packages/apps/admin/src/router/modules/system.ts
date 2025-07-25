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
  // {
  //   path: '/system/home',
  //   name: 'system_home',
  //   component: () => import('@/views/pages/system/home/index.docs.vue')
  // },
  // {
  //   path: '/system/markdown',
  //   name: 'system_markdown',
  //   component: () => import('@/views/pages/system/docs/index.docs.vue')
  // },
  // {
  //   path: '/system/micro',
  //   name: 'system_micro',
  //   component: () => import('@/views/pages/system/micro/index.docs.vue')
  // },
  {
    path: '/system/404',
    name: 'system_404',
    meta: {
      transition: true
    },
    component: () => import('@/views/common/error/404.vue')
  },
  {
    path: '/visual/matter',
    name: 'visual_matter',
    meta: {
      transition: true
    },
    component: () => import('@/views/common/matter/index.vue')
  }
]

export default routes
