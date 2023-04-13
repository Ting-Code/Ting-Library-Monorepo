import { program } from 'commander'
import { version, bin } from '../package.json'

export function init() {
  program.name(Object.keys(bin)[0]).usage('<command> [options]').version(version)
  return program
}
