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
        icon: 'Box',
        module: 'docs'
      },
      // component: 'LAYOUT',
      path: '/docs/system',
      children: [
        {
          name: 'system_home',
          path: '/docs/system/home',
          meta: {
            title: '📖Ting Library 介绍',
            module: 'docs'
          },
          auth: ['ting'] // 非必填 按钮级别权限
        },
        {
          name: 'system_engineering',
          path: '/docs/system/engineering',
          meta: {
            title: '🛠️工程化设计',
            module: 'docs'
          }
        },
        {
          name: 'system_markdown',
          path: '/docs/system/markdown',
          meta: {
            title: '📝文档的设计',
            module: 'docs'
          }
        },
        {
          name: 'system_micro',
          path: '/docs/system/micro',
          meta: {
            title: '🧩微前端',
            module: 'docs'
          }
        },
        {
          name: 'system_css',
          path: '/docs/system/css',
          meta: {
            title: '🎨CSS架构设计',
            module: 'docs'
          }
        },
        {
          name: 'system_auto_publish',
          path: '/docs/system/auto-publish',
          meta: {
            title: '🚀CI/CD',
            module: 'docs'
          }
        },
        {
          name: 'system_404',
          path: '/docs/system/404',
          meta: {
            title: '❗404页面',
            transition: true
          }
        }
      ]
    },
    {
      name: 'basics',
      meta: {
        title: '基础知识',
        icon: 'MessageBox',
        module: 'docs'
      },
      path: '/docs/basics',
      children: [
        {
          name: 'basics_git',
          path: '/docs/basics/git',
          meta: {
            title: '📋Git基础',
            module: 'docs'
          }
        },
        {
          name: 'basics_node',
          path: '/docs/basics/node',
          meta: {
            title: '📋Nodejs基础',
            module: 'docs'
          }
        },
        {
          name: 'basics_docker',
          path: '/docs/basics/docker',
          meta: {
            title: '📋Docker基础',
            module: 'docs'
          }
        },
        {
          name: 'basics_linux',
          path: '/docs/basics/linux',
          meta: {
            title: '📋Linux基础',
            module: 'docs'
          }
        },
        {
          name: 'basics_network',
          path: '/docs/basics/network',
          meta: {
            title: '📋计算机网络基础',
            module: 'docs'
          }
        }
      ]
    },
    {
      name: 'performance',
      meta: {
        title: '性能优化',
        icon: 'Coin',
        module: 'docs'
      },
      // component: 'LAYOUT',
      path: '/docs/performance',
      children: [
        {
          name: 'performance_optimization',
          path: '/docs/performance/optimization',
          meta: {
            title: '⚡性能优化综述',
            module: 'docs'
          }
        },
        {
          name: 'performance_virtual_scroll',
          path: '/docs/performance/virtual-scroll',
          meta: {
            title: '📜虚拟列表',
            module: 'docs'
          }
        }
      ]
    },
    {
      name: 'repackage',
      meta: {
        title: '方案与封装',
        icon: 'Brush',
        module: 'docs'
      },
      // component: 'LAYOUT',
      path: '/docs/repackage',
      children: [
        {
          name: 'repackage_components',
          path: '/docs/repackage/components',
          meta: {
            title: '🛠️二次封装组件',
            module: 'docs'
          }
        },
        {
          name: 'repackage_low_code',
          path: '/docs/repackage/low-code',
          meta: {
            title: '🧱低代码',
            module: 'docs'
          }
        }
      ]
    },
    {
      name: 'vitual',
      meta: {
        title: '可视化',
        icon: 'Picture',
        module: 'docs'
      },
      path: '/docs/vitual',
      children: [
        {
          name: 'visual_flow',
          path: '/docs/visual/flow',
          meta: {
            title: '🗺️流程图',
            module: 'docs'
          }
        },
        {
          name: 'visual_heatmap',
          path: '/nexus',
          meta: {
            title: '🌡️热力图',
            module: 'nexus'
          }
        },
        {
          name: 'visual_chart',
          path: '/docs/visual/chart',
          meta: {
            title: '📊数据图表',
            module: 'docs'
          }
        },
        {
          name: 'visual_animation',
          path: '/docs/visual/animation',
          meta: {
            title: '🎞️动画',
            module: 'docs'
          }
        },
        {
          name: 'visual_matter',
          path: '/docs/visual/matter',
          meta: {
            title: '🎮2D物理引擎'
          }
        },
        {
          name: 'visual_modeling',
          path: '/modeling',
          meta: {
            title: '🗿3D模型',
            module: 'modeling'
          }
        }
      ]
    }
  ]
}

export default [
  {
    url: '/fake-api/login',
    timeout: 1,
    method: 'post',
    response: () => {
      return resultSuccess({ token })
    }
  },
  {
    url: '/fake-api/admin_info',
    timeout: 1,
    method: 'get',
    response: () => {
      return resultSuccess(menu)
    }
  }
]
