module.exports = {
  printWidth: 100, // 默认80 超过多少字符强制换行
  tabWidth: 2, // 使用1个空格缩进
  useTabs: false, // 不使用缩进符,而使用空格
  semi: false, // 未尾逗号, default: true 代码结尾是否加分号
  singleQuote: true, // 单引号 default: false // 是否使用单引号
  // quoteProps: 'as-needed', 对象的key仅在必要时用引号
  // jsxSingleQuote: false, // jsx不使用单引号,而使用双引号
  trailingComma: 'none', // 未尾分号 default: es5    all | none | es5
  // bracketSpacing: true, // 对象大括号内两边是否加空格 { a:0 }
  // bracketSameLine: false,
  //rangeStart: 0,   // 每个文件格式化的范围是文件的全部内容
  //rangeEnd: Infinity,        // 结尾
  // jsxBracketSameLine: false, // jsx标签的反尖括号需要换行
  arrowParens: 'always', // default: always  avoid单个参数的箭头函数不加括号 x => x
  // insertPragma: false, // 不需要自动在文件开头插入 @prettier
  // requirePragma: false, // 不需要写文件开头的 @prettier
  proseWrap: 'never', // preserve默认的折行标准
  htmlWhitespaceSensitivity: 'strict', //  (css| strict )根据显示样式决定html要不要折行
  vueIndentScriptAndStyle: true, // .vue 缩进
  endOfLine: 'auto' // default lf 文件换行格式 LF/CRLF
}
