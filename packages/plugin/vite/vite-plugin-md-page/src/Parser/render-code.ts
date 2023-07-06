import MagicString from 'magic-string'
import type { Parser } from './index'

export const renderCode = async (code?: string, md?: Parser) => {
  if (!code || !md) return { code, docs: [] }
  const PAT = new RegExp(`<${md.blockName}.*?>[\\s\\S]*?<\\/${md.blockName}>`, 'gis')
  const docs = code.match(PAT)
  const s = new MagicString(code)
  const arr: { title?: string; desc?: string; locale?: string }[] = []
  if (docs && docs.length) {
    for (const doc of docs) {
      const PAT2 = new RegExp(`<${md.blockName}.*?>([\\s\\S]*?)<\\/${md.blockName}>`, 'gis')
      const PAT3 = new RegExp(
        `<${md.blockName}.*?locale=["'](.*?)["'].*?>([\\s\\S]*?)<\\/${md.blockName}>`,
        'gis'
      )
      const res = PAT2.exec(doc)
      const res1 = PAT3.exec(doc)
      let locale = ''
      let content = ''
      if (res1) {
        locale = res1[1] as string
        content = res1[2] as string
      } else if (res) {
        content = res[1] as string
      }
      const { html, env } = md.renderMd(content.trim())
      const title = env?.frontmatter?.title || env?.title || ''
      arr.push({
        locale: locale || undefined,
        title,
        desc: html && html.length > 0 ? encodeURIComponent(html) : undefined
      })

      s.replace(doc, '')
    }
  }
  const result = s.toString().trim()
  return { code: result, docs: arr }
}
