import { inquirerSelect, inquirerInput } from '@tingcli/cli-utils'

export const TYPE = [
  { name: 'cli', value: 'cli' },
  { name: 'monorepo', value: 'monorepo' }
]
export const getSelectType = () => {
  return inquirerSelect({
    type: 'list',
    name: 'type',
    message: '项目类型',
    choices: TYPE
  })
}

export const getProjectName = () => {
  return inquirerInput({
    type: 'input',
    name: 'project',
    message: '项目名称'
  })
}
