<template>
  <div ref="graphRef" :style="{ width: getValidSize(width), height: getValidSize(height) }"></div>
</template>

<script setup lang="ts">
  import { Graph, Shape } from '@antv/x6'
  import { isString } from '@tingcode/utils'

  defineOptions({
    name: 'Flow'
  })

  const props = withDefaults(
    defineProps<{
      width?: number | string
      height?: number | string
      configJson: string
    }>(),
    {
      width: '100%',
      height: '600px'
    }
  )

  const graphRef = ref<HTMLDivElement | null>(null)

  const getValidSize = (size: number | string | undefined) => {
    if (isString(size) && size.endsWith('%')) return size
    return `${`${size}`.replace('px', '')}px`
  }

  onMounted(() => {
    if (graphRef.value) {
      const graph = new Graph({
        container: graphRef.value!,
        grid: true,
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

      const config = JSON.parse(props.configJson)
      graph.fromJSON(config)
      graph.centerContent()
    }
  })
</script>
