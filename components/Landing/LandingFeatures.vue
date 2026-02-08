<template lang="pug">
  .features.select-none
    .container
      h2.features__title С нами ты получишь
      .features__content
        .feature.feature-1
          .feature__container
            .feature__content
              h4.feature__title Рейтинг
              p.feature__text Справедливую рейтинговую систему - чтобы игра была честной наша система  подбирает противников, равных вам по скиллу.
          img(src="/images/redesign/landing/ftr-1.png" alt="").feature__decoration.select-none
        .feature.feature-2
          .feature__container
            .feature__content
              h4.feature__title Контроль
              p.feature__text Контроль игры - Наши беспристрастные ребята из службы поддержки обработают каждую жалобу и дадут объективный бан читерам, бустерам и руинерам. Мы заботимся о том, чтобы каждая игра была прозрачной и комфортной.
          img(src="/images/redesign/landing/ftr-2.png" alt="").feature__decoration.select-none
        .feature.feature-3
          .feature__container
            .feature__content
              h4.feature__title Бонусы
              p.feature__text Мы поддерживаем активных пользователей и поощряем их бонусами и подарками. На нашей платформе можно получить бонусы за регистрацию, за пополнение баланса, реферальный бонус и многое другое
          img(src="/images/redesign/landing/ftr-3.png" alt="").feature__decoration.select-none
        .feature.feature-4
          .feature__container
            .feature__content
              h4.feature__title Верификация
              p.feature__text Каждый наш пользователь проходит специальное подтверждение личности, которое не только не позволяет создавать множество акаунтов одному пользователю, но и не пропускает мошенников
          img(src="/images/redesign/landing/ftr-4.png" alt="").feature__decoration.select-none
        .feature.feature-5
          .feature__container
            .feature__content
              h4.feature__title Надёжный вывод
              ul.feature__list
                li.feature__list-item
                  img(src="/images/redesign/landing/visa.png").feature__list-image.select-none
                li.feature__list-item
                  img(src="/images/redesign/landing/mastercard.png").feature__list-image.select-none
                li.feature__list-item
                  img(src="/images/redesign/landing/mir.png").feature__list-image.select-none
          img(src="/images/redesign/landing/ftr-5.png" alt="").feature__decoration.select-none

      .features__button
        button.index-button(@click.prevent="showSingUp") Создать аккаунт

</template>

<script>
import ModalSignUp from '@/components/Landing/ModalSignUp'

export default {
  name: 'LandingFeatures',
  components: {
    ModalSignUp
  },
  methods: {
    showSingUp () {
      this.$modal.show(
        ModalSignUp,
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
.index-button {
  cursor: pointer;
  padding: 1.4rem 4.8rem;

  font-weight: 600;
  font-size: 2.1rem;
  line-height: 119%;
  color: #FFFFFF;
  text-align: center;

  background: linear-gradient(135deg, #8D5EF4 0%, #B999FD 100%);
  border-radius: 1.2rem;
  border: none;

  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(141, 94, 244, 0.4),
              0 8px 40px rgba(141, 94, 244, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(141, 94, 244, 0.5),
                0 12px 50px rgba(141, 94, 244, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
}
/*
  ============================================================
  Features
  ============================================================
*/
.features {
  margin-bottom: 14.5rem;
}
.features__title {
  font-family: 'Colus', sans-serif;
  font-size: 7rem;
  line-height: 124%;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 12rem;

  background: linear-gradient(135deg, #FFFFFF 0%, #B999FD 50%, #8D5EF4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 12rem;
    height: 0.4rem;
    background: linear-gradient(90deg, transparent, #8D5EF4, transparent);
    border-radius: 2px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 48px;
  }
}
.features__content {
  margin-bottom: 10rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 32px;
  }
}
.features__button {
  text-align: center;
  position: relative;
  z-index: 1;
}

.feature__title {
  font-family: 'Colus', sans-serif;
  font-size: 2.8rem;
  line-height: 125%;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: .6rem;
}
.feature__text {
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 120%;
  color: #FFFFFF;
  text-align: center;
}

.feature {
  position: relative;
  z-index: 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);

    .feature__decoration {
      transform: scale(1.05);
      filter: drop-shadow(0 10px 30px rgba(141, 94, 244, 0.3));
    }
  }
}
.feature__container {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  transition: all 0.3s ease;
}
.feature__list {
  display: grid;
  grid-template-columns: repeat(3, 9.6rem);
  grid-gap: 6.4rem;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    grid-gap: 16px;
  }
}
.feature__list-image {
  width: 9.6rem;
  height: 3.6rem;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  @media only screen and (max-width: 600px) {
    width: auto;
  }
}

.feature__decoration {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.feature-1 {
  width: 68.1rem;
  height: 28.6rem;

  margin-bottom: 7.5rem;
  @media only screen and (max-width: 600px) {
    width: auto;
    height: auto;
    //border: 1px solid red;
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 100px;
  }

  .feature__container {
    width: 100%;
    height: 100%;
    background-image: url(/images/redesign/landing/ftr-1-box.png);
    @media only screen and (max-width: 600px) {
      background: radial-gradient(44.8% 51.3% at 64.63% 100%, rgba(0, 198, 127, 0.24) 0%, rgba(24, 24, 24, 0) 100%), rgba(43, 43, 43, 0.5);
      backdrop-filter: blur(3.5px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 15px;
      padding: 16px;
    }
  }
  .feature__content {
    width: 28.5rem;
    position: absolute;
    right: 5%;
    top: 12.5%;
    @media only screen and (max-width: 600px) {
      position: initial;
      width: auto;
    }
  }
  .feature__decoration {
    width: 64.5rem;
    height: 45.5rem;

    position: absolute;
    top: -3rem;
    left: calc(100% - (10.0rem));
    z-index: -1;
    @media only screen and (max-width: 600px) {
      width: auto;
      height: auto;
      position: initial;
      transform: translateY(20px);
    }
  }
}
.feature-2 {
  width: 74.6rem;
  height: 30rem;
  margin-left: auto;

  margin-bottom: 0;
  @media only screen and (max-width: 600px) {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 100px;
  }

  .feature__container {
    width: 100%;
    height: 100%;
    background-image: url(/images/redesign/landing/ftr-2-box.png);
    left: 8%;
    @media only screen and (max-width: 600px) {
      position: initial;
      background: radial-gradient(53.85% 73.32% at 28.37% 100%, rgba(255, 1, 1, 0.64) 0%, rgba(24, 24, 24, 0) 100%), rgba(72, 72, 72, 0.22);
      backdrop-filter: blur(12.5px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 15px;
      padding: 16px;
    }
  }
  .feature__content {
    width: 37rem;
    position: absolute;
    left: 5%;
    top: 15%;
    @media only screen and (max-width: 600px) {
      position: initial;
      width: auto;
    }
  }
  .feature__decoration {
    width: 50.9rem;
    height: 51.4rem;

    position: absolute;
    top: -12.5rem;
    right: calc(100% - 18rem);
    z-index: -1;
    @media only screen and (max-width: 600px) {
      width: auto;
      height: auto;
      position: initial;
      transform: translateY(20px);
    }
  }
}
.feature-3 {
  width: 56rem;
  height: 29rem;

  margin-bottom: 10rem;
  @media only screen and (max-width: 600px) {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 100px;
  }

  .feature__container {
    width: 100%;
    height: 100%;
    background-image: url(/images/redesign/landing/ftr-3-box.png);
    left: 20%;
    @media only screen and (max-width: 600px) {
      position: initial;
      background: radial-gradient(45.21% 86.73% at 50.07% 100%, rgba(198, 119, 0, 0.61) 0%, rgba(24, 24, 24, 0) 100%), rgba(72, 72, 72, 0.22);
      backdrop-filter: blur(12.5px);
      /* Note: backdrop-filter has minimal browser support */
      padding: 16px;
    }
  }
  .feature__content {
    width: 46rem;
    position: absolute;
    left: 14%;
    top: 35%;
    @media only screen and (max-width: 600px) {
      position: initial;
      width: auto;
    }
  }
  .feature__decoration {
    width: 55.9rem;
    height: 50.4rem;

    position: absolute;
    top: -10rem;
    left: calc(100% + 0rem);
    z-index: -1;
    @media only screen and (max-width: 600px) {
      width: auto;
      height: auto;
      position: initial;
      transform: translateY(10px);
    }
  }
}
.feature-4 {
  width: 57.7rem;
  height: 19.5rem;
  margin-left: auto;

  margin-bottom: 7.5rem;
  @media only screen and (max-width: 600px) {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 100px;
  }

  .feature__container {
    width: 100%;
    height: 100%;
    background-image: url(/images/redesign/landing/ftr-4-box.png);
    left: -20%;
    @media only screen and (max-width: 600px) {
      position: initial;
      background: radial-gradient(37.05% 96.71% at 98.44% -30.84%, rgba(13, 13, 13, 0.76) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(72.62% 87.72% at 48.37% 100%, #332FE2 0%, rgba(24, 24, 24, 0) 100%), rgba(29, 29, 29, 0.59);
      backdrop-filter: blur(12.5px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 15px;
      padding: 16px;
    }
  }
  .feature__content {
    width: 46rem;
    position: absolute;
    left: 10%;
    top: 15%;
    @media only screen and (max-width: 600px) {
      position: initial;
      width: auto;
    }
  }
  .feature__decoration {
    width: 40.5rem;
    height: 45.8rem;

    position: absolute;
    top: -17.5rem;
    right: calc(100% + 8.5rem);
    z-index: -1;
    @media only screen and (max-width: 600px) {
      width: auto;
      height: auto;
      position: initial;
      transform: translateY(20px);
    }
  }
}
.feature-5 {
  width: 50.5rem;
  height: 19.1rem;
  @media only screen and (max-width: 600px) {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column-reverse;
  }
  .feature__container {
    width: 100%;
    height: 100%;
    background-image: url(/images/redesign/landing/ftr-5-box.png);
    left: 32%;
    @media only screen and (max-width: 600px) {
      //background-image: none;
      position: initial;
      background: radial-gradient(47.67% 100% at 49.19% 100%, rgba(143, 0, 255, 0.24) 0%, rgba(24, 24, 24, 0) 100%), rgba(72, 72, 72, 0.23);
      backdrop-filter: blur(12.5px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 15px;
      padding: 16px;
    }
  }
  .feature__content {
    width: 41.6rem;
    position: absolute;
    left: 10%;
    top: 15%;
    @media only screen and (max-width: 600px) {
      position: initial;
      width: auto;
    }
  }
  .feature__title {
    margin-bottom: 2.4rem;
  }
  .feature__decoration {
    width: 48.9rem;
    height: 45rem;

    position: absolute;
    top: -15.5rem;
    left: calc(100% - (-12.7rem));
    z-index: -1;
    @media only screen and (max-width: 600px) {
      width: auto;
      height: auto;
      position: initial;
      transform: translateY(9px);
    }
  }
}
</style>
