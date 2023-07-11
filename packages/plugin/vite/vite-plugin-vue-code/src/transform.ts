const transform = (code) => {
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

export default transform
