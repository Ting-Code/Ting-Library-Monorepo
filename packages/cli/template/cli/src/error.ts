import { isDebug, log } from '@tingcli/cli-utils'

function printErrorLog(e: Error, type: string) {
  if (isDebug()) {
    log.error(type, e as any)
  } else {
    log.error(type, e.message)
  }
}

process.on('uncaughtException', (e) => printErrorLog(e, 'error'))

process.on('unhandledRejection', (e) => printErrorLog(e as Error, 'promise'))
