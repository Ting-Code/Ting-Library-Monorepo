import inquirer, { type QuestionMap, type QuestionCollection } from 'inquirer'

export interface Params {
  type: keyof QuestionMap
  choices?: any[]
  message?: string
  mask?: string
  validate?: (value: string) => boolean
  filter?: (value: string) => string // 过滤器, 返回修改后的回答。优先级高于 `validate`
  transformer?: (value: string) => string // 转换器, 返回转换后的值，只作为显示，不影响收集结果
  defaultValue?: any
  loop?: boolean
  pageSize?: number
  name?: string
}
interface Options extends Params {
  default?: any
}

export function inquirerInput({
  choices,
  defaultValue,
  message = '请选择',
  type = 'list',
  mask = '*',
  validate,
  pageSize,
  loop,
  name = 'name'
}: Params) {
  const options: Options = {
    name,
    default: defaultValue,
    message,
    type,
    mask,
    validate,
    pageSize,
    loop
  }
  if (type === 'list') {
    options.choices = choices
  }
  return inquirer.prompt(options as QuestionCollection)
}

interface SelectParams extends Params {
  type: 'list' | 'checkbox'
  choices: { name: string; value: string }[]
}

export const inquirerSelect = (params: SelectParams) => {
  return inquirerInput({ ...params })
}

export const test = (a: any) => {
  return a
}

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
