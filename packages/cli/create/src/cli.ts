import * as process from 'process'
import { log } from '@tingcli/cli-utils'
import { init } from './init'
import './error'
// import { getSelectType, getProjectName } from './inquirer'

log.info('cli', 'start')
const program = init()
program
  .option('-t, --type [type]', '项目类型')
  .option('-n, --name [template]', '模板名称')
  .action(({ type, template }) => {
    console.log('action', '2')
    const _type = type
    const _template = template
    // if (typeof type !== 'string') {
    //   _type = getSelectType()
    // }
    // if (typeof type !== 'string') {
    //   _template = getProjectName()
    // }
    console.log('action', _type, _template)
  })

program.parse(process.argv)
log.info('cli', 'end')
