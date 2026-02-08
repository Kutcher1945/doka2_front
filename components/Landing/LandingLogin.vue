<template lang="pug">
  .first-screen

    video#fs-video.first-screen__video(autoplay, muted, loop, v-show="testVideoToggle")
      source(src="/ready_2.mp4" type="video/mp4")

    .header
      .container.header__container
        .header__logo
          svg-icon(name="redesign/logo-short").header__logo-image
        .header__panel
          .header__title
            span(@click="testVideoToggle = !testVideoToggle" style="cursor: pointer")
            span.highlighted
            |

    .container.first-screen__container
      .first-screen__buttons
        button.index-button.first-screen__button(@click.prevent="showSingIn") Вход
        button.index-button.first-screen__button(@click.prevent="showSingUp") Регистрация

</template>

<script>
import ModalSignIn from '@/components/Landing/ModalSingIn'
import ModalSignUp from '@/components/Landing/ModalSignUp'

export default {
  name: 'LandingLogin',
  components: { ModalSignIn, ModalSignUp },
  data() {
    return {
      testVideoToggle: true
    }
  },
  mounted () {
    switch (this.$route.hash) {
      case '#sign-in':
        this.showSingIn()
        break
      case '#sign-up':
        this.showSingUp()
        break
      default:
        break
    }
  },
  methods: {
    showSingIn () {
      this.$modal.show(
        ModalSignIn,
        {
        },
        {},
        {}
      )
    },
    showSingUp () {
      this.$modal.show(
        ModalSignUp,
        {
        },
        {},
        {}
      )
    },
    gamePlay () {
      this.showSingUp()
    },
    sendProposal () {
      console.log('Send proposal')
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
  Header
  ============================================================
*/
.header {

}
.header__container {

}
.header__logo {
  display: flex;
  justify-content: center;
  padding: 2rem 0;

  &-image {
    width: 8rem;
    height: 8rem;
    filter: drop-shadow(0 0 20px rgba(141, 94, 244, 0.5));
    transition: transform 0.3s ease, filter 0.3s ease;

    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 30px rgba(141, 94, 244, 0.8));
    }
  }
}
.header__panel {
  position: relative;
  padding-top: 1.2rem;
  &:before {
    content: '';

    height: .3rem;
    width: 100%;

    position: absolute;
    left: 0;
    top: -.15rem;

    background: linear-gradient(90deg, rgba(217, 217, 217, 0) 0%, #D9D9D9 51.67%, rgba(217, 217, 217, 0) 100%);
  }
}
.header__title {
  font-family: 'ALISEO', sans-serif;
  font-size: 7.6rem;
  line-height: 110%;
  letter-spacing: 0.005em;
  color: rgba(255, 255, 255, .94);
  text-align: center;

  .highlighted {
    font-family: 'Noisy Walk', sans-serif;
    font-size: 23rem;
    line-height: 1;
    letter-spacing: 0.005em;
    color: #B999FD;
    text-shadow: 0 0 2.3rem #4200FF, 0 0 22.8rem rgba(219, 0, 255, 0.36);

    margin: 0 4rem;
  }
}
/*
  ============================================================
  First Screen
  ============================================================
*/
.first-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 0;

  background-image: url(/images/redesign/landing/background-2.png);
  background-repeat: repeat-x;
  background-position: center center;
  background-size: auto 100%;

  overflow: hidden;
}
.first-screen__video {
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  //max-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  z-index: -10;

  video {
    min-width: 100%;
    min-height: 100%;
  }
}
.first-screen__container {
  flex-grow: 1;

  display: flex;
  align-items: flex-end;
  padding-bottom: 2.4rem;
}
.first-screen__buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 3rem;
  background: rgba(20, 20, 21, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
  }
}
.first-screen__button {
  min-width: 20rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
}
</style>
