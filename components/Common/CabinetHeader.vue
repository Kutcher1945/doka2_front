<template>
  <div class="header-content">
    <NuxtLink to="/cabinet" class="logo header__logo" @click.native="closeMobileMenu">
      <svg-icon name="logo" class="logo__icon" />
    </NuxtLink>
    <div v-if="$auth.user.verification.is_verified" class="finances-wrapper header__finances">
      <CabinetFinances />
      <NuxtLink to="/cabinet/wallet" class="header__link header__wallet">
        <svg-icon name="redesign/wallet" class="header__link-icon" />
      </NuxtLink>
    </div>
    <CabinetVerificationCard v-else class="header__verification" />

    <NuxtLink to="#" class="header__link header__notifications">
      <svg-icon name="redesign/bell" class="header__link-icon" />
    </NuxtLink>

    <User class="header__user" />
    <!-- MOBILE MENU -->
    <!-- Гамбургер-иконка для открытия меню -->
    <button class="hamburger-icon" :class="{ 'open': GET_TOGGLE_MOBILE_MENU }" @click="toggleMobileMenu">
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
    </button>

    <!-- Мобильное меню -->
    <div :class="{ active: GET_TOGGLE_MOBILE_MENU }" class="mobile-menu__wrapper">
      <div class="mobile-menu__user">
        <div class="mobile-menu__username">
          {{ $auth.user.username }}
        </div>
        <div v-if="rating" class="mobile-menu__level">
          <svg-icon :name="`redesign/${rating}`" class="game__icon user-dropdown__level-icon" />
          <Stars :value="$auth.user.service_rating" :small="true" class="user-dropdown__stars" />
        </div>
      </div>
      <CabinetFinances />
      <div class="mobile-menu__content">
        <ul class="mobile-menu__links">
          <li>
            <NuxtLink
              class="button-mode-3"
              active-class="button-mode-3_highlighted"
              to="/cabinet"
              exact
              @click.native="closeMobileMenu"
            >
              <svg-icon name="home" class="button-mode-3__icon" />
              Кабинет
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="button-mode-3 menu__add-game"
              active-class="button-mode-3_highlighted"
              to="/cabinet/lobby"
              @click.native="closeMobileMenu"
            >
              <svg-icon name="redesign/game-dota" class="button-mode-3__icon" />
              Играть
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cabinet/history" class="button-mode-3" active-class="button-mode-3_highlighted" @click.native="closeMobileMenu">
              <svg-icon name="redesign/calendar" class="button-mode-3__icon" />
              История игр
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cabinet/friends" class="button-mode-3" active-class="button-mode-3_highlighted" @click.native="closeMobileMenu">
              <svg-icon name="redesign/friends" class="button-mode-3__icon" />
              Друзья
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cabinet/support" class="button-mode-3" active-class="button-mode-3_highlighted" @click.native="closeMobileMenu">
              <svg-icon name="redesign/support" class="button-mode-3__icon" />
              Поддержка
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cabinet/profile" class="button-mode-3" active-class="button-mode-3_highlighted" @click.native="closeMobileMenu">
              <svg-icon name="redesign/user-3" class="button-mode-3__icon" />
              Профиль
            </NuxtLink>
          </li>
        </ul>

        <button class="button-mode-3 button-mode-3_align_center menu__add-game" @click.prevent="showGames">
          <svg-icon name="redesign/plus" class="button-mode-3__icon" />
          Добавить игру
        </button>
        <ul class="games-list">
          <li class="games-list__item">
            <template v-if="isDotaActive">
              <NuxtLink to="/cabinet/lobby">
                <button class="game">
                  <svg-icon name="redesign/game-dota" style="color:#E04F4F;" class="game__icon" />
                </button>
              </NuxtLink>
            </template>
            <template v-else>
              <button class="game">
                <svg-icon name="redesign/game-dota" class="game__icon" />
              </button>
            </template>
          </li>
          <li class="games-list__item">
            <button class="game">
              <svg-icon name="redesign/game-pubg" class="game__icon" />
            </button>
          </li>
          <li class="games-list__item">
            <button class="game">
              <svg-icon name="redesign/game-cs" class="game__icon" />
            </button>
          </li>

          <li class="games-list__item">
            <button class="game">
              <svg-icon name="redesign/game-valorant" class="game__icon" />
            </button>
          </li>
        </ul>

        <CabinetCommission />
        <CabinetBackToLobby />

        <div class="mobile-menu__action">
          <button class="button-mode-3 button-mode-3_highlighted button-mode-3_align_center user-dropdown__button user-dropdown__logout" @click="$auth.logout()">
            <svg-icon name="redesign/return" class="button-mode-3__icon" />
            Выход
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalGames from '@/components/Cabinet/ModalGames.vue'
import CabinetBackToLobby from '@/components/Cabinet/CabinetBackToLobby'
import CabinetCommission from '@/components/Cabinet/CabinetCommission'
import CabinetFinances from '@/components/Cabinet/CabinetFinances.vue'
import User from '@/components/Cabinet/User.vue'
import Stars from '@/components/Cabinet/Stars.vue'

export default {
  components: {
    CabinetFinances,
    User,
    Stars,
    // eslint-disable-next-line vue/no-unused-components
    ModalGames,
    CabinetBackToLobby,
    CabinetCommission
  },
  data () {
    return {
      // wallet: null
      // isSwitchOn: false,
      isMenuOpen: false,
      ratingRanges: {
        '0-2': 200,
        '0-4': 400,
        '0-6': 600,
        '0-8': 800,
        1: 1000,
        '1-2': 1200,
        '1-4': 1400,
        '1-6': 1600,
        '1-8': 1800,
        2: 2000,
        '2-2': 2200,
        '2-4': 2400,
        '2-6': 2600,
        '2-8': 2800,
        3: 3000,
        '3-2': 3200,
        '3-4': 3400,
        '3-6': 3600,
        '3-8': 3800,
        4: 4000,
        '4-2': 4200,
        '4-4': 4400,
        '4-6': 4600,
        '4-8': 4800,
        5: 5000,
        '5-2': 5200,
        '5-4': 5400,
        '5-6': 5600,
        '5-8': 5800,
        6: 6000,
        '6-2': 6200,
        '6-4': 6400,
        '6-8': 6800,
        7: 7000,
        '7-2': 7200,
        '7-4': 7400,
        '7-8': 7800,
        8: 8000
      }
    }
  },
  computed: {
    ...mapGetters(['GET_CURRENT_LOBBY', 'GET_TOGGLE_MOBILE_MENU']),
    mobileMenuOpen () {
      return this.$store.state.mobileMenuOpen
    },
    isDotaActive () {
      // console.log('Con games: ', this.$auth.$state.user.connected_games)
      return (
        this.$auth.$state.user &&
        this.$auth.$state.user.connected_games.some(x => x.name === 'dota')
      )
    },
    rating () {
      return this.getRatingSvgName(this.$auth.user.dota_mmr)
    }
  },
  methods: {
    ...mapActions(['CHANGE_TOGGLE_MOBILE_MENU', 'CHANGE_CLOSE_MOBILE_MENU']),
    toggleMobileMenu () {
      this.CHANGE_TOGGLE_MOBILE_MENU(!this.mobileMenuOpen)
    },
    closeMobileMenu () {
      this.CHANGE_TOGGLE_MOBILE_MENU(false)
    },
    showGames () {
      this.$emit('close')
      this.$modal.show(ModalGames, {}, {}, {})
    },
    getRatingSvgName (mmr) {
      for (const [rating, range] of Object.entries(this.ratingRanges)) {
        if (mmr < range) {
          return rating.toString()
        }
      }

      // По умолчанию
      return '8'
    }
  }
}
</script>

<style lang="scss" scoped>
/*
  ============================================================
  Header
  ============================================================
*/
.header-content {
  background: #171717;
  border-bottom: 0.12rem solid #323232;

  display: flex;
  align-items: center;

  position: relative;
  z-index: 5;

  padding: 1.6rem 7rem 1.6rem 0;

  @media screen and (max-width: 767px) {
    padding: 1.6rem;
    justify-content: space-between;
  }
}

.header__finances {
  margin-left: auto;

  @media screen and (max-width: 767px) {
    display: none;
  }
}

.header__verification {
  margin-left: auto;
}

.header__user {
  margin-left: 1.6rem;
}

.header__logo {
  width: 35rem;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 767px) {
    width: auto;
  }
}

.header__notifications {
  margin-left: 1.6rem;
}

.header__wallet {
  margin-left: 1.6rem;
}

/* Logo */
.logo {
  &__icon {
    width: 16.8rem;
    height: 3.4rem;
    display: block;
  }
}

/* Link */
.header__link {
  width: 4.5rem;
  height: 4.5rem;
  background: #1f1f1f;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    display: none;
  }

  &-icon {
    width: 2.4rem;
    height: 2.4rem;
  }
}

/** Finances */
.finances-wrapper {
  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    display: none;
  }
}

/** MOBILE MENU */

.mobile-menu {
  &__user {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  &__username {
    font-size: 2rem;
    color: #fff;
  }
  &__level {
    display: flex;
    gap: 2rem;
  }
  &__wrapper {
    position: fixed;
    top: 67px;
    right:-100%;
    bottom: 0;
    width: 100%;
    background-color: #141415;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;
    transition: all 0.35s ease-in-out;

    &.active {
      right: 0;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li a {
      font-size: 2rem;
    }
  }

  &__action {
    display: flex;
    justify-content: center;
    padding: 1.6rem;
  }
}

/* Стили гамбургер-иконки */
.hamburger-icon {
  cursor: pointer;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 27px;
  width: 27px;

  @media screen and (max-width: 767px) {
    display: flex;
  }

  .bar {
    width: 27px;
    height: 3px;
    border-radius: 2px;
    background-color: #7D5AB5;
    transition: transform 0.3s;

    &:first-child {
      transform: rotate(0) translateY(0) translateX(0);
    }

    &:last-child {
      transform: rotate(0) translateY(0) translateX(0);
    }

    &:nth-child(2) {
      display: block;
    }
  }

  &.open {

    // overflow: hidden;
    .bar {
      &:first-child {
        transform: rotate(45deg) translateY(8px) translateX(9px);
      }

      &:last-child {
        transform: rotate(-45deg) translateY(-8px) translateX(9px);
      }

      &:nth-child(2) {
        // transform: translateX(100%);
        opacity: 0;
      }
    }
  }
}

/** Menu */
.game {
  height: 8rem;
  width: 100%;
  background: #1f1f1f;
  border-radius: 0.5rem;

  &__icon {
    color: #878787;
    width: 4.4rem;
    height: 4.4rem;
  }
}

.games {
  &-list {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    gap: 0.5rem;

    &__item {
      // width: 3rem;
      // height: 3rem;
    }
  }
}

/* Анимация выезда контента */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
