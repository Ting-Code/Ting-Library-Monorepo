import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import system from './module/system/menu'
import user from './module/user/user'

export function setupProdMockServer() {
  createProdMockServer([...system, ...user])
}
