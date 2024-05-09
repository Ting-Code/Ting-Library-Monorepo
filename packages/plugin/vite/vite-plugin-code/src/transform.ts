import { compileTemplate } from '@vue/compiler-sfc'
import { transform } from '@vue/compiler-core'
import { parse } from 'node-html-parser'
import { resolve, basename } from 'path'
import * as fs from 'fs'
import type MD from 'markdown-it'
const ROOTNAME = resolve(process.cwd(), '../../../')
const transformDemo = (code: string, id: string): string => {
  const newId = resolve(id).replace(ROOTNAME, '').replace(/\\/g, '/')
  const core = `const __getSoundCode = () => {
             return \`${encodeURIComponent(code)}\`
          }
          const __getSoundPath = () => {
             return \`${newId}\`
          }`

  if (code && !code.includes('</script>')) {
    return code
      .replace(
        '</template>',
        `</template>
        <script setup lang="ts">
          ${core}
          defineExpose({ __getSoundCode, __getSoundPath })
        </script>`
      )
      .trim()
  }
  if (code && code.includes('defineExpose')) {
    return code
      .replace(
        `defineExpose({`,
        `${core}
      defineExpose({__getSoundPath, __getSoundCode,`
      )
      .trim()
  }
  return code
    .replace(
      `</script>`,
      `${core}  
        defineExpose({ __getSoundCode, __getSoundPath })</script>`
    )
    .trim()
}

const transformFile = (code: string, id: string, md: MD): string => {
  let newCode: string = code
  const ast = compileTemplate({ source: code, id: id, filename: id }).ast

  if (!ast) return newCode

  transform(ast, {
    prefixIdentifiers: true,
    nodeTransforms: [
      (node) => {
        if (!('tag' in node && node.tag)) return
        // CodeBlock 注入code 和src
        if (['CodeBlock', 'code-block'].includes(node.tag)) {
          if (!('props' in node)) return
          node?.props?.forEach((prop) => {
            if (!(prop.name === 'src')) return
            const root = parse(node.loc.source)
            const codeBlockElement = root.firstChild as unknown as HTMLElement
            const src = codeBlockElement.getAttribute('src')
            if (!src) return
            let fileDir: string
            if (src.includes('@root')) {
              fileDir = resolve(ROOTNAME, src.replace('@root/', ''))
            } else {
              fileDir = resolve(id.replace(basename(id), ''), src)
            }
            try {
              const file = fs.readFileSync(fileDir, 'utf8')
              codeBlockElement.setAttribute('code', encodeURIComponent(file))
            } catch (error) {
              console.error('CodeBlock src 路径错误', error)
            }
            codeBlockElement.setAttribute('src', fileDir.replace(ROOTNAME, '').replace(/\\/g, '/'))
            // 获取修改后的HTML字符串
            const CodeBlockElementString = root.toString()
            newCode = newCode.replace(node.loc.source, CodeBlockElementString)
          })
        }
        // 转化 md
        if (['md', 'markdown', 'MD', 'Markdown'].includes(node.tag)) {
          console.log()
          const root = parse(node.loc.source, { lowerCaseTagName: true })
          const preElement = root.querySelector('pre') as unknown as HTMLElement
          const outerHTML = preElement.innerHTML
          if (!outerHTML) return
          const mdElementString = `<${node.tag}>${md.render(
            outerHTML?.toString()?.trim()
          )}</${node.tag}>`
          // 获取修改后的HTML字符串
          newCode = newCode.replace(node.loc.source, mdElementString)
        }
      }
    ]
  })

  return newCode
}

export { transformDemo, transformFile }
