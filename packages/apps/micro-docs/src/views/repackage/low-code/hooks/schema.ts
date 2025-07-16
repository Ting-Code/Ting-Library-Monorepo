import { ISchema } from '@/views/repackage/low-code/layout/renderer-plate/components/render-widget/index'
import { uuid } from '@tingcode/utils'
export const defaultSchema: ISchema = {
  type: 'ReForm',
  id: uuid(),
  slotName: { native: 'icon', name: 'one' },
  child: [
    {
      type: 'ReCol',
      id: uuid(),
      child: [
        {
          id: uuid(),
          type: 'ReRow',
          child: [
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'one'
                }
              }
            },
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'tow.key'
                }
              }
            },
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'tow.key',
                  slotName: { native: 'suffix', name: 'tow' }
                }
              }
            }
          ]
        }
      ]
    },
    {
      type: 'ReCol',
      id: uuid(),
      child: [
        {
          id: uuid(),
          type: 'ReRow',
          child: [
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'one'
                }
              }
            },
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'tow.key'
                }
              }
            },
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'tow.key',
                  slotName: { native: 'suffix', name: 'tow' }
                }
              }
            },
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'tow.key',
                  slotName: { native: 'suffix', name: 'tow' }
                }
              }
            },
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'tow.key',
                  slotName: { native: 'suffix', name: 'tow' }
                }
              }
            },
            {
              type: 'ReCol',
              id: uuid(),
              attrs: {
                span: 12,
                name: '输入框'
              },
              child: {
                type: 'ReFormItem',
                id: uuid(),
                attrs: {
                  label: '请输入'
                },
                child: {
                  type: 'ReInput',
                  field: 'tow.key',
                  slotName: { native: 'suffix', name: 'tow' }
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

export function getReRowSchema() {
  return {
    type: 'ReCol',
    id: uuid(),
    child: [
      {
        id: uuid(),
        type: 'ReRow',
        child: [] as any
      }
    ]
  }
}
export function getReInputSchema() {
  return {
    type: 'ReCol',
    id: uuid(),
    attrs: {
      span: 12,
      name: '输入框'
    },
    child: [
      {
        type: 'ReFormItem',
        attrs: {
          label: '请输入'
        },
        child: [
          {
            type: 'ReInput'
          }
        ]
      }
    ]
  }
}
export function getReButtonSchema() {
  return {
    type: 'ReCol',
    id: uuid(),
    attrs: {
      name: '按钮',
      span: 12
    },
    child: [
      {
        type: 'ReFormItem',
        id: uuid(),
        attrs: {
          label: '按钮'
        },
        child: [
          {
            type: 'ReButton',
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    ]
  }
}
export function getReRadioSchema() {
  return {
    type: 'ReCol',
    id: uuid(),
    attrs: {
      name: '单选框',
      span: 12
    },
    child: [
      {
        type: 'ReFormItem',
        id: uuid(),
        attrs: {
          label: '单选框'
        },
        child: [
          {
            type: 'ReRadio',
            attrs: {
              modelValue: '1',
              options: [
                { value: '1', label: '是' },
                { value: '2', label: '否' },
                { value: '3', label: '弃权' }
              ]
            }
          }
        ]
      }
    ]
  }
}
export function getReSelectSchema() {
  return {
    type: 'ReCol',
    id: uuid(),
    attrs: {
      name: '下拉框',
      span: 12
    },
    child: [
      {
        type: 'ReFormItem',
        id: uuid(),
        attrs: {
          label: '下拉框'
        },
        child: [
          {
            type: 'ReSelect',
            slotName: 'default',
            attrs: {
              modelValue: '',
              options: [
                { value: '1', label: '是' },
                { value: '2', label: '否' },
                { value: '3', label: '弃权' }
              ]
            }
          }
        ]
      }
    ]
  }
}
export function getReCheckboxSchema() {
  return {
    type: 'ReCol',
    id: uuid(),
    attrs: {
      name: '多选框',
      span: 12
    },
    child: [
      {
        type: 'ReFormItem',
        id: uuid(),
        attrs: {
          label: '多选框'
        },
        child: [
          {
            type: 'ReCheckbox',
            slotName: 'default',
            attrs: {
              modelValue: ['1'],
              options: [
                { value: '1', label: '是' },
                { value: '2', label: '否' },
                { value: '3', label: '弃权' }
              ]
            }
          }
        ]
      }
    ]
  }
}
export const typeToSchemaMap = {
  ReRow: getReRowSchema,
  ReInput: getReInputSchema,
  ReButton: getReButtonSchema,
  ReRadio: getReRadioSchema,
  ReSelect: getReSelectSchema,
  ReCheckbox: getReCheckboxSchema
}

export function getTypeToSchema(type: keyof typeof typeToSchemaMap) {
  const getSchemaFn = typeToSchemaMap[type]
  return getSchemaFn()
}

export function getConfigSchema() {
  return {
    type: 'ReRow',
    child: [
      {
        type: 'ReCol',
        attrs: {
          span: 24
        },
        child: {
          type: 'ReFormItem',
          attrs: {
            label: 'Col宽度：'
          },
          child: {
            attrs: {
              valueFormat: 'roundDown'
            },
            type: 'ReInput',
            field: 'attrs.span'
          }
        }
      },
      {
        type: 'ReCol',
        attrs: {
          span: 24
        },
        child: {
          type: 'ReFormItem',
          attrs: {
            label: 'label：'
          },
          child: {
            type: 'ReInput',
            field: 'child[0].attrs.label'
          }
        }
      }
    ]
  }
}
