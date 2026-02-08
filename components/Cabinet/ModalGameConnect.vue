<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .game

    h2.game__title(v-html="title")
    .game__subtitle {{ subtitle }}

    .game__banner
      img(src="/images/redesign/connect-game-decoration.png" alt="").game__banner-image

    .game__buttons
      a(:href="steamLink").button-mode-3.button-mode-3_highlighted.game__button.game__button Подключить steam
      button(@click="$emit('close')").button-mode-3.button-mode-3_highlighted.game__button Закрыть

    .game__footer
      .game__footer-text Проблемы с подключением игры?
      a(href="#").game__footer-link Обратиться в службу поддержки
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Подключить <span>ваши игры</span>'
    },
    subtitle: {
      type: String,
      default: 'Подключите свою учетную запись, чтобы начать играть в Dota 2'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    steamLink () {
      return `${process.env.api2Url}/auth/steam?token=${this.$auth.$storage.getUniversal('_token.local')}`
    }
  }

}
</script>

<style lang="scss" scoped>

.game {
  margin: 0 auto;

  width: 91rem;

  background: #171717;
  border: .1rem solid #282828;
  border-radius: .8rem;

  // overflow: hidden;
  padding: 2.4rem 2.4rem 3.2rem;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: auto;
  }
}
.game__title {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 2rem;
  line-height: 120%;
  text-align: center;
  color: #FFFFFF;
  text-transform: uppercase;

  margin-bottom: .4rem;

  ::v-deep span {
    color: #754FE0;
  }
}

.game__subtitle {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.1rem;
  line-height: 190%;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: 2.4rem;
}
.game__banner {
  width: 36.5rem;
  height: 11rem;

  background: #272727;
  border-radius: .7rem;
  position: relative;

  margin-bottom: 1.2rem;

  &-image {
    width: 22.8rem;
    height: 14.4rem;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
}
.game__buttons {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 18rem));
  justify-content: center;
  grid-gap: 1.2rem;

  margin-bottom: 1.5rem;
}
.game__button {
  justify-content: center;
  text-align: center;
  padding: 1rem;
  line-height: 1;
}
.game__footer {
  &-text {
    font-weight: 350;
    font-variation-settings: 'wght' 350;
    font-size: 1.1rem;
    line-height: 1;
    color: #8A8A8A;
    text-align: center;

    margin-bottom: 1em;
  }
  &-link {
    font-weight: 350;
    font-variation-settings: 'wght' 350;
    font-size: 1.1rem;
    line-height: 1;
    color: #FFFFFF;
    text-align: center;
  }
}
</style>
