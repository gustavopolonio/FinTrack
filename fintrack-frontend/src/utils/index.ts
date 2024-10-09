export function formatToDollar(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(value)
    .replace(/^(\D+)/, '$1 ') // Add space between symbol and value
    .replace(/\s+/g, ' ') // Remove possible duplicated spaces between symbol and value
}
