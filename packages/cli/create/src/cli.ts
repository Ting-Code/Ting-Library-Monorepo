import * as process from 'process'
import { init } from './init'
import { getSelectType, getProjectName, TYPE } from './inquirer'
import { downloadTemplate } from './downloadTemplate'

const program = init()
program
  .option('-t, --type [type]', '项目类型')
  .option('-n, --name [template]', '模板名称')
  .action(async ({ type, template }) => {
    let _type = type
    let _template = template
    if (!TYPE.map((i) => i.value).includes(type)) {
      const { type } = await getSelectType() // 获取项目类型
      _type = type
    }
    if (typeof template !== 'string') {
      const { project } = await getProjectName() // 获取项目名称
      _template = project
    }
    downloadTemplate(_type, _template)
  })

program.parse(process.argv)
