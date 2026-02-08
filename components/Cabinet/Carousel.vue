<template lang="pug">
.carousel
  Hooper(
    :itemsToShow="1"
    :itemsToSlide="1"
    :wheelControl="false"
    :infiniteScroll="true"
    :transition="200"
    ref="carousel"
  )
    Slide
      .slide.slide-2
        img(src="/images/redesign/carousel-decoration-2.png" alt="").slide__decoration
        .slide-content
          h2.slide__title
            | Добро пожаловать на бета-тест CyberT
            = " "
          .slide-action
            a.button-mode-3.button-mode-3_tiny.button-mode-3_highlighted.slide__button(
              href="#"
            ) Подробнее
              svg-icon(name="redesign/arrow-2").slide__button-icon
            hooper-pagination(slot="hooper-addons")
    Slide
      .slide.slide-1
        img(src="/images/redesign/carousel-decoration.png" alt="").slide__decoration
        .slide-content
          h2.slide__title
            | Добро пожаловать на
            = " "
            .slide-action
              a.button-mode-3.button-mode-3_tiny.button-mode-3_highlighted.slide__button(
                href="#"
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
      this.$refs.carousel.slidePrev()
    },
    slideNext () {
      this.$refs.carousel.slideNext()
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
.carousel {
  position: relative;
  // z-index: 6; // over header (z-index: 5)
}
.carousel__navigation {
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
    .carousel__navigation-icon {
      transform: rotate(90deg);
    }
  }
  &-next {
    right: .8rem;
    .carousel__navigation-icon {
      transform: rotate(-90deg);
    }
  }
}
.carousel ::v-deep .hooper {
  //height: 16.8rem + 1.4rem + 1rem;
  height: 20.5rem;
}
.carousel ::v-deep .hooper-list {
  overflow: visible;
  @media (max-width: 767px){
    overflow: hidden;
  }
}
.carousel ::v-deep {
  .hooper-slide {
    opacity: 0;
    transition: opacity .2s;
  }
  .hooper-slide.is-active {
    opacity: 1;
  }
}
.carousel ::v-deep .hooper-pagination {
  bottom: 0;
  padding: 0;
  line-height: 0;
  position: static;
  transform: none;
  justify-content: center;
}
.carousel ::v-deep .hooper-indicator {
  width: .65rem;
  height: .65rem;
  background: #494949;
  border-radius: 50%;
  margin: 0 .35rem;
  &.is-active {
    background: #C8C8C8;
  }
}
/*
  ============================================================
  Slides
  ============================================================
*/
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

  height: 20.5rem;

  padding: 0 2rem 0;
  //padding-left: 50.7rem;
  position: relative;
}

.slide-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0 14px 0;
  height: 100%;
  width: 100%;
  position: initial;
  @media (max-width: 767px){
    align-items: flex-end;
    justify-content: flex-end;
    gap: 15px;
    position: relative;
  }
}
.slide__decoration {
  position: absolute;
  left: 0;
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
  color: #8A8A8A;

  margin-top: -.6rem;
  margin-bottom: 1.2rem;

  .bold {
    //font-weight: 700;
    font-variation-settings: 'wght' 700;
    color: #D1D1D1;
  }
}
.slide__button {
  //width: 22rem;
  padding: 0 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 220px;
  width: 100%;
  margin-bottom: 1.2rem;

  &-icon {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: .2rem;
  }
}
@media screen and (max-width: 1440px) {
  .slide__title {
    font-size: 1.8rem;

    &-highlighted {
      font-size: 3.2rem;
    }
  }
  .slide__text {
    font-size: 1.2rem;

    margin-top: 0;
    //margin-bottom: 1.2rem;
  }
}

.slide-1 {
  padding-left: 50.7rem;

  @media (max-width: 767px) {
    padding-left: 0;
  }
  .slide__decoration {
    width: 50.7rem;
    height: 28.2rem;
  }

  @media screen and (min-width: 1390px) {
    padding-left: 36rem;
    .slide__decoration {
      //$koef: 1.4;
      //width: 50.7rem / $koef;
      //height: 28.2rem / $koef;

      width: 36.2rem;
      height: 20.1rem;
    }
  }
}
.slide-2 {
  padding-left: 36rem;

  .slide__decoration {
    width: 34.8rem;
    height: 26.1rem;

    left: 2.5rem;
  }

  @media (max-width: 767px) {
    padding-left: 0;
  }

  @media screen and (min-width: 1390px) {
    padding-left: 28rem;
    .slide__decoration {
      //$koef: 1.25;
      //width: 34.8rem / $koef;
      //height: 26.1rem / $koef;

      width: 27.8rem;
      height: 20.8rem;

      left: 0;
    }
  }

}
</style>
