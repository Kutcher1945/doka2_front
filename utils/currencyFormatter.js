import currencyFormatter from 'currency-formatter'
export default (num, code, precision = 0) => {
  precision = (num % 1) === 0 ? 0 : 2
  const parameters = {
    code,
    format: '%v %s',
    thousand: ' ',
    decimal: ',',
    precision
  }

  if (code === 'RUR') {
    parameters.code = 'RUB'
  } else if (code === 'empty') {
    if (num === '') {
      return ''
    }
    parameters.format = '%v'
  } else if (code === 'symbol') {
    parameters.format = '%s'
  }

  return currencyFormatter.format(num, parameters).replace(/(?!^)-(\s+)?/, ',')
}
