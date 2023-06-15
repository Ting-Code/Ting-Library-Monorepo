module.exports = {
  //可选类型
  types: [
    { value: ':sparkles: feat', name: '✨ feat:   新功能' },
    { value: ':bug: fix', name: '🐛 fix:   修复' },
    { value: ':memo: docs', name: '📝 docs:   文档变更' },
    {
      value: ':art: style',
      name: '🎨 style:   代码格式(不影响代码运行的变动)'
    },
    {
      value: ':hammer: refactor',
      name: '🔨 refactor:重构(既不是增加feature)，也不是修复bug'
    },
    { value: ':zap: perf', name: '⚡️ perf:   性能优化' },
    { value: ':mag: test', name: '🔍 test:   增加测试' },
    { value: ':package: chore', name: '📦 chore:   构建过程或辅助功能的变动' },
    { value: ':rocket: build', name: '🚀 build:   打包' },
    { value: ':rewind: revert', name: '⏪ revert:   回退' },
    { value: ':tada: version', name: '🎉 version:   发布版本' }
  ],
  scopes: [
    { name: 'business' },
    { name: 'library' },
    { name: 'config' },
    { name: 'docs' },
    { name: 'architecture' }
  ],
  //消息步骤
  messages: {
    type: '请选择提交类型',
    customScope: '请输入修改范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认以上信息提交?(y/n)'
  },
  //跳过问题
  skipQuestion: ['body', 'footer'],
  //subject文字长度默认是
  subjectLimit: 72
}
