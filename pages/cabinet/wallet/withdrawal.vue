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
      title: 'Вывод средств',
      paymentType: 2, // 2 = payout, 1 = payment
      // paymentMethodsOld: [
      //   {
      //     type: 'online',
      //     name: 'visa',
      //     icon: 'pay-visa.png',
      //
      //     method: 'payout_card'
      //   },
      //   {
      //     type: 'online',
      //     name: 'uzcard',
      //     icon: 'pay-uzcard.svg',
      //     iconStyle: 'dark',
      //
      //     method: 'payout_card_uzcard'
      //   },
      //   {
      //     type: 'crypto',
      //     name: 'binance',
      //     icon: 'redesign/pay-blk-frame-h.png',
      //     iconStyle: 'dark',
      //
      //     method: 'payout_binance'
      //   }
      // ],
      paymentMethods: [
        {
          type: 'online',
          name: 'VISA, МИР, Mastercard',
          icon: 'visamcmir.svg',
          iconStyle: 'dark',
          method: 'payout_card',
          isActive: true
        },
        {
          type: 'online',
          name: 'СБП<br />(Система Быстрых Платежей)',
          icon: 'sbp.svg',
          iconStyle: 'dark',
          method: 'payout_card_uzcard',
          isActive: false
        },
        {
          type: 'crypto',
          name: 'Binance Pay',
          icon: 'binance.svg',
          iconStyle: 'dark',
          method: 'payout_binance',
          isActive: true
        }
      ],
      paymentCommission: [
        {
          name: 'VISA, МИР, Mastercard',
          commission: '<span class="methods__price-name__strong">Банковские карты системы “МИР”</span> - Сумма вывода от 500₽ до 100 000₽ в месяц. Комиссия 0%',
          icon: 'visamcmir_big.svg'
        },
        {
          name: 'СБП (Система Быстрых Платежей)',
          commission: '<span class="methods__price-name__strong">СБП (Система Быстрых Платежей)</span> - Сумма вывода от 1000₽ до 490 000₽ за операцию.',
          icon: 'sbp_big.svg'
        },
        {
          name: 'Binance Pay',
          commission: '<span class="methods__price-name__strong">BinancePay</span> - cумма вывода от 1 BUSD до 8 000 000 BUSD в день, Комиссия 0%',
          icon: 'binance_big.svg'
        }
      ]
    }
  }
}
</script>
