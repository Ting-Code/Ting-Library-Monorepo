export type TreeLeaf = {
  key: string
  path: string
}

export type TreeGroup = {
  key: string
  leaves: TreeLeaf[]
}

export function buildTreeGroups(primary: Record<string, unknown>): TreeGroup[] {
  return Object.entries(primary)
    .filter(([, value]) => value !== null && typeof value === 'object' && !Array.isArray(value))
    .map(([key, value]) => ({
      key,
      leaves: Object.entries(value as Record<string, unknown>)
        .filter(([, leaf]) => leaf === null || typeof leaf !== 'object' || Array.isArray(leaf))
        .map(([leafKey]) => ({
          key: leafKey,
          path: `${key}.${leafKey}`
        }))
    }))
    .sort((a, b) => a.key.localeCompare(b.key))
}

export function getByPath(root: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let cur: unknown = root
  for (const part of parts) {
    if (cur === null || typeof cur !== 'object' || Array.isArray(cur)) return undefined
    cur = (cur as Record<string, unknown>)[part]
  }
  return cur
}

export function setByPath(root: Record<string, unknown>, path: string, value: string) {
  const parts = path.split('.')
  if (parts.length < 2) return
  let cur: Record<string, unknown> = root
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    const next = cur[part]
    if (next === null || typeof next !== 'object' || Array.isArray(next)) {
      cur[part] = {}
    }
    cur = cur[part] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]] = value
}

export function addTreeGroup(data: Record<string, Record<string, unknown>>, groupKey: string) {
  for (const locale of Object.keys(data)) {
    if (!data[locale][groupKey] || typeof data[locale][groupKey] !== 'object') {
      data[locale][groupKey] = {}
    }
  }
}

export function addTreeLeaf(
  data: Record<string, Record<string, unknown>>,
  groupKey: string,
  leafKey: string
) {
  for (const locale of Object.keys(data)) {
    const group = data[locale][groupKey]
    if (!group || typeof group !== 'object' || Array.isArray(group)) {
      data[locale][groupKey] = {}
    }
    const target = data[locale][groupKey] as Record<string, unknown>
    if (target[leafKey] === undefined) {
      target[leafKey] = ''
    }
  }
}

export function removeTreeGroup(data: Record<string, Record<string, unknown>>, groupKey: string) {
  for (const locale of Object.keys(data)) {
    delete data[locale][groupKey]
  }
}

export function removeTreeLeaf(
  data: Record<string, Record<string, unknown>>,
  groupKey: string,
  leafKey: string
) {
  for (const locale of Object.keys(data)) {
    const group = data[locale][groupKey]
    if (group && typeof group === 'object' && !Array.isArray(group)) {
      delete (group as Record<string, unknown>)[leafKey]
    }
  }
}
