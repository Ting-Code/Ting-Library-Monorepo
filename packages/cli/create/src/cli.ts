import * as process from 'process'
import { init } from './init'
import { getProjectName, getSelectType, TYPE } from './inquirer'
import { downloadTemplate } from './downloadTemplate'

const program = init()
program
  .option('-t, --type [type]', '项目类型')
  .option('-n, --name [name]', '模板名称')
  .action(async ({ type, name }) => {
    let _type = type
    let _name = name
    if (!TYPE.map((i) => i.value).includes(type)) {
      // 获取项目类型
      _type = await getSelectType()
    }
    if (typeof name !== 'string') {
      // 获取项目名称
      _name = await getProjectName(`ting-library-${_type}`)
    }
    console.log(`正在 ${_name} 下创建 ${_type} 项目`)
    downloadTemplate(_type, _name || 'demo2')
  })

program.parse(process.argv)
