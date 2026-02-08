<template>
  <div class="wallet">
    <div class="wallet__container">
      <div class="header wallet__header">
        <div class="header__accounts">
          <div v-for="(item,index) in balance" :key="index" class="header__account">
            <div class="header__account-value">
              {{ item.value }}{{ currency }}
            </div>
            <div class="header__account-label">
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="header__buttons">
          <NuxtLink to="/cabinet/wallet/replenish" class="button-mode-3 button-mode-3_highlighted button-mode-3_medium button-mode-3_align_center header__button">
            ПОПОЛНИТЬ
          </NuxtLink>
          <NuxtLink to="/cabinet/wallet/withdrawal" class="button-mode-3 button-mode-3_highlighted button-mode-3_medium button-mode-3_align_center header__button">
            ВЫВЕСТИ
          </NuxtLink>
        </div>
      </div>
      <CustomTable :headers="headers" :data="walletHistory" />
    </div>
  </div>
</template>
<script>
import CustomTable from '@/components/Common/CustomTable'
export default {
  components: {
    CustomTable
  },
  layout: 'cabinet-default',
  data () {
    return {
      headers: ['Дата', 'Сумма', 'Способ', 'Операция', 'Результат'],
      walletHistory: []
    }
  },
  async fetch () {
    const respWalletHistory = await this.$axios.$get(`/monetix/wallet_history/${this.$auth.user.id}/history/`)
    const formattedWalletHistoryArr = respWalletHistory.map((item) => {
      return {
        date: item.pay_time,
        value: item.amount + ' ' + this.getCurrencyName(item.currency),
        game_operation: this.getPaymentTypeName(item.type),
        lobby_method: this.getPaymentMethodName(item.method),
        gameID_result: this.getPaymentStatusName(item.status)
      }
    })
    // console.log('formattedWalletHistoryArr ', formattedWalletHistoryArr)
    formattedWalletHistoryArr.forEach((item) => {
      this.walletHistory.push(item)
    })
    this.walletHistory.sort((a, b) => new Date(b.date) - new Date(a.date))
  },
  computed: {
    balance () {
      return [
        {
          value: this.$auth.user.user_wallet.bonus_balance ? this.$auth.user.user_wallet.bonus_balance : 0,
          label: 'Бонусный счет'
        },
        {
          value: this.$auth.user.user_wallet.balance ? this.$auth.user.user_wallet.balance : 0,
          label: 'Личный счет'
        },
        {
          value: this.$auth.user.user_wallet.blocked_balance ? this.$auth.user.user_wallet.blocked_balance : 0,
          label: 'В блоке'
        }
      ]
    },
    currency () {
      // if (!this.wallet) {
      //   return ''
      // }

      switch (this.$auth.user.user_wallet.currency) {
        case 'RUB':
          return '₽'
        case 'USD':
          return '$'
        case 'KZT':
          return '₸'
        default:
          return ''
      }
    }
  },
  methods: {
    getPaymentMethodName (method) {
      switch (method) {
        case 'unify':
          return 'BinancePay'
        case 'card':
          return 'Банковская карта'
        case 'uzcard':
          break
      }
    },
    getCurrencyName (currency) {
      switch (currency) {
        case 'RUB':
          return '₽'
        case 'USD':
          return '$'
        case 'KZT':
          return '₸'
        default:
          return ''
      }
    },
    getPaymentStatusName (status) {
      switch (status) {
        case 'success':
          return 'Успешно'
        case 'decline':
          return 'Отклонено'
        default:
          return 'В процессе'
      }
    },
    getPaymentTypeName (type) {
      switch (type) {
        case 'purchase':
          return 'Пополнение'
        case 'payout':
          return 'Вывод'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.wallet {
  height: 100%;
}
.wallet__container {
  height: 100%;
  background: #141415;
  border-radius: 1.1rem;
  padding: 3.2rem 2.4rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.wallet__header {
  margin-bottom: 2rem;
}
.wallet__history {
  flex-grow: 1;
}
/*
  ============================================================
  Header
  ============================================================
*/
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header__accounts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 15rem));
  grid-gap: 0;
  justify-content: center;

  background: #1A1A1A;
  border-radius: .5rem;
  padding: 1rem 0;

  margin-bottom: 2rem;
}
.header__account {
  text-align: center;
  padding: 0 2.5rem;
  &-value {
    font-weight: 400;
    font-size: 3rem;
    line-height: 1;
    color: #FFFFFF;

    margin-bottom: .2rem;
  }
  &-label {
    font-weight: 300;
    font-variation-settings: 'wght' 300;
    font-size: 1.4rem;
    line-height: 121%;
    text-align: center;
    color: #606060;
  }

  &:not(:last-child) {
    position: relative;
    &:after {
      content: '';

      width: .2rem;
      height: 4.5rem;
      background: #373737;

      position: absolute;
      left: calc(100% - .1rem);
      top: 50%;
      transform: translateY(-50%);
    }
  }

}
.header__buttons {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 17rem));
  grid-gap: 1.4rem;
}
.header__button {
}
/*
  ============================================================
  History
  ============================================================
*/
.history {
  border: .1rem solid #323232;
  border-radius: .5rem;
  position: relative;
  overflow: hidden;
}
.history__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 19fr)) repeat(2, minmax(0, 15fr)) minmax(0, 28fr);
}
.history__head {
  background: #1F1F1F;
  border-radius: .5rem .5rem 0 0;
  position: sticky;
  top: 0;
}
.history__heading {

  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.6rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #878787;

  padding: .6rem .9rem .3rem;
  border-bottom: .12rem solid #323232;

  position: relative;
  &:after {
    content: '';

    position: absolute;
    width: .12rem;
    height: 100rem;
    top: 100%;
    left: calc(100% - .06rem);

    background: #323232
  }
}
.history__body {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.5rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #878787;
  overflow-y: auto;
  // overflow-x: hidden;
  max-height: 65vh;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #1C1C1C;
  }
  &::-webkit-scrollbar-thumb {
    background: #754FE0;
    border-radius:10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
.history-line {
  &__cell {
    padding: .5rem .8rem;
  }
}
</style>
