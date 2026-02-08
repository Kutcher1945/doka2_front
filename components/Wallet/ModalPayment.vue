<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .modal__body.modal-payment
    h2.modal-payment__title Введите сумму пополнения

    ValidationObserver(ref="form" v-slot="{ handleSubmit }" tag="div")
      form(@submit.prevent="formSubmit").modal-payment__form

        ValidationProvider(
          rules="required"
          mode="eager"
          v-slot="{ errors, classes }"
          vid="paymentAmount"
          tag="label"
        )
          .modal-payment__field
            input.modal-payment__field-input(type="number" name="paymentAmount" v-model="form.paymentAmount" min="0")
            span.modal-payment__field-currency р.
          .modal-payment__field-info(v-show="parseInt(form.paymentAmount) > 0" ) Сумма с учетом комиссии {{ amountAddCommission }}
          .modal-payment__field-error(v-if="errors[0]") {{ errors[0] }}
          .modal-payment__field-error(v-show="parseInt(form.paymentAmount) < 100") Минимальная сумма пополнения 100р

        ValidationProvider(
          v-if="isBinancePayIdActive"

          rules="required"
          mode="eager"
          v-slot="{ errors, classes }"
          vid="binancePayId"
          tag="label"
        )
          .modal-payment__field-label Binance Pay ID
          .modal-payment__field
            input.modal-payment__field-input(type="number" name="binancePayId" v-model="binancePayId")
          .modal-payment__field-error(v-if="errors[0]") {{ errors[0] }}

        .modal-payment__methods(v-show="false")
          label.method.modal-payment__method
            .checkbox.method__checkbox
              input(type="radio" :name="'payment-method-' + uid" value="")
              .checkbox__box
            .method__text.method__card **** **** **** 6574
          label.method.modal-payment__method
            .checkbox.method__checkbox
              input(type="radio" :name="'payment-method-' + uid" value="" checked)
              .checkbox__box
            .method__text Использовать новую карту
        .modal-payment__actions
          button.button-mode-3.button-mode-3_highlighted.modal-payment__button(type="submit") ПОПОЛНИТЬ
          button.button-mode-3.button-mode-3_highlighted.modal-payment__button(type="button", @click="formClose") ЗАКРЫТЬ
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    paymentFunction: Function,
    paymentMethod: String,
    isBinancePayIdActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        paymentAmount: '',
        method: ''
      },
      binancePayId: '',
      uid: null
    }
  },
  computed: {
    amountAddCommission () {
      return Math.round(((parseInt(this.form.paymentAmount) / 100) * 5) + parseInt(this.form.paymentAmount))
    }
  },
  mounted () {
    this.uid = this._uid
    this.getBinanceData()
  },
  methods: {
    formClose () {
      this.$emit('close')
    },
    async getBinanceData () {
      try {
        const respBinanceData = await this.$axios.$get(`/monetix/user_binance_account/${this.$auth.user.id}`)
        // console.log('respBinanceData ', respBinanceData)
        if (respBinanceData) {
          this.binancePayId = respBinanceData.binance_id
        }
      } catch (err) {
        console.log('get binance data - err ', err)
      }
    },
    formSubmit () {
      /**
       * сумма комиссии
       * сумма для пополнения
       * метод платежа
       * если Бинанс, то без комиссии
       * */
      if (parseInt(this.form.paymentAmount) > 99) {
        this.$emit('close')
        let paymentString = this.amountAddCommission.toString()
        // console.log('paymentString ', paymentString)
        // console.log('this.form.paymentAmount, this.paymentMethod ', this.form.paymentAmount, this.paymentMethod)
        this.paymentFunction(paymentString, this.paymentMethod, this.binancePayId ? this.binancePayId : '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.modal-payment {
  background: #171717;
  border: 1px solid #282828;
  border-radius: 8px;
  max-width: 48rem;
  overflow: hidden;

  padding: 32px 41px 29px;

  position: relative;
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}

.modal-payment__title {
  font-family: 'Bahnschrift', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;

  color: #FFFFFF;

  margin-bottom: 4rem;

  position: relative;
  &:after {
    content: '';

    width: 17.5rem;
    height: .2rem;
    background: #272727;

    position: absolute;
    top: calc(100% + 1.5rem);
    left: 50%;
    transform: translateX(-50%);
  }
}
.modal-payment__field-label {
  font-size: 1.4rem;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: .4rem;
}
.modal-payment__field {
  background: #272727;
  border-radius: .5rem;
  padding: 13px 40px 17px 40px;
  width: 100%;
  //max-width: 26rem;
  margin: 0 auto 12px auto;

  display: flex;
  align-items: center;

  //margin-bottom: 24px;

  &-input {
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    outline: none;

    font-family: 'Bahnschrift';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;

    color: #FFFFFF;

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
  &-currency {
    flex: 0 0 auto;

    font-weight: 400;
    font-size: 1.8rem;
    line-height: 1;
    color: #FFFFFF;
  }
}
.modal-payment__field-error {
  font-weight: 400;
  font-size: 12px;
  color: red;
  text-align: center;

  margin-top: 0;
  //margin-bottom: 1.2rem;
}
.modal-payment__field-info {
  color: #B7B7B7;
  font-size: 15px;
  line-height: 123%;
  text-align: center;
  margin: 12px auto;
}
.modal-payment__methods {
  margin-bottom: 24px;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 2rem;
}
.modal-payment__method {
  width: 240px;
  margin: 0 auto;
}
.modal-payment__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;
  margin: 12px auto 0 auto;
}
.modal-payment__button {
  font-family: 'Bahnschrift';
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;

  color: #FFFFFF;
  padding: 8px 7px 6px;
}

/*
  ============================================================
  Method
  ============================================================
*/
.method {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.method__checkbox {
  flex: 0 0 auto;
  margin-right: 2rem;
}
.method__text {
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1;
  color: #FFFFFF;
}
.method__card {

}
.checkbox {
  input {
    position: absolute;
    left: -9999px;
    visibility: hidden;
    opacity: 0;
  }
  input:checked ~ .checkbox__box {
    &:after {
      opacity: 1;
    }
  }
  &__box {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #515785;

    position: relative;
    &:after {
      content: '';

      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      background: #FFFFFF;
      opacity: 0;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
