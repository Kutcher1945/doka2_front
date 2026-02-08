<template lang="pug">

.games
  .games__header

    .games__header-left
      h2.games__title Выбери игру и начни зарабатывать
      .games__subtitle На нашей платформе есть самые топовые игры
      .games-panel
        .games-panel__inner
          .games-panel__game(
            v-for="(game, index) in games"

            @click="carouselSlide(index)"
          )
            svg-icon(:name="game.icon" :class="'games-panel__game-icon-' + game.slug").games-panel__game-icon

    .game-about
      .game-about__header
        .game-about__name
          svg-icon(:name="'game-dota'").game-about__icon
          | {{ 'DOTA 2' }}
        .game-about__statistics
          .game-about__statistic
            .game-about__statistic-label Сейчас онлайн:
            .game-about__statistic-value {{ 1205 }} игроков
          .game-about__statistic
            .game-about__statistic-label Макс. стоимость комнаты:
            .game-about__statistic-value {{ 832 }}$
      p.game-about__text {{ '  Многопользовательская командная компьютерная игра в жанре MOBA, разработанная и изданная корпорацией Valve.' }}

  .games-carousel-controls
    .games-carousel-controls__arrow.games-carousel-controls__prev(
      @click.prevent="carouselSlide('prev')"
    )
      svg-icon(name="arrow-2").games-carousel-controls__arrow-icon
    .games-carousel-controls__arrow.games-carousel-controls__next(
      @click.prevent="carouselSlide('next')"
    )
      svg-icon(name="arrow-2").games-carousel-controls__arrow-icon

  .games__carousel
    Hooper(
      :itemsToShow="3"
      :itemsToSlide="1"
      :initialSlide="2"
      :centerMode="true"
      :wheelControl="false"
      :infiniteScroll="false"
      :transition="500"
      :mouseDrag="false"
      :touchDrag="false"

      ref="carousel"
    )
      Slide
        GameCard(slug="wot" @gamePlay="gamePlay")
      Slide
        GameCard(slug="cs" @gamePlay="gamePlay")
      Slide
        GameCard(slug="dota" @gamePlay="gamePlay")
      Slide
        GameCard(slug="lol" @gamePlay="gamePlay")
      Slide
        GameCard(slug="pubg" @gamePlay="gamePlay")

</template>

<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import GameCard from '@/components/Landing/GameCard.vue'

export default {
  components: {
    Hooper,
    Slide,
    GameCard
  },
  data () {
    return {
      games: [
        { slug: 'wot', icon: 'game-wot' },
        { slug: 'cs', icon: 'game-cs' },
        { slug: 'dota', icon: 'game-dota' },
        { slug: 'lol', icon: 'game-lol' },
        { slug: 'pubg', icon: 'game-pubg' }
      ]
    }
  },
  methods: {
    carouselSlide (direction) {
      if (direction === 'prev') {
        this.$refs.carousel.slidePrev()
      }
      if (direction === 'next') {
        this.$refs.carousel.slideNext()
      }

      this.$refs.carousel.slideTo(direction)
    },
    gamePlay () {
      this.$emit('gamePlay')
    }
  }
}
</script>

<style lang="scss" scoped>
.games {

}
.games__header {
  position: relative;

  display: flex;
  justify-content: space-between;

  margin-bottom: 3rem;
}
.games__header-left {

}
.games__title {
  font-weight: 500;
  font-size: 1.8rem;

  color: #FFFFFF;
  text-transform: uppercase;

  margin-bottom: 1.4rem;
}
.games__subtitle {
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 108.9%;
  color: #999999;

  margin-bottom: 2.2rem;
}
.games-panel {
  background: #413643;
  border-radius: 1.6rem;
  padding: 1rem 1.6rem;

  display: inline-block;

  &__inner {
    display: grid;
    grid-template-columns: 2.4rem 3.5rem 3.2rem 3.3rem 3rem;
    grid-gap: 2.2rem;
    align-items: center;
  }
}
.games-panel__game {
  cursor: pointer;
  &-icon {
    &-wot {
      width: 2.4rem;
      height: 3.3rem;
    }
    &-dota {
      width: 3.5rem;
      height: 3rem;
    }
    &-cs {
      width: 3.2rem;
      height: 3.2rem;
    }
    &-pubg {
      width: 3.3rem;
      height: 3.3rem;
    }
    &-lol {
      width: 3rem;
      height: 3.1rem;
    }
  }
}

.game-about {
  width: 55rem;
}
.game-about__header {
  display: flex;
  align-items: center;

  margin-bottom: 2.4rem;
}
.game-about__name {
  font-weight: 700;
  font-size: 3rem;
  color: #FFFFFF;

  display: flex;
  align-items: center;

  margin-right: 3.6rem;
}
.game-about__icon {
  flex: 0 0 auto;

  margin-right: 2rem;

  width: 3.2rem; // TODO: sizes for all 5 icons
  height: 2.8rem;
}
.game-about__statistics {
  margin-top: -.5rem;
}
.game-about__statistic {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);

  font-size: 1.6rem;
  line-height: 167.9%;
  color: #FFFFFF;

  &-label {
    font-weight: 700;
    color: #FFFFFF;
  }
  &-value {
    font-weight: 400;
    color: #8A8A8A;
  }
}
.game-about__text {
  font-family: 'Exo 2', sans-serif;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 167.9%;
  color: #999999;
}

.games-carousel-controls {

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 17rem;

  &__arrow {
    cursor: pointer;

    width: 3rem;
    height: 3rem;
    border-radius: .4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &-icon {
      width: 1.4rem;
      height: .8rem;
      color: #FFFFFF;
    }
  }

  &__prev {
    background: #B55A5A;

    margin-right: 15rem;

    .games-carousel-controls__arrow-icon {
      transform: rotate(90deg);
    }
  }
  &__next {
    background: #4E7DDC;
    .games-carousel-controls__arrow-icon {
      transform: rotate(-90deg);
    }
  }
}

.games__carousel {
  width: 30rem*3;
  height: 30rem;

  margin: 0 auto;

  //border: 1px solid red;

  //::v-deep .slick-track {
  //  width: fit-content !important;
  //}

  //::v-deep .card {
  //  margin: 0 auto;
  //  width: 100%;
  //}
  ::v-deep .hooper {
    height: 100%;
  }
  ::v-deep .hooper-list {
    overflow: visible;
  }
  ::v-deep .hooper-slide {
    //border: 1px solid blue;

    display: flex;
    align-items: center;
    justify-content: center;

    transform: translateX(25%) scale(.66);
    opacity: 0;
    transition: transform .5s, opacity .5s;

    &.is-active,
    &.is-prev,
    &.is-next {
      opacity: 1;
    }
    &.is-active:not(.is-current) {
      transform: scale(1);
    }
    &.is-current {
      transform: scale(1.33);
    }
    &.is-prev {
      transform: translateX(25%) scale(0.66);
    }
    &.is-next {
      transform: translateX(-25%) scale(0.66);
    }
    &.is-next ~ .hooper-slide {
      transform: translateX(-25%) scale(0.66);
    }
  }
}
</style>
