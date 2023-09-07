import { genMessage } from '@/locale/helper'

const modules = import.meta.glob('./en/**/*.ts', { eager: true })
export default {
  message: {
    ...genMessage(modules, 'en')
  },
  dateLocale: null,
  dateLocaleName: 'en'
}
