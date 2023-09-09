import { runPromptsSelect, runSingleScript, getPackages, runScript } from './helper'

export async function runBuild() {
  const command = 'build'
  const main = async () => {
    const packages = await getPackages((pkg) => {
      return [
        '@apps/admin',
        '@apps/micro',
        '@tingcli/create',
        '@tingcli/lib-vue',
        '@tingcli/cli-utils',
        'vite-plugin-code'
      ].includes(pkg.name)
    })
    if (!packages.length) {
      console.log('没识别到任何项目')
      return
    }

    if (packages.length === 1) {
      runSingleScript(packages[0], command)
      return
    }
    const { value } = await runPromptsSelect(packages, { type: 'multiselect' })

    runScript(
      packages.filter((p) => value.includes(p.name)),
      command
    )
  }

  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

runBuild()
