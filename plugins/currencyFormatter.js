import cf from '@/utils/currencyFormatter.js'

export default (context, inject) => {
  inject('currencyFormatter', cf)
}
