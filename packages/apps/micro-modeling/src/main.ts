import './style.css'
import { adaptMobileDOM } from 'kokomi.js'
import Experience from './Experience/Experience'

window.mount = () => {
  document.querySelector<HTMLDivElement>('#modeling')!.innerHTML = `
<div id="sketch"></div>
<div class="loader-screen">
    <div class="loading-container">
        <div class="loading">
            <span style="--i: 0">L</span>
            <span style="--i: 1">O</span>
            <span style="--i: 2">A</span>
            <span style="--i: 3">D</span>
            <span style="--i: 4">I</span>
            <span style="--i: 5">N</span>
            <span style="--i: 6">G</span>
        </div>
    </div>
</div>
`

  const app = document.querySelector('#modeling')! as HTMLElement

  adaptMobileDOM(app)
  window.addEventListener('resize', () => {
    adaptMobileDOM(app)
  })

  new Experience('#sketch')
}

window.unmount = () => {}

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
  const modelingElement = document.getElementById('modeling')
  if (modelingElement) {
    modelingElement.style.position = 'absolute'
  }
} else {
  const modelingElement = document.getElementById('modeling')
  if (modelingElement) {
    modelingElement.style.width = '100% !important'
    modelingElement.style.height = '100% !important'
  }
}
