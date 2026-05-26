import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/list',
    name: 'i18n_list',
    component: () => import('@/views/list/index.vue'),
    meta: { title: '文案编辑' }
  },
  {
    path: '/list/:namespace',
    name: 'i18n_list_detail',
    component: () => import('@/views/detail/index.vue'),
    meta: { title: '文案编辑详情' }
  }
]

export default routes
