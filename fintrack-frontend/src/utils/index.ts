export function formatNumberToCurrencyWithoutSymbol(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatNumberToCurrencyWithSymbol(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(value)
    .replace(/^(\D+)/, '$1 ') // Add space between symbol and value
    .replace(/\s+/g, ' ') // Remove possible duplicated spaces between symbol and value
}

export function removeCommas(str: string) {
  return str.replace(/,/g, '')
}

export function splitIntegerAndDecimal(value: string) {
  const [integerPart, decimalPart = undefined] = value.split('.')
  return { integerPart, decimalPart }
}
