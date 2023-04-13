import * as path from 'path'
import { homedir } from 'node:os'
import ora from 'ora'
import { pathExistsSync } from 'path-exists'
import fse from 'fs-extra'
import { execa } from 'execa'

const TEMP_HOME = '.tingcli'
const TEMPLATE_CLI = '@tingcli/template'

// 安装缓存目录
const getTemplatePath = () => {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'template')
}
function getCacheDir(targetPath: string) {
  return path.resolve(targetPath, 'node_modules')
}

export const downloadTemplate = async (type: string, name: string) => {
  try {
    if (type === 'cli') {
      await downloadCliTemplate(type, name)
    } else {
      await downloadGitTemplate(type, name)
    }
  } catch (e) {
    console.log('失败', '模板下载失败')
  }
}

export const downloadCliTemplate = async (type: string, name: string) => {
  const spinner = ora('正在下载cli模板...').start()
  const targetPath = getTemplatePath()
  const cacheDir = getCacheDir(targetPath)
  if (!pathExistsSync(cacheDir)) {
    fse.mkdirpSync(cacheDir)
  }
  try {
    await execa('npm', ['install', TEMPLATE_CLI], { cwd: targetPath })
    // copy cli 源路径
    const originFile = path.resolve(cacheDir, `${TEMPLATE_CLI}/${type}`)
    const fileList = fse.readdirSync(originFile)
    const rootDir = process.cwd()
    fse.ensureDirSync(originFile)
    const installDir = path.resolve(`${rootDir}/${name}`)
    fileList.map((file) => {
      fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
    })
    spinner.succeed('下载成功')
  } catch (e) {
    spinner.fail('下载失败')
  }
}

export const downloadGitTemplate = async (type: string, name: string) => {
  const spinner = ora('正在下载模板...').start()
  const rootDir = process.cwd()
  const installDir = path.resolve(`${rootDir}/${name}`)
  if (!pathExistsSync(installDir)) {
    fse.mkdirpSync(installDir)
  }
  try {
    await execa(
      'git',
      ['clone', '-b', 'master', 'https://github.com/Ting-Code/Ting-Library-Monorepo.git', '.'],
      {
        cwd: installDir
      }
    )
    spinner.succeed('下载成功')
  } catch (e: any) {
    spinner.fail(`下载失败： ${e.stderr}`)
  }
}
