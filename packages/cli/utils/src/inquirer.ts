import inquirer from 'inquirer'

export interface Params {
  type?: 'list' | 'input' | 'password' | 'confirm' | 'expand' | 'checkbox' | 'editor'
  choices?: any[]
  message?: string
  mask?: string
  validate?: () => boolean
  defaultValue?: any
  loop?: boolean
  pageSize?: number
}
interface Options extends Params {
  name?: string
  default?: any
}

function make({
  choices,
  defaultValue,
  message = '请选择',
  type = 'list',
  mask = '*',
  validate,
  pageSize,
  loop
}: Params) {
  const options: Options = {
    name: 'name',
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
  return inquirer.prompt(options).then((answer) => answer.name)
}

export function makeList(params: Params) {
  return make({ ...params })
}

export function makeInput(params: Omit<Params, 'type'>) {
  return make({
    type: 'input',
    ...params
  })
}

export function makePassword(params: Omit<Params, 'type'>) {
  return make({
    type: 'password',
    ...params
  })
}
