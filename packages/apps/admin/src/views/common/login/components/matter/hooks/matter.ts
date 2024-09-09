import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } from 'matter-js'

export function initMatter(element: HTMLElement) {
  const boxWidth = element.clientWidth
  const boxHeight = element.clientHeight
  console.log(boxWidth, boxHeight)
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

  const ball = Bodies.circle(400, 200, 20, {
    restitution: 1.2,
    render: { fillStyle: 'blue' }
  })
  const ballB = Bodies.circle(450, 50, 40, {
    restitution: 1.2
  })

  // 创建上下左右四面墙
  const groundTop = Bodies.rectangle(0, 0, boxWidth * 2, 10, { isStatic: true })
  const groundBottom = Bodies.rectangle(0, boxHeight, boxWidth * 2, 10, { isStatic: true })
  const groundLeft = Bodies.rectangle(0, 0, 10, boxHeight * 2, { isStatic: true })
  const groundRight = Bodies.rectangle(boxWidth, 0, 10, boxHeight * 2, { isStatic: true })

  Composite.add(engine.world, [ball, ballB, groundTop, groundBottom, groundLeft, groundRight])

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

  // 确保鼠标在渲染器中正常工作
  render.mouse = mouse

  Runner.run(engine)
  Render.run(render)
  // 创建运行器
  const runner = Runner.create()
  Runner.run(runner, engine)
}
