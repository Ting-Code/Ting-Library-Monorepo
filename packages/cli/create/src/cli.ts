import * as process from 'process'
import { log } from '@tingcygf/cli-utils'
import { init } from './init'
import './error'

log.info('cli', 'start')
const program = init()
program.parse(process.argv)
log.info('cli', 'end')
