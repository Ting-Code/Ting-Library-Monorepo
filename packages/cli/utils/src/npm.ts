import urlJoin from 'url-join'
import axios from 'axios'

import log from './log.js'

export const getNpmInfo = (npmName: string) => {
  // cnpm源：https://registry.npmmirror.com/
  const registry = 'https://registry.npmjs.org/'
  const url = urlJoin(registry, npmName)
  return axios.get(url).then((response) => {
    try {
      return response.data
    } catch (err) {
      return Promise.reject(err)
    }
  })
}

export const getLatestVersion = (npmName: string) => {
  return getNpmInfo(npmName).then((data) => {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('error', '没有 latest 版本号')
      return Promise.reject(new Error('没有 latest 版本号'))
    }
    return data['dist-tags'].latest
  })
}
