import { Graph } from '@antv/x6'

// 定义通用的端口配置
const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  },
  items: [
    {
      group: 'top'
    },
    {
      group: 'right'
    },
    {
      group: 'bottom'
    },
    {
      group: 'left'
    }
  ]
}
/**
 * @description: 注册节点
 */
export function graphRegisterNodes() {
  // 自定义矩形节点
  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      width: 66,
      height: 36,
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'text',
          selector: 'label'
        }
      ],
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF'
        },
        label: {
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          fontSize: 12,
          fill: '#262626',
          contentEditable: true
        }
      },
      ports: { ...ports }
    },
    true
  )
  // 自定义多边形节点
  Graph.registerNode(
    'custom-polygon',
    {
      inherit: 'polygon',
      width: 66,
      height: 36,
      markup: [
        {
          tagName: 'polygon',
          selector: 'body'
        },
        {
          tagName: 'text',
          selector: 'label'
        }
      ],
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF'
        },
        label: {
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          fontSize: 12,
          fill: '#262626',
          contentEditable: true
        }
      },
      ports: {
        ...ports,
        items: [
          {
            group: 'top'
          },
          {
            group: 'bottom'
          }
        ]
      }
    },
    true
  )
  // 自定义圆形节点
  Graph.registerNode(
    'custom-circle',
    {
      inherit: 'circle',
      width: 45,
      height: 45,
      markup: [
        {
          tagName: 'circle',
          selector: 'body'
        },
        {
          tagName: 'text',
          selector: 'label'
        }
      ],
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF'
        },
        label: {
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          fontSize: 12,
          fill: '#262626',
          contentEditable: true
        }
      },
      ports: { ...ports }
    },
    true
  )
  // 自定义图片节点
  Graph.registerNode(
    'custom-image',
    {
      inherit: 'rect',
      width: 52,
      height: 52,
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'image'
        },
        {
          tagName: 'text',
          selector: 'label'
        }
      ],
      attrs: {
        body: {
          stroke: '#5F95FF',
          fill: '#5F95FF'
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 12,
          fill: '#fff',
          contentEditable: true
        }
      },
      ports: { ...ports }
    },
    true
  )
}
