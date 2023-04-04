import { execa } from 'execa'

type WorkspacePackage = { name: string; version?: string; path: string }
// 获取所有子项目的信息 as WorkspacePackage （筛选需要打包的子项目）
async function getAllPackages(namespace?: string | undefined) {
  const { stdout } = await execa('pnpm', ['ls', '-r', '--depth', '-1', '--json'])
  return (JSON.parse(stdout) as WorkspacePackage[]).filter((p) => {
    return p.name.includes(namespace || '') || !namespace
  })
}

async function getPackage() {
  const { stdout } = await execa('npm', ['ls', '-r', '--depth', '-1', '--json'])
  return JSON.parse(stdout) as WorkspacePackage
}

export { getPackage, getAllPackages }
