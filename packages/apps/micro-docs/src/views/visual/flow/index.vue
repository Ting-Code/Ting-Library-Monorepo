<template>
  <div :class="ns.b()">
    <div :class="ns.e('head')">
      <template v-if="isMobile">
        <ReButton v-show="!isShowStencil" @click="isShowStencil = true" :icon="DArrowRight" />
        <ReButton v-show="isShowStencil" @click="isShowStencil = false" :icon="DArrowLeft" />
      </template>
      <ReButton @click="generateConfig(graph)" :icon="Share" />
      <ReButton @click="undo(graph)" :icon="CaretLeft" />
      <ReButton @click="redo(graph)" :icon="CaretRight" />
      <ReButton @click="removeCells(graph)" :icon="Delete" />
      <ReButton @click="zoomIn(graph)" :icon="ZoomIn" />
      <ReButton @click="zoomOut(graph)" :icon="ZoomOut" />
    </div>
    <div :class="ns.e('main')">
      <div ref="stencilRef" :class="ns.em('main', 'stencil-box')" v-show="isShowStencil"></div>
      <div ref="graphRef" :class="ns.em('main', 'graph-box')"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { ReButton } from '@tingcode/lib-vue'
  import { useNamespace, getGlobalDataElement } from '@tingcode/system'
  import { useAppProviderContext } from '@/application/useAppContext'
  import {
    Delete,
    ZoomIn,
    ZoomOut,
    CaretLeft,
    CaretRight,
    Share,
    DArrowRight,
    DArrowLeft
  } from '@element-plus/icons-vue'
  import { Graph, Shape } from '@antv/x6'
  import { Stencil } from '@antv/x6-plugin-stencil'
  import { Transform } from '@antv/x6-plugin-transform'
  import { Selection } from '@antv/x6-plugin-selection'
  import { Snapline } from '@antv/x6-plugin-snapline'
  import { Keyboard } from '@antv/x6-plugin-keyboard'
  import { Clipboard } from '@antv/x6-plugin-clipboard'
  import { History } from '@antv/x6-plugin-history'

  const { isMobile } = toRefs(useAppProviderContext())
  const ns = useNamespace('visual-flow')
  const stencilRef = ref<HTMLDivElement | null>(null)
  const graphRef = ref<HTMLDivElement | null>(null)
  const isShowStencil = ref(true)
  let graph: null | Graph = null
  watch(
    isMobile,
    (val) => {
      if (val) {
        isShowStencil.value = false
      } else {
        isShowStencil.value = true
      }
    },
    { immediate: true }
  )

  const generateConfig = async (graph) => {
    document.body.focus()
    const config = graph!.toJSON()
    const configJson = JSON.stringify(config, null, 2)
    try {
      const input = document.createElement('input')
      input.value = configJson
      document.body.appendChild(input)
      input.select() // 选择实例内容
      document.execCommand('Copy') // 执行复制
      document.body.removeChild(input)
      const El = getGlobalDataElement()
      El.ElMessage({
        message: '复制到剪贴板成功',
        type: 'success'
      })
    } catch (error) {
      console.error('复制到剪贴板失败:', error)
    }
  }
  const undo = (graph) => {
    if (graph!.canUndo()) {
      graph!.undo()
    }
    return false
  }
  const redo = (graph) => {
    if (graph!.canRedo()) {
      graph!.redo()
    }
    return false
  }
  const removeCells = (graph) => {
    const cells = graph!.getSelectedCells()
    if (cells.length) {
      graph!.removeCells(cells)
    }
  }
  const zoomIn = (graph) => {
    const zoom = graph!.zoom()
    if (zoom < 1.5) {
      graph!.zoom(0.1)
    }
  }
  const zoomOut = (graph) => {
    const zoom = graph!.zoom()
    if (zoom > 0.5) {
      graph!.zoom(-0.1)
    }
  }

  onMounted(() => {
    graph = new Graph({
      container: graphRef.value!,
      grid: true,
      background: {
        color: '#ffffff'
      },
      panning: true,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3
      },
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8
          }
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8
                }
              }
            },
            zIndex: 0
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        }
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF'
            }
          }
        }
      }
    })

    graph
      .use(
        new Transform({
          resizing: true,
          rotating: true
        })
      )
      .use(
        new Selection({
          rubberband: true,
          showNodeSelectionBox: true
        })
      )
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History())

    // #region 初始化 stencil
    const stencil = new Stencil({
      title: '流程图',
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      collapsable: true,
      groups: [
        {
          title: '基础流程图',
          name: 'group1'
        },
        {
          title: '系统设计图',
          name: 'group2',
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70
          }
        }
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55
      }
    })
    stencilRef.value!.appendChild(stencil.container)

    graph!.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph!.getSelectedCells()
      if (cells.length) {
        graph!.copy(cells)
      }
      return false
    })
    graph!.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph!.getSelectedCells()
      if (cells.length) {
        graph!.cut(cells)
      }
      return false
    })
    graph!.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph!.isClipboardEmpty()) {
        const cells = graph!.paste({ offset: 32 })
        graph!.cleanSelection()
        graph!.select(cells)
      }
      return false
    })
    // undo redo
    graph!.bindKey(['meta+z', 'ctrl+z'], () => undo(graph))
    graph!.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => redo(graph))
    // select all
    graph!.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph!.getNodes()
      if (nodes) {
        graph!.select(nodes)
      }
    })
    // delete
    graph!.bindKey('backspace', () => removeCells(graph))
    // zoom
    graph!.bindKey(['ctrl+1', 'meta+1'], () => zoomIn(graph))
    graph!.bindKey(['ctrl+2', 'meta+2'], () => zoomOut(graph))
    // 控制连接桩显示/隐藏
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
      for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    }
    graph!.on('node:mouseenter', () => {
      const container = graphRef.value!
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
      showPorts(ports, true)
    })
    graph!.on('node:mouseleave', () => {
      const container = graphRef.value!
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
      showPorts(ports, false)
    })
    // 为节点添加编辑功能
    graph!.on('node:click', ({ cell }) => {
      const label = cell.attr('label/text')
      const newLabel = prompt('请输入新的文本', label as string)
      if (newLabel !== null) {
        cell.attr('label/text', newLabel)
      }
    })
    // #endregion
    const r1 = graph!.createNode({
      shape: 'custom-rect',
      label: '开始',
      attrs: {
        body: {
          rx: 20,
          ry: 26
        }
      }
    })
    const r2 = graph!.createNode({
      shape: 'custom-rect',
      label: '过程'
    })
    const r3 = graph!.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6
        }
      },
      label: '可选过程'
    })
    const r4 = graph!.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20'
        }
      },
      label: '决策'
    })
    const r5 = graph!.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20'
        }
      },
      label: '数据'
    })
    const r6 = graph!.createNode({
      shape: 'custom-circle',
      label: '连接'
    })
    stencil.load([r1, r2, r3, r4, r5, r6], 'group1')
    const imageShapes = [
      {
        label: 'Client',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg'
      },
      {
        label: 'Http',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg'
      },
      {
        label: 'Api',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg'
      },
      {
        label: 'Sql',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg'
      },
      {
        label: 'Clound',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg'
      },
      {
        label: 'Mq',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg'
      }
    ]
    const imageNodes = imageShapes.map((item) =>
      graph!.createNode({
        shape: 'custom-image',
        label: item.label,
        attrs: {
          image: {
            'xlink:href': item.image
          }
        }
      })
    )
    stencil.load(imageNodes, 'group2')
  })
</script>

<style lang="scss" scoped>
  @include b(visual-flow) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include e(head) {
      padding: 6px 12px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }
    @include e(main) {
      position: relative;
      flex: 1;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      @include m(stencil-box) {
        width: 180px;
        height: 100%;
      }
      @include m(graph-box) {
        flex: 1;
        height: 100%;
      }
    }
  }
</style>
