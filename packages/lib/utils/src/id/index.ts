enum UUIDFormat {
  CookieBase90,
  FlickrBase58,
  UUID25Base36
}

const constants = {
  [UUIDFormat.CookieBase90]:
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~",
  [UUIDFormat.FlickrBase58]: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
  [UUIDFormat.UUID25Base36]: '0123456789abcdefghijklmnopqrstuvwxyz'
}

/**
 * Calculate length for the shortened ID
 * @param {number} alphabetLength
 * @returns {number}
 */
const getShortIdLength = (alphabetLength: number): number =>
  Math.ceil(Math.log2(Math.pow(2, 128)) / Math.log2(alphabetLength))

/**
 * Convert a hex string to a custom base string
 * @param {string} hex
 * @param {string} alphabet
 * @returns {string}
 */
const hexToCustomBase = (hex: string, alphabet: string): string => {
  const base = alphabet.length
  let num = BigInt(`0x${hex}`)
  let encoded = ''

  while (num > 0) {
    encoded = alphabet[Number(num % BigInt(base))] + encoded
    num = num / BigInt(base)
  }

  return encoded
}

interface PaddingParams {
  shortIdLength: number
  consistentLength: boolean
  paddingChar: string
}

/**
 * Takes a UUID, strips the dashes, and translates to custom base
 * @param {string} longId
 * @param {string} alphabet
 * @param {PaddingParams} [paddingParams]
 * @returns {string}
 */
const shortenUUID = (longId: string, alphabet: string, paddingParams?: PaddingParams): string => {
  const hex = longId.replace(/-/g, '')
  const translated = hexToCustomBase(hex, alphabet)

  if (!paddingParams || !paddingParams.consistentLength) return translated

  return translated.padStart(paddingParams.shortIdLength, paddingParams.paddingChar)
}

/**
 * Generate a standard UUID
 * @returns {string}
 */
const generateUUID = (): string => {
  const hexDigits = '0123456789abcdef'
  const s: string[] = Array(36).fill('')

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.charAt(Math.floor(Math.random() * 0x10))
  }
  s[14] = '4'
  s[19] = hexDigits.charAt((parseInt(s[19], 16) & 0x3) | 0x8)
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}

/**
 * Generate a UUID in either standard or short format based on the provided format
 * @param {UUIDFormat} [format] - Enum to specify the desired format
 * @returns {string}
 */
const uuid = (format?: UUIDFormat): string => {
  const standardUUID = generateUUID()
  if (format === undefined) {
    return standardUUID
  }

  const useAlphabet = constants[format]
  const shortIdLength = getShortIdLength(useAlphabet.length)

  const paddingParams: PaddingParams = {
    shortIdLength,
    consistentLength: true,
    paddingChar: useAlphabet[0]
  }

  return shortenUUID(standardUUID, useAlphabet, paddingParams)
}

export { uuid, UUIDFormat }
