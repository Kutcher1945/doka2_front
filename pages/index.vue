<template lang="pug">
  main
    .index.caution(v-show="!siteStatus && showContent")
      .header
        NuxtLink.logo.header__logo(to="/cabinet")
          <svg-icon name="logo" class="logo__icon" />
      .landing_title
        .landing_title_site На сайте ведутся
        .landing_title_works технические работы
        .landing_title_soon скоро все заработает:)
      .landing_content
      <LandingFooter />
    .index(v-show="!showContent")
      <LandingLogin />
      <LandingProve />
      <LandingFeatures />
      <LandingPreFooter />
      <LandingFooter />
</template>

<script>
import LandingLogin from '@/components/Landing/LandingLogin'
import LandingProve from '@/components/Landing/LandingProve'
import LandingFeatures from '@/components/Landing/LandingFeatures'
import LandingPreFooter from '@/components/Landing/LandingPreFooter'
import LandingFooter from '@/components/Landing/LandingFooter'

export default {
  components: { LandingLogin, LandingProve, LandingFeatures, LandingPreFooter, LandingFooter },
  layout: 'index',
  auth: 'guest',
  data () {
    return {
      languages: [
        { slug: 'ru', icon: 'flag-ru.png', name: 'Русский' },
        { slug: 'ua', icon: 'flag-ua.png', name: 'Українська' },
        { slug: 'kz', icon: 'flag-kz.png', name: 'Казахстан' }
      ],
      lang: { slug: 'ru', icon: 'flag-ru.png', name: 'Русский' },
      siteStatus: false,
      showContent: false
    }
  },
  async fetch () {
    try {
      // Выполняем запрос к API для получения статуса
      const responseSiteStatus = await this.$axios.$get('/site-status/')
      if (responseSiteStatus.is_enabled) {
        this.siteStatus = true // site включен
        // console.log('responceSiteStatus ', responseSiteStatus, responseSiteStatus.is_enabled)
      } else {
        this.showContent = true
      }
    } catch (error) {
      console.log('site status, err', error)
    }
  }
}
</script>

<style lang="scss" scoped>

@font-face {
  font-family: 'ALISEO';
  src: url('../assets/fonts/ALISEO.otf') format('opentype');
}
@font-face {
  font-family: 'Noisy Walk';
  src: url('../assets/fonts/NoisyWalk.ttf') format('truetype');
}
@font-face {
  font-family: 'Colus';
  src: url('../assets/fonts/Colus-Regular.otf') format('opentype');
}

.index {
  font-family: 'Bahnschrift', sans-serif;
  background: #000;
  &.caution {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header {
    padding: 24px;
    @media only screen and (max-width: 600px) {
      padding: 24px 12px;
    }
  }
  .header__logo {
    width: 35rem;
    display: flex;
    justify-content: center;
  }
  .landing_title {
    color: #fff;
    font-size: 18px;
    line-height: 116%;
    margin-top: 10%;
    position: initial;
    display: none;
    @media only screen and (max-width: 600px) {
      position: relative;
      z-index: 1;
      display: block;
    }
    &_works {
      font-size: 28px;
      font-weight: bold;
      text-transform: uppercase;
      line-height: 123%;
    }
    &_soon {
      text-align: right;
    }
  }
  .landing_content {
    padding: 12px;
    width: 100%;
    height: 100%;
    min-height: 80vh;
    -webkit-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('/images/cybert_caution.webp');

    @media only screen and (max-width: 600px) {
      background-image: url('/images/cybertupdat4e_mob2.webp');
      background-size: cover;
      background-position: 22% center;
      padding: 0;
      transform: translateY(-10%);
      z-index: 0;
    }
  }
}
/* Logo */
.logo {
  display: flex;
  align-items: center;

  &__icon {
    width: 16.8rem;
    height: 3.4rem;
  }
}

.arrow-navigate {
  display: block;
  width: 3.7rem;
  height: 3.7rem;
  cursor: pointer;

  position: relative;
  z-index: 3;

  &__icon {
    width: 3.7rem;
    height: 3.7rem;

    --arrow-background-color: #7D5AB5;
    --arrow-color: #FFFFFF;
  }
  &_up {
    .arrow-navigate__icon {
      transform: rotate(180deg);
    }
  }
}
</style>
