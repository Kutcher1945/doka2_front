<template lang="pug">
  .settings__section
    h4.settings__title Настройка cоц. сетей
    .settings__list
      Integration(
        v-for="(integration, integration_index2) in integrations.services"
        :key="integration_index2"
        v-bind="integration"
      )
</template>

<script>
import Integration from '@/components/Profile/Integration.vue'

export default {
  name: 'SocialSettings',
  components: {
    Integration
  },
  data () {
    return {
      integrations: {
        services: [
          {
            slug: 'twitch',
            logo: 'redesign/profile/twitch.svg',
            name: 'Twitch',
            connected: false
          },
          {
            slug: 'discord',
            logo: 'redesign/profile/discord.svg',
            name: 'Discord',
            connected: false
          },
          {
            slug: 'google',
            logo: 'redesign/profile/google.svg',
            name: 'Google',
            connected: false
          },
          {
            slug: 'telegram',
            logo: 'redesign/profile/tg.svg',
            name: 'Telegram',
            connected: false
          },
          {
            slug: 'vk',
            logo: 'redesign/profile/vk.svg',
            name: 'VK',
            connected: false
          }
        ]
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
