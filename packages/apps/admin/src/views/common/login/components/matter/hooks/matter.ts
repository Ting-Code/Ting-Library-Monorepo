import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } from 'matter-js'

export function initMatter(element: HTMLElement) {
  const engine = Engine.create()
  const render = Render.create({
    element: element,
    engine: engine,
    options: {
      width: element.clientWidth,
      height: element.clientHeight,
      wireframes: false
    }
  })

  const ball = Bodies.circle(400, 200, 20, {
    restitution: 0.9,
    render: { fillStyle: 'blue' }
  })
  const ballB = Bodies.circle(450, 50, 40, { restitution: 0.8 })

  // 创建地面
  const ground = Bodies.rectangle(400, 580, 810, 60, { isStatic: true })

  Composite.add(engine.world, [ball, ground, ballB])

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
