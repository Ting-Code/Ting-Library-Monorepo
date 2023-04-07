import * as process from 'process'
import { log } from '@tingcli/cli-utils'
import { init } from './init'
import './error'

log.info('cli', 'start')
const program = init()
program
  .option('-t, --type <type>', '项目类型(值：project/page)')
  .option('-n, --name <template>', '模板名称')
program.action(() => {
  console.log('action')
})

program.parse(process.argv)
log.info('cli', 'end')
