import { compileTemplate } from '@vue/compiler-sfc'
import { transform } from '@vue/compiler-core'
import { parse } from 'node-html-parser'
import { resolve, basename } from 'path'
import * as fs from 'fs'
const ROOTNAME = 'ting-library-monorepo'
const transformDemo = (code, id) => {
  let newCode
  const newId = id.split(ROOTNAME)[1]
  if (code && code.includes('defineExpose')) {
    newCode = code
      .replace(
        `defineExpose({`,
        `
          const __getSoundCode = () => {
             return ${encodeURIComponent(code)}
          }
          const __getSoundPath = () => {
             return ${newId}
          }
          defineExpose({__getSoundPath, __getSoundCode,`
      )
      .trim()
  } else if (code) {
    newCode = code
      .replace(
        `</script>`,
        `const __getSoundCode = () => {
             return \`${encodeURIComponent(code)}\`
          }
          const __getSoundPath = () => {
             return \`${newId}\`
          }
          
         defineExpose({ __getSoundCode, __getSoundPath })
         </script>`
      )
      .trim()
  }
  return newCode
}

const transformFile = (code, id, md) => {
  let newCode = code
  const ast = compileTemplate({ source: code, id: id, filename: id }).ast as any

  transform(ast, {
    prefixIdentifiers: true,
    nodeTransforms: [
      (node) => {
        // 注入code 和src
        // @ts-ignore
        if (['CodeBlock', 'code-block'].includes(node!.tag)) {
          if ('props' in node) {
            node?.props?.forEach((prop) => {
              if (prop.name === 'src') {
                const root = parse(node.loc.source)
                const codeBlockElement = root.firstChild as unknown as HTMLElement
                const src = codeBlockElement.getAttribute('src')
                if (src) {
                  let fileDir: string
                  if (src.includes('@root')) {
                    const rootDir = id.split(ROOTNAME)[0]
                    fileDir = resolve(rootDir, ROOTNAME, src.replace('@root/', ''))
                  } else {
                    fileDir = resolve(id.replace(basename(id), ''), src)
                  }
                  try {
                    const file = fs.readFileSync(fileDir, 'utf8')
                    codeBlockElement.setAttribute('code', encodeURIComponent(file))
                  } catch (error) {
                    console.error('CodeBlock src 路径错误', error)
                  }
                  codeBlockElement.setAttribute(
                    'src',
                    fileDir.split(ROOTNAME)[1].replace(/\\/g, '/')
                  )
                  // 获取修改后的HTML字符串
                  const CodeBlockElementString = root.toString()
                  newCode = newCode.replace(node.loc.source, CodeBlockElementString)
                }
              }
            })
          }
        }
        // 转化 md
        // @ts-ignore
        if (['md', 'markdown', 'MD', 'Markdown'].includes(node!.tag)) {
          const root = parse(node.loc.source, { lowerCaseTagName: true })
          const mdElement = root.firstChild as unknown as HTMLElement
          const preElement = root.querySelector('pre') as unknown as HTMLElement
          const outerHTML = preElement.innerHTML
          if (outerHTML) {
            const mdElementString = `<${mdElement.tagName}>${md.render(
              outerHTML.toString().trim()
            )}</${mdElement.tagName}>`
            // 获取修改后的HTML字符串
            newCode = newCode.replace(node.loc.source, mdElementString)
          }
        }
      }
    ]
  })
  return newCode
}

export { transformDemo, transformFile }
