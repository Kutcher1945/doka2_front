<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .games
    .games__list
      GameCard(
        v-for="(game, index) in games"
        :class="['games__item', 'games__item-' + (index+1)]"
        :key="index"
        :image="game.isConnected ? game.image : game.image_inactive"
        :icon="game.icon"
        :name="game.name"
        :is-connected="game.isConnected"
        :in-dev="game.inDev"

        @close="$emit('close')"
      )
    button.button-mode-3.button-mode-3_highlighted.games__button(
      @click.prevent="$emit('close')"
    ) Закрыть
</template>

<script>
import GameCard from '@/components/Cabinet/GameCard.vue'

export default {
  components: {
    GameCard
  },
  data () {
    return {
      games: [
        {
          image: 'redesign/dota.png',
          image_inactive: 'redesign/dota_wb.png',
          icon: 'redesign/game-dota',
          name: 'Dota 2',
          isConnected: false
        },
        {
          image: 'redesign/lol.png',
          image_inactive: 'redesign/lol_wb.png',
          icon: 'redesign/game-lol',
          name: 'LOL',
          isConnected: false,
          inDev: true
        },
        {
          image: 'redesign/cs.png',
          image_inactive: 'redesign/cs_wb.png',
          icon: 'redesign/game-cs',
          name: 'CS:GO',
          isConnected: false,
          inDev: true
        },
        {
          image: 'redesign/pubg.png',
          image_inactive: 'redesign/pubg_wb.png',
          icon: 'redesign/game-pubg',
          name: 'PUBG',
          isConnected: false,
          inDev: true
        },
        {
          image: 'redesign/valorant.png',
          image_inactive: 'redesign/valorant_wb.png',
          icon: 'redesign/game-valorant',
          name: 'Valorant',
          isConnected: false,
          inDev: true
        }
      ],
      testDotaStatus: false
    }
  },
  async mounted () {
    const checkSteam = await this.$axios.$get('/auth/check_user/', {
      params: {
        userID: this.$auth.user.id
      }
    })

    this.games[0].isConnected = JSON.parse(checkSteam).success
  }
}
</script>

<style lang="scss" scoped>
.modal__close-space {
}
.games {
  margin: 0 auto;

  width: 91rem;

  background: #171717;
  border: .1rem solid #282828;
  border-radius: .8rem;

  // overflow: hidden;
  padding: 5.5rem 2rem 3.2rem;

  position: relative;

  @media screen and (max-width: 767px){
    width: auto;
    overflow: auto;
    height: 100vh;
  }
}
.games__list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 13rem));
  grid-gap: 3.6rem;
  justify-content: center;

  margin-bottom: 3rem;

  @media screen and (max-width: 767px){
    grid-template-columns: auto auto;
  }
}
.games__item {
  &-1 {

  }
  &-2 {
    ::v-deep .game__image {
      transform: none;
      left: 0;
    }
  }
  &-3 {
    ::v-deep .game__image {
      transform: none;
      left: 0;
    }
  }
  &-4 {
    ::v-deep .game__image {
      transform: none;
      left: 0;
    }
  }
  &-5 {
    ::v-deep .game__image {
      transform: none;
      left: auto;
      right: 0;
    }
  }
}
.games__button {
  width: 13rem;
  justify-content: center;
  margin: 0 auto;
}
</style>
