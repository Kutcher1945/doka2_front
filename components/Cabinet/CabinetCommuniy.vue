<template lang="pug">
  .cabinet-community
    .cabinet-index__container
      .steps
        h2.steps__title HOW TO USE
        p.steps__subtitle Руководство к использованию платформы CyberT
      .community
        h2.community__title COMMUNITY
        p.community__subtitle Следи за новостями, и не пропусти важную инфу!
        ul.community__links
          -
            var items = [
              {
                icon: 'soc-discord',
                name: 'Discord',
                link: 'discord.gg/6VSkWvRJ',
                preposition: 'в'
              },
              {
                icon: 'soc-telegram',
                name: 'Telegram',
                link: 't.me/cybertgames',
                preposition: 'в'
              },
              {
                icon: 'soc-twitch',
                name: 'Twitch',
                link: 'twitch.tv/cybertonline',
                preposition: 'в'
              },
              {
                icon: 'soc-vk',
                name: 'VKontakte',
                link: 'vk.com/cybert.online',
                preposition: ''
              },
              {
                icon: 'soc-tiktok',
                name: 'Tik-Tok',
                link: 'tiktok.com/@cybert.games',
                preposition: 'в'
              },
              {
                icon: 'soc-instagram',
                name: 'Instagram',
                link: 'instagram.com/cybertgames',
                preposition: 'в'
              },
              {
                icon: 'soc-youtube',
                name: 'Youtube',
                link: '',
                preposition: 'в'
              },
              {
                icon: 'soc-reddit',
                name: 'Reddit',
                link: '',
                preposition: 'на'
              }
            ]
          each item in items
            li
              if item.link
                <a href=#{item.link} target="_blank" class="community-link">
              else
                <div class="community-link">
                  .community-link__icon-wrapper
                    svg-icon(
                      name='redesign/' + item.icon
                      class=(item.link ? 'community-link__icon' : 'community-link__icon community-link__icon_inactive')
                    )
                  .community-link__content
                    .community-link__name(class=(item.link ? '' : 'community-link__name_inactive'))= (item.link ? "Мы " : "Скоро ") + item.preposition + " " + item.name
                    .community-link__link= item.link
              if item.link
                </a>
              else
                </div>

    div(style="display: flex; margin-top: 24px")
      button(@click="showWelcomeModal").button-mode-3.button-mode-3_highlighted Welcome Modal
      button(@click="showBonusModal" style="margin-left: 12px;").button-mode-3.button-mode-3_highlighted Service Modal
      button(@click="putTest" style="margin-left: 12px;").button-mode-3.button-mode-3_highlighted PUT test
</template>

<script>
import ModalService from '@/components/Cabinet/ModalService'

export default {
  name: 'CabinetCommunity',
  components: { ModalService },
  methods: {
    showWelcomeModal () {
      this.$modal.show(
        ModalService,
        {
          title: 'Добро пожаловать в CyberT!',
          text: 'Изучи сайт в 4 шага по нашей навигации',
          buttonText: 'Поехали!'
        },
        {},
        {}
      )
    },
    showBonusModal () {
      this.$modal.show(
        ModalService,
        {
          title: 'ВЫ ПОЛУЧИЛИ БОНУС В РАЗМЕРЕ 500 рублей',
          text: ' Внимание! Вы сможете вывести бонусные деньги только, когда удвоите бонусную сумму! Это условия нашей акции, надеемся на плодотворное сотрудничество!',
          buttonText: 'Cпасибо!'
        },
        {},
        {}
      )
    },
    async putTest () {
      const data = {
        steam_id: 666,
        dota_mmr: 667,
        connected_games: [{
          id: '1',
          name: 'dota'
        }]
      }
      console.log('Data: ', data)
      await this.$axios
        .$put('/auth/data/', {
          ...data
        })
        .then((res) => {
          console.log(res)
        })
    },
    async opendotaTest () {
      await this.$axios
        .get('https://api.opendota.com/api/players/89496240?api_key=abf7ea5f-6575-4434-be78-543e02d9814c', {
          headers: {
            changeOrigin: true,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Expose-Headers': '*'
          }
        })
        .then((res) => {
          console.log('Opendota response: ', res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.cabinet-index {

}
.cabinet-index-menu {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 2rem;
}
.cabinet-index__carousel {
  margin-bottom: 2.4rem;
}

.cabinet-index__container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 2.4rem;
}

/*
  ============================================================
  Steps
  ============================================================
*/
.steps {
  background: #141415;
  border-radius: 1.1rem;
  padding: 2rem 2.4rem;
}
.steps__title {
  //font-weight: 700;
  font-variation-settings: 'wght' 700;
  font-size: 2.6rem;
  line-height: 134.7%;
  letter-spacing: 0.03rem;
  color: #754FE0;
  text-align: center;
}
.steps__subtitle {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 13px;
  line-height: 120.2%;
  letter-spacing: 0.03rem;
  color: #8A8A8A;
  text-align: center;
}

/*
  ============================================================
  Community
  ============================================================
*/
.community {
  background: #141415;
  border-radius: 1.1rem;
  padding: 2.4rem;
}
.community__title {
  font-variation-settings: 'wght' 700;
  font-size: 2.6rem;
  line-height: 134.7%;
  letter-spacing: 0.03rem;
  color: #754FE0;
  text-align: center;
}
.community__subtitle {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.3rem;
  line-height: 120.2%;
  letter-spacing: 0.03rem;
  color: #8A8A8A;
  text-align: center;

  margin-bottom: 1.2rem;
}
.community__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1.4rem 1.8rem;
}
.community-link {
  display: flex;
  align-items: center;
  height: 4.5rem;

  background: #1F1F1F;
  border-radius: .5rem;
}
.community-link__icon-wrapper {
  flex: 0 0 auto;
  padding: 0 1.6rem;
  position: relative;
  &:after {
    content: '';

    width: .1rem;
    height: 3.8rem;
    background: #323232;

    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.community-link__icon {
  color: #754FE0;
  width: 2.6rem;
  height: 2.6rem;

  &_inactive {
    color: #525F63;
  }
}
.community-link__content {
  padding: 0 1.6rem;
}
.community-link__name {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 92.7%;
  letter-spacing: 0.03rem;
  color: #FFFFFF;

  margin-bottom: .2rem;

  &_inactive {
    color: #525F63;
  }
}
.community-link__link {
  //font-weight: 300;
  font-variation-settings: 'wght' 300, 'wdth' 87.5;
  font-size: 1rem;
  line-height: 134.7%;
  letter-spacing: 0.03rem;
  color: #525F63;
}

</style>
