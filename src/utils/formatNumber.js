export default function (number) {
  if (number === 'NaN') return ''
  const formatNumber = number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
  return formatNumber
}
