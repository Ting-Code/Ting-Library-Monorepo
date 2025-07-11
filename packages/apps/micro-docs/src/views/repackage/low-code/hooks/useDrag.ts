export { useSortable } from '@vueuse/integrations/useSortable'
export type { SortableEvent } from 'sortablejs'
import { cloneDeep } from '@tingcode/utils'

/**
 * Inserts a element into the DOM at a given index.
 * @param parentElement
 * @param element
 * @param {number} index
 */
export function insertNodeAt(parentElement: Element, element: Element, index: number) {
  const refElement = parentElement.children[index]
  parentElement.insertBefore(element, refElement)
}

/**
 * Removes a node from the DOM.
 * @param {Node} node
 */
export function removeNode(node: Node) {
  if (node.parentNode) node.parentNode.removeChild(node)
}

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
