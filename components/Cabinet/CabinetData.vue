<template>
  <div>
    <CustomTable :headers="headers" :data="data" />
  </div>
</template>

<script>
import CustomTable from '../Common/CustomTable'

export default {
  name: 'CabinetData',
  components: {
    CustomTable
  },
  data () {
    return {
      headers: ['Дата', 'Сумма', 'Игра / Операция', 'Название лобби  / Способ', 'ID Игры / Результат'],
      data: []
    }
  },
  mounted () {
    this.addWalletHistory()
  },
  methods: {
    async addWalletHistory () {
      this.data.push({
        date: this.$auth.user.datetime_create,
        value: '',
        game_operation: 'Регистрация аккаунта ',
        lobby_method: '',
        gameID_result: ''
      })
      // this.walletHistory = await this.$axios.$get(`/monetix/wallet_history/${this.$auth.user.id}/history/`)
      const walletHistoryResp = await this.$axios.$get(`/monetix/wallet_history/${this.$auth.user.id}/history/`)
      // console.log('walletHistoryResp ', walletHistoryResp)

      const gameHistory = await this.$axios.$get('/dota/game_history/', {
        params: {
          id_user: this.$auth.user.id
        }
      })
      // -- wallet //
      const formattedWalletHistoryArr = walletHistoryResp
        .filter(item => item.amount)
        .map((item) => {
          return {
            date: item.pay_time,
            value: item.amount + ' ' + this.getCurrencyName(item.currency),
            game_operation: this.getPaymentTypeName(item.type),
            lobby_method: this.getPaymentMethodName(item.method),
            gameID_result: this.getPaymentStatusName(item.status)
          }
        })

      formattedWalletHistoryArr.forEach((item) => {
        this.data.push(item)
      })
      // -- history //
      const formattedGameHistory = gameHistory.map((game) => {
        return {
          date: game.finish_game,
          value: game.lobby.bet + ' ' + this.getCurrencyName(this.$auth.user.user_wallet.currency),
          game_operation: 'DOTA',
          lobby_method: game.lobby.name,
          gameID_result: game.lobby.is_block ? 'В блоке' : 'Завершена'
        }
      })
      // console.log('gameHistory', gameHistory)

      formattedGameHistory.forEach((item) => {
        this.data.push(item)
      })

      // сортировка массива по дате
      this.data.sort((a, b) => new Date(b.date) - new Date(a.date))

      // результат сортировки
      // console.log(this.data)
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
