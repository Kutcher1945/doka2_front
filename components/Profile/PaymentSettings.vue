<template lang="pug">
  .settings__section
    h4.settings__title Настройка платежей
    .settings__list
      Integration(
        v-for="(integration, integration_index) in integrations.payment_system"
        :key="integration_index"
        v-bind="integration"
      )
</template>

<script>
import Integration from '@/components/Profile/Integration.vue'

export default {
  name: 'PaymentSettings',
  components: {
    Integration
  },
  data () {
    return {
      integrations: {
        payment_system: [
          {
            slug: 'visa',
            logo: 'redesign/profile/visa.svg',
            name: 'Visa',
            connected: false,
            wallet: '',
            walletType: true
          },
          {
            slug: 'Master Card',
            logo: 'redesign/profile/mc.svg',
            name: 'Master Card',
            wallet: '',
            connected: false,
            walletType: false
          },
          {
            slug: 'mir',
            logo: 'redesign/profile/mir.svg',
            name: 'МИР',
            wallet: '',
            connected: false,
            walletType: false
          },
          // {
          //   slug: 'qiwi',
          //   logo: 'redesign/profile/qiwi.svg',
          //   name: 'Qiwi',
          //   connected: false
          // },
          {
            slug: 'trc20',
            logo: 'redesign/profile/trc20.svg',
            name: 'TRC20',
            wallet: '',
            connected: false,
            walletType: false
          }
        ]
      }
    }
  },
  mounted () {
    this.getWalletData()
  },
  methods: {
    async getWalletData () {
      try {
        const respWalletData = await this.$axios.$get(`/monetix/user_account/${this.$auth.user.id}`)
        // console.log('respWalletData ', respWalletData)
        if (respWalletData) {
          switch (respWalletData.type) {
            case 'visa':
              this.integrations.payment_system[0].wallet = respWalletData.number
              this.integrations.payment_system[0].walletType = true
              this.integrations.payment_system[0].connected = true
              break
            case 'mastercard':
              this.integrations.payment_system[1].wallet = respWalletData.number
              this.integrations.payment_system[1].walletType = true
              this.integrations.payment_system[1].connected = true
              break
            case 'mir':
              this.integrations.payment_system[2].wallet = respWalletData.number
              this.integrations.payment_system[2].walletType = true
              this.integrations.payment_system[2].connected = true
              break
            case 'trc20':
              this.integrations.payment_system[3].wallet = respWalletData.number
              this.integrations.payment_system[3].walletType = true
              this.integrations.payment_system[3].connected = true
              break
            default:
              break
          }
        }
      } catch (e) {
        console.log('get wallet data, err ', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings__title {
  margin-bottom: 3.6rem;
  color: #fff;
}
.settings__list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 3rem;
}
</style>
