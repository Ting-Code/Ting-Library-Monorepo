import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } from 'matter-js'
import { getRandomNumber } from '@tingcode/utils'
import vueSvg from '@/assets/svg/logo/vue.svg'
import elementuiSvg from '@/assets/svg/logo/elementui.svg'
import echartsSvg from '@/assets/svg/logo/echarts.svg'
import microappSvg from '@/assets/svg/logo/microapp.svg'
import nextjsSvg from '@/assets/svg/logo/nextjs.svg'
import piniaSvg from '@/assets/svg/logo/pinia.svg'
import pnpmSvg from '@/assets/svg/logo/pnpm.svg'
import rspackSvg from '@/assets/svg/logo/rspack.svg'
import unocssSvg from '@/assets/svg/logo/unocss.svg'
import reactSvg from '@/assets/svg/logo/react.svg'
import typescriptSvg from '@/assets/svg/logo/typescript.svg'

export function initMatter(element: HTMLElement) {
  const boxWidth = element.clientWidth
  const boxHeight = element.clientHeight
  const engine = Engine.create()
  const render = Render.create({
    element: element,
    engine: engine,
    options: {
      width: boxWidth,
      height: boxHeight,
      wireframes: false
    }
  })

  const getIconBallList = () => {
    return [
      vueSvg,
      elementuiSvg,
      echartsSvg,
      microappSvg,
      nextjsSvg,
      piniaSvg,
      pnpmSvg,
      rspackSvg,
      unocssSvg,
      reactSvg,
      typescriptSvg
    ].map((svg) => {
      const boxWidthScale = boxWidth / (30 * 200)
      const Scale = getRandomNumber(boxWidthScale, boxWidthScale + 0.3, 2)
      return Bodies.circle(
        getRandomNumber(20, boxWidth - 20),
        // getRandomNumber(20, boxHeight - 20),
        -100,
        200 * Scale,
        {
          restitution: getRandomNumber(0.6, 0.8, 1), // 弹力系数
          render: {
            sprite: {
              texture: svg,
              xScale: Scale, // 图片缩放比例
              yScale: Scale
            }
          }
        }
      )
    })
  }

  // 创建上下左右四面墙
  // const groundTop = Bodies.rectangle(0, 0, boxWidth * 2, 3, { isStatic: true })
  const groundBottom = Bodies.rectangle(0, boxHeight, boxWidth * 2, 6, { isStatic: true })
  const groundLeft = Bodies.rectangle(0, 0, 6, boxHeight * 2, { isStatic: true })
  const groundRight = Bodies.rectangle(boxWidth, 0, 6, boxHeight * 2, { isStatic: true })

  Composite.add(engine.world, [groundBottom, groundLeft, groundRight, ...getIconBallList()])

  // 添加鼠标控制
  const mouse = Mouse.create(render.canvas)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  })

  Composite.add(engine.world, mouseConstraint)
  setInterval(() => {
    Composite.add(engine.world, [...getIconBallList()])
  }, 10000)

  // 确保鼠标在渲染器中正常工作
  render.mouse = mouse

  Runner.run(engine)
  Render.run(render)
  // 创建运行器
  const runner = Runner.create()
  Runner.run(runner, engine)
}
