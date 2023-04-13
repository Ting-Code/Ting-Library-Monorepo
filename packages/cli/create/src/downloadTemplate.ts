import * as path from 'path'
import { homedir } from 'node:os'
import ora from 'ora'
import { pathExistsSync } from 'path-exists'
import fse from 'fs-extra'
import { execa } from 'execa'
// @ts-ignore
import download from 'download-git-repo'
import { printErrorLog } from './error'

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
  const spinner = ora('正在下载模板...').start()
  console.log('action', type, name)
  if (type === 'cli') {
    await downloadCliTemplate(type, name)
  } else {
    await downloadGitTemplate(type, name)
  }
  spinner.stop()
}

export const downloadCliTemplate = async (type: string, name: string) => {
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
  } catch (e) {
    printErrorLog(e as Error, 'error')
  }
}

export const downloadGitTemplate = async (type: string, name: string) => {
  try {
    download('github:Ting-Code/Ting-Library-Monorepo', `${name}`, { clone: true }, () => {})
  } catch (e) {
    printErrorLog(e as Error, 'error')
  }
}
