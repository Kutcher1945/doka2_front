<template lang="pug">
  div
    .header
      .container.header__container
        .header__top
          a.header__logo(@click.prevent="scrollToTop")
            svg-icon(name="logo").header__logo-image

          // Desktop Navigation
          nav.header__nav.header__nav--desktop
            a.header__nav-item(@click.prevent="scrollToSection('prove')") Преимущества
            a.header__nav-item(@click.prevent="scrollToSection('features')") Возможности
            a.header__nav-item(@click.prevent="scrollToSection('steps')") Как начать

          // Desktop Auth Buttons
          .header__auth-buttons.header__auth-buttons--desktop
            button.index-button.header__button(@click.prevent="showSingIn") Вход
            button.index-button.header__button(@click.prevent="showSingUp") Регистрация

          // Mobile Menu Toggle
          button.header__mobile-toggle(@click="mobileMenuOpen = !mobileMenuOpen")
            span.header__mobile-toggle-line
            span.header__mobile-toggle-line
            span.header__mobile-toggle-line

        .header__panel

      // Mobile Menu
      .header__mobile-menu(:class="{ 'header__mobile-menu--open': mobileMenuOpen }")
        .header__mobile-menu-overlay(@click="mobileMenuOpen = false")
        .header__mobile-menu-content
          button.header__mobile-close(@click="mobileMenuOpen = false") ×

          nav.header__nav.header__nav--mobile
            a.header__nav-item(@click.prevent="scrollToSection('prove'); mobileMenuOpen = false") Преимущества
            a.header__nav-item(@click.prevent="scrollToSection('features'); mobileMenuOpen = false") Возможности
            a.header__nav-item(@click.prevent="scrollToSection('steps'); mobileMenuOpen = false") Как начать

          .header__auth-buttons.header__auth-buttons--mobile
            button.index-button.header__button(@click.prevent="showSingIn(); mobileMenuOpen = false") Вход
            button.index-button.header__button(@click.prevent="showSingUp(); mobileMenuOpen = false") Регистрация

    .first-screen

      video#fs-video.first-screen__video(autoplay, muted, loop, v-show="testVideoToggle")
        source(src="/ready_2.mp4" type="video/mp4")

</template>

<script>
import ModalSignIn from '@/components/Landing/ModalSingIn'
import ModalSignUp from '@/components/Landing/ModalSignUp'

export default {
  name: 'LandingLogin',
  components: { ModalSignIn, ModalSignUp },
  data() {
    return {
      testVideoToggle: true,
      mobileMenuOpen: false
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
      this.$modal.hideAll()
      this.$modal.show(
        ModalSignIn,
        {
        },
        {},
        {}
      )
    },
    showSingUp () {
      this.$modal.hideAll()
      this.$modal.show(
        ModalSignUp,
        {
        },
        {},
        {}
      )
    },
    scrollToSection (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10000;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5),
              0 1px 0 rgba(141, 94, 244, 0.2);

  @media only screen and (max-width: 768px) {
    backdrop-filter: blur(8px) saturate(130%);
    -webkit-backdrop-filter: blur(8px) saturate(130%);
  }
}

.header__container {
  padding: 1.6rem 0;
  transition: padding 0.3s ease;

  @media only screen and (max-width: 768px) {
    padding: 1.2rem 0;
  }
}
.header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

  @media only screen and (max-width: 768px) {
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 1.6rem;
  }
}
.header__logo {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10002;
  cursor: pointer;
  text-decoration: none;

  @media only screen and (max-width: 768px) {
    margin-left: 1.6rem;
  }

  @media only screen and (max-width: 480px) {
    margin-left: 1.2rem;
  }

  &-image {
    width: 18rem;
    height: 4rem;
    filter: drop-shadow(0 0 20px rgba(141, 94, 244, 0.5));
    transition: transform 0.3s ease, filter 0.3s ease;

    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 30px rgba(141, 94, 244, 0.8));
    }

    @media only screen and (max-width: 768px) {
      width: 14rem;
      height: 3rem;
    }

    @media only screen and (max-width: 480px) {
      width: 12rem;
      height: 2.5rem;
    }
  }
}
.header__auth-buttons {
  display: flex;
  gap: 1.6rem;

  &--desktop {
    @media only screen and (max-width: 1024px) {
      order: 2;
    }

    @media only screen and (max-width: 768px) {
      display: none;
    }
  }

  &--mobile {
    flex-direction: column;
    width: 100%;
  }
}
.header__button {
  font-family: 'Colus', sans-serif;
  font-weight: normal;
  font-size: 1.8rem;
  letter-spacing: 0.02rem;
  min-width: 14rem;
  padding: 1.2rem 3rem;

  &:first-child {
    background: transparent;
    border: 2px solid rgba(141, 94, 244, 0.6);
    box-shadow: 0 0 20px rgba(141, 94, 244, 0.2);

    &:hover {
      background: rgba(141, 94, 244, 0.1);
      border-color: rgba(141, 94, 244, 0.8);
      box-shadow: 0 0 30px rgba(141, 94, 244, 0.4);
    }
  }

  &:last-child {
    background: linear-gradient(135deg, #8D5EF4 0%, #B999FD 100%);
    border: 2px solid transparent;

    &:hover {
      box-shadow: 0 6px 30px rgba(141, 94, 244, 0.5),
                  0 12px 50px rgba(141, 94, 244, 0.3);
    }
  }

  @media only screen and (max-width: 768px) {
    flex: 1;
    min-width: auto;
    padding: 1.2rem 2rem;
    font-size: 1.6rem;
  }

  @media only screen and (max-width: 480px) {
    padding: 1rem 1.6rem;
    font-size: 1.4rem;
  }
}
.header__panel {
  position: relative;
  height: 0.2rem;
  width: 100%;
  background: linear-gradient(90deg, rgba(141, 94, 244, 0) 0%, rgba(141, 94, 244, 0.6) 50%, rgba(141, 94, 244, 0) 100%);
  margin-top: 2rem;

  @media only screen and (max-width: 768px) {
    margin-top: 1.6rem;
  }
}
.header__nav {
  display: flex;
  align-items: center;
  gap: 3.2rem;

  &--desktop {
    @media only screen and (max-width: 1024px) {
      gap: 2rem;
      order: 3;
      width: 100%;
      justify-content: center;
    }

    @media only screen and (max-width: 768px) {
      display: none;
    }
  }

  &--mobile {
    flex-direction: column;
    gap: 3.2rem;
    margin-bottom: 4rem;
  }
}
.header__nav-item {
  font-family: 'Colus', sans-serif;
  font-weight: normal;
  font-size: 2rem;
  line-height: 125%;
  letter-spacing: 0.02rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.4rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0.2rem;
    background: linear-gradient(90deg, #8D5EF4, #B999FD);
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover {
    color: #FFFFFF;

    &::after {
      width: 100%;
    }
  }

  @media only screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media only screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
}

// Mobile Menu Toggle (Hamburger)
.header__mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 3.2rem;
  height: 2.4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 10002;

  @media only screen and (max-width: 768px) {
    display: flex;
    margin-right: 1.6rem;
  }

  @media only screen and (max-width: 480px) {
    margin-right: 1.2rem;
  }

  &-line {
    width: 100%;
    height: 0.3rem;
    background: linear-gradient(90deg, #8D5EF4, #B999FD);
    border-radius: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(141, 94, 244, 0.4);
  }
}

// Mobile Menu
.header__mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10003;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;

  @media only screen and (min-width: 769px) {
    display: none;
  }

  &--open {
    opacity: 1;
    pointer-events: all;

    .header__mobile-menu-content {
      transform: translateX(0);
    }
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
  }

  &-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 85%;
    max-width: 40rem;
    background: linear-gradient(145deg, rgba(20, 20, 21, 0.98) 0%, rgba(30, 30, 35, 0.98) 100%);
    backdrop-filter: blur(20px);
    border-left: 1px solid rgba(141, 94, 244, 0.3);
    box-shadow: -4px 0 40px rgba(0, 0, 0, 0.5),
                0 0 80px rgba(141, 94, 244, 0.2);
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    padding: 8rem 3rem 3rem;
  }
}

.header__mobile-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #8D5EF4 0%, #B999FD 100%);
  border: none;
  border-radius: 0.8rem;
  font-size: 3rem;
  line-height: 1;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(141, 94, 244, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(141, 94, 244, 0.5);
  }

  &:active {
    transform: translateY(0);
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
  padding-top: 12rem;

  @media only screen and (max-width: 768px) {
    padding-top: 10rem;
  }

  @media only screen and (max-width: 480px) {
    padding-top: 8rem;
  }
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
  align-items: center;
  justify-content: center;
}
</style>
