<template lang="pug">
.card(:class="'card_' + games[slug].slug")
  .card__decoration
    img(:src="'/images/' + games[slug].decoration" :alt="games[slug].name").card__decoration-image
  .card__panel
    .card__panel-left
      GameCardStars(:value="games[slug].stars").card__stars
      .card__players-counter
        .card__players-counter-number {{ games[slug].players }}
        div Players
    .card__logo
      svg-icon(:name="games[slug].logo" :class="'card__logo-icon-' + games[slug].slug").card__logo-icon
    .card__panel-right
      .card__name {{ games[slug].name }}
      button.card__play(@click="$emit('gamePlay')") Играть
</template>

<style lang="scss" scoped>

.card {
  height: 25rem;
  width: 27rem;
  //border: 1px solid red;

  //background: red;

  position: relative;
  z-index: 0;
}
.card__decoration {
  position: absolute;
  z-index: -1;
  &-image {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
}
.card__panel {
  position: absolute;
  z-index: 1;
  bottom: 5rem;
  left: 15%;

  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.card__panel-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card__stars {
  margin-bottom: .6rem;
}
.card__players-counter {
  width: 8rem;
  height: 3.7rem;

  background: #2D343E;
  border-radius: 1.5rem;

  font-family: 'Baloo 2', cursive;
  font-weight: 400;
  font-size: 1.1rem;
  // line-height: 73.4%;
  color: #FFFFFF;
  text-transform: uppercase;
  text-align: center;
  &-number {
    font-size: 2.4rem;
    color: #FFFFFF;
    margin-bottom: -.6rem;
  }
}
.card__logo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &-icon {
  }
}
.card__panel-right {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 8rem; // workaround for 'League of Legends game name. 8rem is enough to place button
}
.card__name {
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 121%;
  letter-spacing: -.1rem;
  color: #FFFFFF;

  margin-bottom: .6rem;
}
.card__play {
  width: 8.5rem;
  height: 3.7rem;

  background: #3CBAD6;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 .7rem 0 .9rem;

  font-family: 'Baloo 2', cursive;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 90.4%;
  color: #F2F2F2;

  &-icon {
    width: 2.4rem;
    height: 2.4rem;
    margin-left: .25rem;
  }
}

.card_wot {
  .card {
    //$koef: 1.33;
    //width: 18rem * $koef;
    //height: 17.5rem * $koef;
    width: 23.9rem;
    height: 23.2rem;
    &__decoration {
      left: calc(50% + 4.5rem);
      top: calc(50% - .5rem);
      transform: translate(-50%, -50%);
      &-image {
        width: 18rem; // 23.2rem * $koef;
        height: 25.6rem; // 19.3rem * $koef
      }
    }
    &__logo {
      left: 50%;
      &-icon-wot {
        width: 4.25rem; // 3.2rem * $koef;
        height: 5.9rem; // 4.5rem * $koef;
      }
    }
    &__panel {
      width: 23.2rem; // 17.5rem * $koef;
      left: 50%;
      transform: translateX(-50%);
      bottom: 1.8rem;
    }
    &__players-counter {
      background: #74C013;
    }
    &__play {
      background: #74C013;
    }
  }
}
.card_cs {
  .card {
    width: 23.5rem;
    height: 25rem;
    &__decoration {
      left: calc(50% - 2rem);
      top: calc(50% - 4.25rem);
      transform: translate(-50%, -50%);
      &-image {
        width: 26.7rem;
        height: 33.5rem;
      }
    }
    &__logo {
      left: calc(50% + 0rem);
      &-icon-cs {
        width: 6.8rem;
        height: 6.8rem;
      }
    }
    &__panel {
      width: 24rem;
      left: 50%;
      transform: translateX(-50%);
      bottom: 2.6rem;
    }
    &__name {
      margin-bottom: .3rem;
    }
    &__players-counter {
      background: #C65858;
    }
    &__play {
      background: #C65858;
    }
  }
}
.card_dota {
  .card {
    //$koef: 1.25;
    width:  25.2rem; // 31.5rem / $koef;
    height: 28rem; // 35rem / $koef;

    &__decoration {
      left: calc(50% + 0rem);
      top: calc(50% - 3.5rem);
      transform: translate(-50%, -50%);
      &-image {
        width: 30.1rem; // 37.7rem / $koef;
        height: 32rem; // 40rem / $koef;
      }
    }
    &__logo {
      left: 50%;
      &-icon-dota {
        width: 6.4rem; // 8rem / $koef;
        height: 5.5rem; // 6.9rem / $koef;
      }
    }
    &__panel {
      width: 25.6rem; // 32rem / $koef;
      bottom: 2.4rem; // 3rem / $koef;
      left: 50%;
      transform: translateX(-50%);
    }
    &__play {
      background: #465161;
    }
  }
}
.card_lol {
  .card {
    width: 23rem;
    height: 25rem;
    &__decoration {
      left: calc(50% - 0rem);
      top: calc(50% - 4rem);
      transform: translate(-50%, -50%);
      &-image {
        width: 28.1rem;
        height: 33.4rem;
      }
    }
    &__panel {
      width: 25rem;
      left: 50%;
      transform: translateX(-50%);
      bottom: 2.5rem;
    }
    &__logo {
      left: calc(50%);
      &-icon-lol {
        width: 6.6rem;
        height: 6.8rem;
      }
    }
    &__name {
      font-size: 1.4rem;
      white-space: nowrap;
    }
    &__players-counter {
      background: #3CBAD6;
      color: #FFFFFF;
    }
    &__play {
      background: #3CBAD6;
    }
  }
}
.card_pubg {
  //$koef: 1.33;
  .card {
    width: 19.9rem; // 15rem * $koef;
    height: 21.9rem; // 16.5rem * $koef;
    &__decoration {
      left: calc(50% + 3rem);
      top: calc(50% - 1rem);
      transform: translate(-50%, -50%);
      &-image {
        width: 28.1rem; // 21.2rem * $koef;
        height: 27.3rem; // 20.6rem * $koef;
      }
    }
    &__logo {
      left: calc(50%);
      &-icon-pubg {
        width: 6.1rem; // 4.6rem * $koef;
        height: 6.1rem; // 4.6rem * $koef;
      }
    }
    &__panel {
      width: 23.2rem; // 17.5rem * $koef;
      bottom: .25rem;
      left: 50%;
      transform: translateX(-50%);
    }
    &__players-counter {
      background: #D68F3C;
    }
    &__play {
      background: #D68F3C;
    }
    &__name {
      margin-bottom: .1rem;
    }
  }
}
</style>

<script>
import GameCardStars from '@/components/Landing/GameCardStars.vue'

export default {
  components: {
    GameCardStars
  },
  props: {
    slug: {
      type: String,
      default: 'wot'
    }
  },
  data () {
    return {
      games: {
        wot: {
          slug: 'wot',
          decoration: 'game-wot-background.png',
          stars: 4,
          players: 807,
          name: 'WOT',
          logo: 'game-wot'
        },
        cs: {
          slug: 'cs',
          decoration: 'game-cs-background.png',
          stars: 5,
          players: 7098,
          name: 'CS - GO',
          logo: 'game-cs'
        },
        dota: {
          slug: 'dota',
          decoration: 'game-dota-background.png',
          stars: 3,
          players: 2689,
          name: 'DOTA 2',
          logo: 'game-dota'
        },
        lol: {
          slug: 'lol',
          decoration: 'game-lol-background.png',
          stars: 5,
          players: 5480,
          name: 'League of Legends',
          logo: 'game-lol'
        },
        pubg: {
          slug: 'pubg',
          decoration: 'game-pubg-background.png',
          stars: 4,
          players: 1890,
          name: 'PUBG',
          logo: 'game-pubg'
        }
      }
    }
  }
}
</script>
