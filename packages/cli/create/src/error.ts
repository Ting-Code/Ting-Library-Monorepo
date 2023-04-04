import { isDebug, log } from '@tingcygf/cli-utils'

function printErrorLog(e: Error, type: string) {
  if (isDebug()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}

process.on('uncaughtException', (e) => printErrorLog(e, 'error'))

process.on('unhandledRejection', (e) => printErrorLog(e as Error, 'promise'))
