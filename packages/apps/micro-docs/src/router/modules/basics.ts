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
    path: '/basics/git',
    name: 'basics_git',
    component: () => import('@/views/basics/git/index.docs.vue')
  },
  {
    path: '/basics/node',
    name: 'basics_node',
    component: () => import('@/views/basics/node/index.docs.vue')
  },
  {
    path: '/basics/docker',
    name: 'basics_docker',
    component: () => import('@/views/basics/docker/index.docs.vue')
  },
  {
    path: '/basics/linux',
    name: 'basics_linux',
    component: () => import('@/views/basics/linux/index.docs.vue')
  },
  {
    path: '/basics/network',
    name: 'basics_network',
    component: () => import('@/views/basics/network/index.docs.vue')
  }
]

export default routes
