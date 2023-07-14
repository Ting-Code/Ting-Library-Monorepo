import { compileTemplate } from '@vue/compiler-sfc'
import { transform } from '@vue/compiler-core'
import { parse } from 'node-html-parser'
const transformDemo = (code) => {
  let tranCode
  if (code && code.includes('defineExpose')) {
    tranCode = code
      .replace(
        `defineExpose({`,
        `
          const __getSoundCode = () => {
          const code = \`${encodeURIComponent(code)}\`
             return code
          }
          defineExpose({__getSoundCode,`
      )
      .trim()
  } else if (code) {
    tranCode = code
      .replace(
        `</script>`,
        `const __getSoundCode = () => {
             return \`${encodeURIComponent(code)}\`
          };
         defineExpose({ __getSoundCode})
         </script>`
      )
      .trim()
  }
  return tranCode
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
                  codeBlockElement.setAttribute('src', "'asasdadasdasdsdaasd'")
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
          const root = parse(node.loc.source)
          const mdElement = root.firstChild as unknown as HTMLElement
          const outerHTML = mdElement.innerHTML
          console.log(outerHTML)
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
  console.log(111111111, newCode, 11111111111)
  return newCode
}

export { transformDemo, transformFile }
