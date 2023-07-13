import { compileTemplate } from '@vue/compiler-sfc'
import { transform, getBaseTransformPreset } from '@vue/compiler-core'
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

const transformFile = (code, id) => {
  let newCode = code
  console.log('----------------------------------baseParse -----------------------------------', id)
  const ast = compileTemplate({ source: code, id: id, filename: id }).ast as any

  const [nodeTransforms] = getBaseTransformPreset(true)
  transform(ast, {
    prefixIdentifiers: true,
    nodeTransforms: [
      ...nodeTransforms,
      (node) => {
        // @ts-ignore
        if (node!.tag === 'CodeBlock') {
          if ('props' in node) {
            node?.props?.forEach((prop) => {
              if (prop.name === 'src') {
                // 使用cheerio加载HTML字符串
                const root = parse(node.loc.source)
                const codeBlockElement = root.firstChild as unknown as HTMLElement
                const src = codeBlockElement.getAttribute('src')
                // const CodeBlockElement = root.querySelector('CodeBlock')
                console.log(src, '==============src============', node.loc.source)
                if (src) {
                  codeBlockElement.setAttribute('src', "'asasdadasdasdsdaasd'")
                }
                // 获取修改后的HTML字符串
                const CodeBlockElementString = root.toString()
                console.log(
                  '==========================$=========================',
                  CodeBlockElementString,
                  '==========================$========================='
                )

                newCode = newCode.replace(node.loc.source, CodeBlockElementString)
              }
            })
          }
        }
      }
    ]
  })
  console.log(' =============================', newCode, '=============================')
  return newCode
}

export { transformDemo, transformFile }
