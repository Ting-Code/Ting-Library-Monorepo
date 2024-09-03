import { input, select } from '@inquirer/prompts'
import { CancelablePromise } from '@inquirer/type'

export const TYPE = [
  { name: 'monorepo', value: 'monorepo', description: 'ting-library-monorepo 主项目' },
  { name: 'cli', value: 'cli', description: 'ting-library-cli 脚本项目' }
]

export const getSelectType = (): CancelablePromise<string> => {
  return select({
    message: '项目类型',
    choices: TYPE
  })
}

export const getProjectName = (defaultValue?: string): CancelablePromise<string> => {
  return input({
    message: '项目名称',
    default: defaultValue
  })
}
