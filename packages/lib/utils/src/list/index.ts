import { cloneDeep } from 'lodash'

export function addList<T>(list: T[], item: T, to: number): T[] {
  const cloneList: T[] = cloneDeep(list)
  if (!item) return cloneList
  if (cloneList && cloneList.length) {
    cloneList.splice(to, 0, cloneDeep(item))
    return cloneList
  } else {
    return [cloneDeep(item)]
  }
}

export function removeList<T>(list: T[], to: number): T[] {
  const cloneList: T[] = cloneDeep(list)
  if (!cloneList || !cloneList.length) return []
  cloneList.splice(to, 1)
  return cloneList
}

export function updateList<T>(list: T[], to: number, from: number): T[] {
  const cloneList: T[] = cloneDeep(list)
  if (!cloneList || !cloneList.length) return []
  const dragItem = cloneList.splice(from, 1)
  if (!(dragItem && dragItem[0])) return cloneList
  cloneList.splice(to, 0, dragItem[0])
  return cloneList
}
