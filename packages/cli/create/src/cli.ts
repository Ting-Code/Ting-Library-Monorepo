import { Command } from 'commander'
import * as process from 'process'
import { version, bin } from '../package.json'
console.log('cli start')

const program = new Command()
program.name(Object.keys(bin)[0]).version(version).parse(process.argv)

console.log('cli end')
