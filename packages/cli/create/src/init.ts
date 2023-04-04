import { program } from 'commander'
import { log } from '@tingcygf/cli-utils'
import { version, bin } from '../package.json'
import semver from 'semver'
import chalk from 'chalk'

const LOWEST_NODE_VERSION = '16.0.0'
function checkNodeVersion() {
  log.verbose('node version', process.version)
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(chalk.red(`cli 需要安装 ${LOWEST_NODE_VERSION} 以上版本的 Node.js`))
  }
}

function preAction() {
  // 检查Node版本
  checkNodeVersion()
}

export function init() {
  log.info('version', version)
  program
    .name(Object.keys(bin)[0])
    .usage('<command> [options]')
    .version(version)
    .option('-d, --debug', '是否开启debug', false)
    .hook('preAction', preAction)

  program.on('option:debug', function () {
    console.log(program.opts())
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode')
    }
  })

  program.on('command:*', function (obj) {
    log.error('未知的命令：' + obj[0])
  })
  return program
}
