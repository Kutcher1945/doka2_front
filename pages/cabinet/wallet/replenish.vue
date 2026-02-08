<template lang="pug">
  PaymentPage(
    :title="title"
    :payment-type="paymentType"
    :payment-methods="paymentMethods"
    :payment-commission="paymentCommission"
  )
</template>

<script>
import PaymentPage from '@/components/PaymentPage.vue'
export default {
  components: {
    PaymentPage
  },
  layout: 'cabinet-default',
  data () {
    return {
      title: 'Пополнение баланса',
      paymentType: 1, // 2 = payout, 1 = payment
      paymentMethods: [
        {
          type: 'online',
          name: 'VISA, МИР, Mastercard',
          icon: 'visamcmir.svg',
          iconStyle: 'dark',
          method: 'payment_page_card',
          isActive: true
        },
        {
          type: 'online',
          name: 'СБП<br />(Система Быстрых Платежей)',
          icon: 'sbp.svg',
          iconStyle: 'dark',
          method: 'payment_page_card',
          isActive: false
        },
        {
          type: 'crypto',
          name: 'Binance Pay',
          icon: 'binance.svg',
          iconStyle: 'dark',
          method: 'payment_page_binance',
          isActive: true
        }
      ],
      paymentCommission: [
        {
          name: 'VISA, МИР, Mastercard',
          commission: '<span class="methods__price-name__strong">Банковские карты системы “МИР”</span> - Сумма пополнения от 200₽ до 1 000 000₽ в месяц, Комиссия 5%',
          icon: 'visamcmir_big.svg'
        },
        {
          name: 'СБП (Система Быстрых Платежей)',
          commission: '<span class="methods__price-name__strong">СБП (Система Быстрых Платежей)</span> - Сумма пополнения от 500₽ до 150 000₽ за операцию. Комиссия 5%',
          icon: 'sbp_big.svg'
        },
        {
          name: 'Binance Pay',
          commission: '<span class="methods__price-name__strong">BinancePay</span> - cумма пополнения от 1 BUSD до 9 000 BUSD в день/ 1 500 000 BUSD в месяц, Комиссия 5%',
          icon: 'binance_big.svg'
        }
      ]
    }
  }
}
</script>
