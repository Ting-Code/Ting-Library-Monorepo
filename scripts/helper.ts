import { execa } from 'execa'
import prompts = require('prompts')

type WorkspacePackage = { name: string; version?: string; path: string }
// 获取所有子项目的信息 as WorkspacePackage （筛选需要打包的子项目）
export async function getPackages(filter: (p?: WorkspacePackage) => Boolean = () => true) {
  const { stdout } = await execa('pnpm', ['ls', '-r', '--depth', '-1', '--json'])
  return (JSON.parse(stdout) as WorkspacePackage[]).filter(filter)
}

/**
 * @description 执行多个命令
 * @param pkgArr
 * @param script
 */
export async function runScript(pkgArr: WorkspacePackage[], script: string) {
  pkgArr.forEach((pkg) => {
    execa('pnpm', ['--filter', `${pkg.name}...`, script], {
      stdio: 'inherit',
      preferLocal: true
    })
  })
}

/**
 * @description 运行单个项目
 * @param pkg
 * @param script
 */
export async function runSingleScript(pkg: WorkspacePackage, script: string) {
  execa('pnpm', ['--filter', `${pkg.name}...`, script], {
    stdio: 'inherit',
    preferLocal: true
  })
}

interface PromptsSelectConfig {
  type?: 'select' | 'multiselect'
  message?: string
  hint?: string
}

/**
 * @description 命令行执行选择交互 （单选|多选）
 * @param packages
 * @param config
 */
export function runPromptsSelect(packages: WorkspacePackage[], config: PromptsSelectConfig = {}) {
  const {
    type = 'select',
    message = '请选择需要执行的项目',
    hint = '- 上下选择，空格切换，回车确定'
  } = config
  return prompts([
    {
      name: 'value',
      message: message,
      type: type,
      choices: packages.map((p) => {
        return {
          title: p.name,
          value: p.name
        }
      }),
      hint: hint
    }
  ])
}
