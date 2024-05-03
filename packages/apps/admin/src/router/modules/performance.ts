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
    path: '/performance',
    name: 'performance',
    redirect: '/performance/virtual-scroll',
    component: Layout,
    meta: {
      title: '性能优化',
      icon: 'Coin',
      sort: 2
    },
    children: [
      {
        path: 'virtual-scroll',
        name: 'performance_virtual_scroll',
        meta: {
          title: '虚拟列表'
        },
        component: () => import('@/views/pages/performance/virtual-scroll/index.docs.vue')
      }
    ]
  }
]

export default routes
