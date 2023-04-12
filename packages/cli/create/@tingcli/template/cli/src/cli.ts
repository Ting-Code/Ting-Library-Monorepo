import * as process from 'process'
import { log } from '@tingcli/cli-utils'
import { init } from './init'
import './error'

log.info('cli', 'start')
const program = init()

program.action(() => {
  console.log('action')
})

program.parse(process.argv)
log.info('cli', 'end')
