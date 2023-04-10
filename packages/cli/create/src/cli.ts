import * as process from 'process'
import { log } from '@tingcli/cli-utils'
import { init } from './init'
import './error'

log.info('cli', 'start')
const program = init()
program
  .option('-t, --type <type>', '项目类型')
  .option('-n, --name <template>', '模板名称')
  .action((...pkg) => {
    console.log('action', pkg)
  })

program.parse(process.argv)
log.info('cli', 'end')
