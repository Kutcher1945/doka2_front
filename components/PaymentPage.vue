<template lang="pug">
.payment-page
  .payment-page__container
    button.go-back(@click="goBack")
      svg-icon(name="arrow-5").go-back__icon
    h3.payment-page__title {{ title }}

    .methods
      .methods__section-items
        .methods__section-item(v-for="paymentMethod in paymentMethods")
          button.method(
            :class="{ 'method_dark': paymentMethod.iconStyle && paymentMethod.iconStyle === 'dark' }"
            :disabled="!paymentMethod.isActive"
            @click.prevent="paymentType === 1 ? showPayment(paymentMethod.method) : showWithDrawal(paymentMethod.method)"
          )
            img(:src="'/images/redesign/wallet/' + paymentMethod.icon" :alt="paymentMethod.name").method__image
          .methods__section-item-name(v-html="paymentMethod.name")
    .methods__price
      .methods__price-title Условия по Пополнению денежных средств
      .methods__price-items
        .methods__price-item(v-for="commission in paymentCommission")
          img(:src="'/images/redesign/wallet/' + commission.icon" :alt="commission.name").method__image
          .methods__price-name(v-html="commission.commission" )
</template>

<script>
import ModalPayment from '@/components/Wallet/ModalPayment.vue'
import ModalWithDrawal from '@/components/Wallet/ModalWithDrawal.vue'
export default {
  components: {
    ModalPayment,
    ModalWithDrawal
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    paymentType: {
      type: Number,
      default: 0
    },
    paymentMethods: {
      type: Array,
      default () {
        return []
      }
    },
    paymentCommission: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goBack () {
      this.$router.push('/cabinet/wallet')
    },
    showPayment (paymentMethod) {
      this.$modal.show(
        ModalPayment,
        {
          paymentFunction: this.paymentsHandler,
          paymentMethod,
          isBinancePayIdActive: ['payment_page_binance', 'payout_binance', 'refund_binance'].includes(paymentMethod)
        },
        {},
        {}
      )
    },
    showWithDrawal (payoutMethod) {
      this.$modal.show(
        ModalWithDrawal,
        {
          paymentFunction: this.payoutsHandler,
          paymentMethod: payoutMethod,
          isBinancePayIdActive: ['payment_page_binance', 'payout_binance', 'refund_binance'].includes(payoutMethod)
        },
        {},
        {}
      )
    },
    async paymentsHandler (paymentAmount, paymentMethod, binancePayId) {
      await this.$axios.$get('/monetix/payments_handler/', {
        params: {
          payment_amount: paymentAmount,
          customer_id: this.$auth.user.id,
          payment_method: paymentMethod,
          binance_id: binancePayId || undefined
        }
      })
        .then((res) => {
          // console.log('Payment Response', res)
          // console.log(res.payment_link_encrypted)
          window.location.replace(res.payment_link_encrypted)
        })
    },
    async payoutsHandler (paymentAmount, paymentMethod, binancePayId) {
      // Копия paymentsHandler - после отправки на вывод,
      // не приходит url поэтому редирект на страницу кошелька
      // По логике Вывод средств на карту, с которого было пополнение
      await this.$axios.$get('/monetix/payments_handler/', {
        params: {
          payment_amount: paymentAmount,
          customer_id: this.$auth.user.id,
          payment_method: paymentMethod,
          binance_id: binancePayId || undefined
        }
      })
        .then((res) => {
          // console.log('Payment Response', res)
          // console.log(res.payment_link_encrypted)
          // window.location.replace('/cabinet/wallet/')
          // this.$router.push('/cabinet/wallet')
          window.location.reload()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-page {
  height: 100%;
}
.payment-page__container {
  height: 100%;
  background: #141415;
  border: 1px solid #323232;
  border-radius: 5px;
  backdrop-filter: blur(15rem);
  border-radius: .8rem;

  padding: 24px 42px;

  position: relative;
}
.go-back {
  position: absolute;
  top: 5.5rem;
  left: 6.5rem;
  &__icon {
    width: 1.8rem;
    height: 1.3rem;
  }
}
.payment-page__title {
  font-weight: 400;
  font-size: 25px;
  line-height: 135.2%;
  /* or 34px */

  text-align: center;
  letter-spacing: -0.7px;

  color: #FFFFFF;

  .accent {
    color: #C55BEA;
  }

  margin-bottom: 1.7rem;
}
/*
  ============================================================
  Methods
  ============================================================
*/
.methods {
  padding-bottom: 27px;
  border-bottom: 1px solid #323232;
}
.methods__section {
  &-title {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1;
    text-align: center;
    color: #FFFFFF;

    margin-bottom: 2rem;
  }
  &-items {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 25rem));
    grid-gap: 3.7rem;
    justify-content: center;
  }
  &-item {
    button {
      width: 100%;
      max-width: 230px;
      height: 53px;
      background: #1F1F1F;
      border-radius: 5px;
      &:disabled {
        background: #383838;  // Lightened version of #1f1f1f by 10%
        cursor: not-allowed;
      }
    }
    &-name {
      margin-top: 8px;
      font-weight: 300;
      font-size: 14px;
      line-height: 135.2%;
      /* or 19px */

      text-align: center;
      letter-spacing: 0.3px;

      color: #FFFFFF;
    }
  }

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
}
.method {
  background: #FFFFFF;
  border-radius: 1.2rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;

  padding: 1rem;

  &__image {
    max-width: 100%;
    max-height: 100%;
  }

  &_dark {
    background: #000000;
  }
}

.methods__price {
  padding-top: 27px;
  &-title {
    font-weight: 300;
    font-size: 14px;
    line-height: 135.2%;
    /* identical to box height, or 19px */

    text-align: center;
    letter-spacing: 0.3px;
    color: #fff;
    margin-bottom: 2rem;
  }
  &-items {
    margin-top: 46px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 40rem));
    grid-gap: 3.7rem;
    justify-content: center;
  }
  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &-name {
    margin-top: 20px;
    font-weight: 300;
    font-size: 14px;
    line-height: 135.2%;
    /* or 19px */

    text-align: center;
    letter-spacing: 0.3px;

    color: #BABABA;
  }
}
</style>
