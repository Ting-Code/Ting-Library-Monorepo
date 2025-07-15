import { ISchema } from '@/views/repackage/low-code/layout/renderer-plate/components/render-widget/index'

export const defaultSchema: ISchema = {
  type: 'ReForm',
  id: 'ReForm',
  slotName: { native: 'icon', name: 'one' },
  child: [
    {
      type: 'ReCol',
      id: 'ReColLLL1',
      child: [
        {
          id: 'ReRow',
          type: 'ReRow',
          child: [
            {
              type: 'ReCol',
              id: 'ReCol1',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol1',
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
              id: 'ReCol2',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol2',
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
              id: 'ReCol3',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol3',
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
      id: 'ReColLLL2',
      child: [
        {
          id: 'ReRow2',
          type: 'ReRow',
          child: [
            {
              type: 'ReCol',
              id: 'ReCol21',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol21',
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
              id: 'ReCol22',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol22',
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
              id: 'ReCol23',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol23',
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
              id: 'ReCol25',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol24',
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
              id: 'ReCol26',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol25',
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
              id: 'ReCol27',
              attrs: {
                span: 12
              },
              child: {
                type: 'ReFormItem',
                id: 'ReFormItemReCol26',
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
