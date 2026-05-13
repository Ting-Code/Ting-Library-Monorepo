import { createProdMockServer } from 'vite-plugin-mock/client'

import system from './module/system/menu'
import role from './module/system/role'
import user from './module/user/user'

export function setupProdMockServer() {
  createProdMockServer([...system, ...role, ...user])
}
