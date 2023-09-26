import { runPromptsSelect, runSingleScript, getPackages } from './helper'

export async function runDev() {
  const command = 'dev'
  const main = async () => {
    const packages = await getPackages((p) => p.name.startsWith('@apps'))
    if (!packages.length) {
      console.log('没识别到任何项目')
      return
    }

    if (packages.length === 1) {
      runSingleScript(packages[0], command)
      return
    }
    const { value } = await runPromptsSelect(packages)

    runSingleScript(
      packages.find((p) => p.name === value),
      command
    )
  }

  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

runDev()
