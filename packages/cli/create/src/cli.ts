import { Command } from 'commander'
import * as process from 'process'
import { version, bin } from '../package.json'
import { log } from '@tingcygf/cli-utils'
log.info('cli', 'start')
const program = new Command()
program
  .name(Object.keys(bin)[0])
  .usage('<command> [options]')
  .version(version)
  .option('-d, --debug', '是否开启debug', false)
  .action(() => {
    log.verbose('cli', '--debug')
  })

program.parse(process.argv)
