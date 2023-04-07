import log from 'npmlog'

export function isDebug() {
  return process.argv.includes('--debug') || process.argv.includes('-d')
}

if (isDebug()) {
  log.level = 'verbose'
} else {
  log.level = 'info'
}

log.heading = 'ting'
log.addLevel('success', 2000, { fg: 'green', bold: true })

export default log
