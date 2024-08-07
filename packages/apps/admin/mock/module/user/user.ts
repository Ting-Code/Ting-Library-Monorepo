import Mock from 'mockjs'
import { resultSuccess } from '../../util'

const Random = Mock.Random

const token = Random.string('upper', 32, 32)

const menu = {
  menu: [
    {
      name: 'system',
      meta: {
        title: '架构设计',
        icon: 'Box'
      },
      module: 'system',
      children: [
        {
          name: 'system_home',
          path: '/system/home',
          module: 'system',
          meta: {
            title: 'Ting Library 介绍'
          },
          auth: []
        },
        {
          name: 'system_markdown',
          path: '/system/markdown',
          module: 'system',
          meta: {
            title: '🔥文档的设计'
          },
          auth: []
        },
        {
          name: 'system_micro',
          path: '/system/micro',
          module: 'system',
          title: '🔥微前端',
          meta: {
            title: '🔥文档的设计'
          },
          auth: []
        },
        {
          name: 'system_404',
          path: '/system/404',
          module: 'system',
          meta: {
            title: '404页面'
          },
          auth: []
        }
      ]
    },
    {
      name: 'performance',
      meta: {
        title: '性能优化',
        icon: 'Coin'
      },
      module: 'performance',
      children: [
        {
          name: 'performance_virtual_scroll',
          path: '/performance/virtual-scroll',
          module: 'performance',
          meta: {
            title: '虚拟列表'
          },
          auth: []
        }
      ]
    },
    {
      name: 'repackage',
      meta: {
        title: '二次封装',
        icon: 'Brush'
      },
      module: 'repackage',
      children: [
        {
          name: 'repackage_home',
          path: '/repackage/home',
          module: 'repackage',
          meta: {
            title: '🔥Vue二次封装思考'
          },
          auth: []
        }
      ]
    }
  ]
}

export default [
  {
    url: '/fake-api/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess({ token })
    }
  },
  {
    url: '/fake-api/admin_info',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(menu)
    }
  }
]
