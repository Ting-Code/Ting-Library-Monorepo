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
    path: '/performance/optimization',
    name: 'performance_optimization',
    component: () => import('@/views/performance/optimization/index.docs.vue')
  },
  {
    path: '/performance/virtual-scroll',
    name: 'performance_virtual_scroll',
    component: () => import('@/views/performance/virtual-scroll/index.docs.vue')
  }
]

export default routes
