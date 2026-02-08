<template lang="pug">
.community_carousel
  button.community_carousel__navigation.community_carousel__navigation-prev(
    @click.prevent="slidePrev"
  )
    svg-icon(name="redesign/arrow-1").community_carousel__navigation-icon
  button.community_carousel__navigation.community_carousel__navigation-next(
    @click.prevent="slideNext"
  )
    svg-icon(name="redesign/arrow-1").community_carousel__navigation-icon
  Hooper(
    :itemsToShow="1"
    :itemsToSlide="1"
    :wheelControl="false"
    :infiniteScroll="true"
    :transition="200"

    ref="community_carousel"
  )
    Slide(v-for="i in 3", :key="i")
      .slide
        img(src="/images/redesign/telega_banner.png" alt="").slide__decoration

        h2.slide__title
          | Добро пожаловать на
          = " "
          br
          span.slide__title-highlighted Сybert
        p.slide__text
          | Что-о-о?! Опять раздача? Русик Альварес опять разашелся, Сайберовцы! На этот раз у нас
          = " "
          span.bold 1000
          = " "
          | бесплатных имморталов!
        button.button-mode-3.button-mode-3_highlighted.slide__button(
          @click="showGames()"
        ) Подробнее
          svg-icon(name="redesign/arrow-2").slide__button-icon
        hooper-pagination(slot="hooper-addons")

</template>

<script>
import {
  Hooper,
  Slide,
  Pagination as HooperPagination
} from 'hooper'
import 'hooper/dist/hooper.css'
import ModalGames from './ModalGames'

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination
  },
  methods: {
    slidePrev () {
      this.$refs.community_carousel.slidePrev()
    },
    slideNext () {
      this.$refs.community_carousel.slideNext()
    },
    showGames () {
      this.$emit('close')
      this.$modal.show(
        ModalGames,
        {
        },
        {},
        {}
      )
    }
  }
}
</script>

<style lang="scss" scoped>

.community_carousel {
  position: relative;
  // z-index: 6; // over header (z-index: 5)
}
.community_carousel__navigation {
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);

  width: 1.3rem;
  height: 1.3rem;
  background: #494949;
  border-radius: 50%;

  &-icon {
    width: 1.2rem;
    height: 1.2rem;
    --play-2-color: #373E65;
    --play-2-background-color: #FFFFFF;
  }

  &-prev {
    left: .8rem;
    .community_carousel__navigation-icon {
      transform: rotate(90deg);
    }
  }
  &-next {
    right: .8rem;
    .community_carousel__navigation-icon {
      transform: rotate(-90deg);
    }
  }
}
.community_carousel ::v-deep .hooper {
  //height: 16.8rem + 1.4rem + 1rem;
  height: 20.5rem;
}
.community_carousel ::v-deep .hooper-list {
  overflow: visible;
}
.community_carousel ::v-deep {
  .hooper-slide {
    opacity: 0;
    transition: opacity .2s;
  }
  .hooper-slide.is-active {
    opacity: 1;
  }
}
.community_carousel ::v-deep .hooper-pagination {
  bottom: 0;
  padding: 0;
  line-height: 0;
  position: static;
  transform: none;
}
.community_carousel ::v-deep .hooper-indicator {
  width: .65rem;
  height: .65rem;
  background: #494949;
  border-radius: 50%;
  margin: 0 .35rem;
  &.is-active {
    background: #C8C8C8;
  }
}

.slide {
  border-radius: 1.1rem;
  background-image: url(/images/redesign/carousel-background.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left center;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  height: 25.5rem;

  padding: 0 2rem 0;
  padding-left: 50.7rem;
  position: relative;
}
.slide__decoration {
  width: 50.7rem;
  height: 28.2rem;

  position: absolute;
  right: 0;
  bottom: 0;
}
.slide__title {
  font-weight: 300;
  font-variation-settings: 'wght' 300, 'wdth' 87.5;
  font-size: 2rem;
  line-height: 120%;
  color: #FFFFFF;

  &-highlighted {
    //font-weight: 700;
    font-variation-settings: 'wght' 700;
    font-size: 4.7rem;
    line-height: 119%;
    letter-spacing: 0.05em;
    color: #754FE0;
    text-transform: uppercase;
  }
}
.slide__text {
  //font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.4rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #525F63;

  margin-bottom: 1.2rem;

  .bold {
    //font-weight: 700;
    font-variation-settings: 'wght' 700;
    color: #D1D1D1;
  }
}
.slide__button {
  width: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1.2rem;

  &-icon {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: .2rem;
  }
}
</style>
