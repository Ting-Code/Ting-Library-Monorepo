import { RouteRecordRaw } from 'vue-router'
import { Layout, ParentLayout } from '../routerBase'
const Login = () => import('@/views/common/login/index.vue')

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
        component: Login
      },
      {
        path: 'page',
        name: 'demo_page',
        meta: {
          title: '测试'
        },
        component: Login
      },
      {
        path: 'account',
        name: 'AccountPage',
        component: ParentLayout,
        redirect: '/page-demo/account/setting',
        meta: {
          title: 'account'
        },
        children: [
          {
            path: 'center',
            name: 'AccountCenterPage',
            component: Login,
            meta: {
              title: 'center'
            }
          },
          {
            path: 'setting',
            name: 'AccountSettingPage',
            component: Login,
            meta: {
              title: 'setting'
            }
          }
        ]
      }
    ]
  }
]

export default routes
