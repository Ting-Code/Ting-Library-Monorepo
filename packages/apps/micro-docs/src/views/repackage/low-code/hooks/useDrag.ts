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

export function addDrag<T>(list: T[], item: T, to: number): (T | never)[] {
  const dragList: T[] = cloneDeep(list)
  if (!dragList) return dragList || []
  if (dragList && dragList.length) {
    return dragList.splice(to, 0, cloneDeep(item))
  } else {
    return [cloneDeep(item)!]
  }
}
