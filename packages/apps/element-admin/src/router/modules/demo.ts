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
    path: '/demo',
    name: 'Demo',
    redirect: '/demo/home',
    component: Layout,
    meta: {
      title: '系统设置',
      icon: 'Setting',
      sort: 1
    },
    children: [
      {
        path: 'home',
        name: 'demo_home',
        meta: {
          title: '菜单权限管理'
        },
        component: () => import('@/views/common/login/index.vue')
      },
      {
        path: 'page',
        name: 'demo_page',
        meta: {
          title: '测试'
        },
        component: () => import('@/views/common/login/index.vue')
      }
    ]
  }
]

export default routes
