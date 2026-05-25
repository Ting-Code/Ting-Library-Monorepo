import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

/** 开发占位：页面 UI 按 design/*.pen 实现后再替换为真实组件 */
function penPlaceholder(penFile: string, title: string): Component {
  return {
    template: `<div style="min-height:100%;padding:24px;background:#303133;color:#e5eaf3;box-sizing:border-box">
      <p style="margin:0 0 8px;font-size:18px;font-weight:600">${title}</p>
      <p style="margin:0;font-size:13px;color:#a3a6ad">UI 待实现 · 设计稿 <code style="color:#409eff">design/${penFile}</code></p>
    </div>`
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/list',
    name: 'i18n_list',
    component: penPlaceholder('list.pen', '✏️ 文案编辑 · 项目列表'),
    meta: { title: '文案编辑' }
  },
  {
    path: '/list/:namespace',
    name: 'i18n_list_detail',
    component: penPlaceholder('detail.pen', '项目详情'),
    meta: { title: '文案编辑详情' }
  }
]

export default routes
