/** Resolve translation key with optional namespace prefix */
export function resolveKey(namespace: string | undefined, key: string): string {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

/** Placeholder for vscode i18n Ally / route meta — returns key as-is */
export function metaKey(key: string): string {
  return key
}
