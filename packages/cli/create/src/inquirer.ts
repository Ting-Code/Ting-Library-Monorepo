import { inquirerSelect, inquirerInput } from '@tingcli/cli-utils'
export const getSelectType = () => {
  return inquirerSelect({
    type: 'list',
    name: 'type',
    choices: [
      { name: 'cli', value: 'cli' },
      { name: 'monorepo', value: 'monorepo' }
    ]
  })
}

export const getProjectName = () => {
  return inquirerInput({
    type: 'input',
    name: 'project',
    message: '项目名称'
  })
}
