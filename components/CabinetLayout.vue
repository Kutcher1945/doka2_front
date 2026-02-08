<template>
  <div class="cabinet">
    <div class="header">
      <CabinetHeader />
    </div>
    <div class="content">
      <div class="sidebar">
        <div class="sidebar__container">
          <div class="menu sidebar__menu">
            <NuxtLink
              class="button-mode-3"
              active-class="button-mode-3_highlighted"
              to="/cabinet"
              exact
            >
              <svg-icon name="home" class="button-mode-3__icon" />
              Кабинет
            </NuxtLink>
            <NuxtLink
              class="button-mode-3 menu__add-game"
              active-class="button-mode-3_highlighted"
              to="/cabinet/lobby"
            >
              <svg-icon name="redesign/game-dota" class="button-mode-3__icon" />
              Играть
            </NuxtLink>
            <NuxtLink
              to="/cabinet/history"
              class="button-mode-3"
              active-class="button-mode-3_highlighted"
            >
              <svg-icon name="redesign/calendar" class="button-mode-3__icon" />
              История игр
            </NuxtLink>
            <NuxtLink to="/cabinet/friends" class="button-mode-3" active-class="button-mode-3_highlighted">
              <svg-icon name="redesign/friends" class="button-mode-3__icon" />
              Друзья
            </NuxtLink>
            <NuxtLink to="/cabinet/support" class="button-mode-3" active-class="button-mode-3_highlighted">
              <svg-icon name="redesign/support" class="button-mode-3__icon" />
              Поддержка
            </NuxtLink>
            <button
              class="button-mode-3 menu__add-game"
              @click.prevent="showGames"
            >
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
          </div>

          <CabinetCommission />
          <CabinetBackToLobby />
        </div>
      </div>
      <div class="main">
        <div class="main__container">
          <slot />
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CabinetBackToLobby from './Cabinet/CabinetBackToLobby'
import CabinetCommission from './Cabinet/CabinetCommission'
import MainFooter from './Footer/MainFooter'
import CabinetHeader from './Common/CabinetHeader.vue'
import ModalGames from '@/components/Cabinet/ModalGames.vue'
import ModalService from '@/components/Cabinet/ModalService.vue'

export default {
  components: {
    CabinetBackToLobby,
    CabinetCommission,
    CabinetHeader,
    MainFooter
  },
  data() {
    return {
      // wallet: null
      currentLobby: null,
      isSwitchOn: false
    }
  },
  async fetch() {
    const responseCurrentLobby = await this.$axios.$get(
      `/dota/lobby/${this.$auth.user.id}/current_lobby/`
    )
    if (
      typeof responseCurrentLobby === 'object' &&
      responseCurrentLobby !== null
    ) {
      this.CHANGE_CURRENT_LOBBY(responseCurrentLobby.lobby)
    }
    // console.log(this.currentLobby)
  },
  // async fetch () {
  //   const wallet = await this.$axios
  //     .$get('/monetix/get_balance', {
  //       params: {
  //         user_id: this.$auth.user.id
  //       }
  //     })
  //   console.log('Wallet: ', wallet)
  //   this.wallet = wallet
  // },
  computed: {
    ...mapGetters(['GET_CURRENT_LOBBY']),
    isDotaActive() {
      console.log('Con games: ', this.$auth.$state.user.connected_games)
      return (
        this.$auth.$state.user &&
        this.$auth.$state.user.connected_games.some(x => x.name === 'dota')
      )
    }
  },
  mounted() {
    console.log('AUTH: ', this.$auth)
    // console.log('is logged, and id', this.$auth.loggedIn, this.$auth.user.id)
  },
  methods: {
    ...mapActions(['CHANGE_CURRENT_LOBBY']),
    showGames () {
      this.$emit('close')
      this.$modal.show(ModalGames, {}, {}, {})
    },
    showCommissionModal () {
      this.$modal.show(
        ModalService,
        {
          title:
            'Данная система снятия комиссий действует до вывода средств.  После каждого вывода средств счётчик обнуляется.',
          text: '',
          buttonText: 'Cпасибо!'
        },
        {},
        {}
      )
    }
    // async showBackLobby(){
    //   // const resp = await
    // }
  }
  // mounted () {
  //   console.log(this.$store)
  //   // this.$store.commit('SET_USER_WALLET', { helloworld: '123' })
  //   // this.wallet = balance
  // }
}
</script>

<style lang="scss" scoped>
.cabinet {
  //font-family: 'Gotham Pro', sans-serif;

  background: radial-gradient(61.2% 109.21% at 100.59% 100%,
      rgba(117, 79, 224, 0.23) 0%,
      rgba(30, 30, 32, 0) 100%)
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
    ,
    #1e1e20;

  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media screen and (max-width: 767px){
    padding-top: 67px;
  }

  .header {
    position: inherit;

    @media screen and (max-width: 767px) {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
    }
  }

}

/*
  ============================================================
  Content
  ============================================================
*/
.content {
  flex-grow: 1;
  position: relative;

  display: grid;
  grid-template-columns: 35rem minmax(0, 1fr);

  @media (max-width: 767px) {
    display: block;
  }
}

/*
  ============================================================
  Sidebar
  ============================================================
*/
.sidebar {
  position: relative;

  //left: 0;
  //top: 0;
  min-height: 100%;
  z-index: 5; // Carousel (z-index: 6)
}

.sidebar {
  width: 35rem;
  padding: 2.4rem 0 2.4rem 0;

  background: #171717;
  border-right: 0.1rem solid #323232;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    display: none;
  }
}

.sidebar__container {
  flex-grow: 1;
  width: 22rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.sidebar__menu {
  margin-bottom: 3rem;
}

.sidebar__commission {
  margin-bottom: 2.4rem;
}

/* Menu */
.menu {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1.6rem;
}

.games-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 1.6rem;
}

.game {
  height: 4rem;
  width: 100%;
  background: #1f1f1f;
  border-radius: 0.5rem;

  &__icon {
    color: #878787;
    width: 2.2rem;
    height: 2.2rem;
  }
}

/* Commission */
//.commission {
//  background: radial-gradient(
//        157.92% 76.15% at 50% 0%,
//        rgba(80, 33, 128, 0.58) 0%,
//        rgba(20, 20, 21, 0) 100%
//      )
//      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
//    #1f1f1f;
//  border-radius: 1.1rem;
//  padding: 3.2rem 1.2rem;
//}
//.commission__title {
//  font-weight: 350;
//  font-variation-settings: 'wght' 350;
//  font-size: 1.4rem;
//  line-height: 116.7%;
//  letter-spacing: 0.03rem;
//  color: #ffffff;
//  text-align: center;
//}
//.commission__counter {
//  //font-weight: 700;
//  font-variation-settings: 'wght' 700;
//  font-size: 6.2rem;
//  line-height: 134.7%;
//  letter-spacing: 0.03rem;
//  color: #f6edff;
//  text-shadow: 0 -0.2rem 7rem #bd7aff, 0 -0.2rem 4.1rem #bd7aff;
//  text-align: center;
//
//  margin-bottom: 1rem;
//
//  position: relative;
//  &:after {
//    content: '';
//
//    width: 14rem;
//    height: 0.1rem;
//
//    background: linear-gradient(
//      270deg,
//      rgba(53, 53, 53, 0) 0%,
//      #6c5a9d 51.04%,
//      rgba(53, 53, 53, 0) 100%
//    );
//    border-radius: 0.5rem;
//
//    position: absolute;
//    top: calc(100% + 0rem);
//    left: 50%;
//    transform: translateX(-50%);
//  }
//}
//.commission__subtitle {
//  margin-bottom: 0.8rem;
//}
//.commission__text {
//  font-weight: 350;
//  font-variation-settings: 'wght' 350;
//  font-size: 1rem;
//  line-height: 116.7%;
//  letter-spacing: 0.03rem;
//  color: #878787;
//  text-align: center;
//}
//.commission__stages {
//  display: grid;
//  grid-template-columns: repeat(3, 3.3rem);
//  grid-gap: 0.9rem;
//  justify-content: center;
//
//  margin-bottom: 1.2rem;
//
//  &-item {
//    height: 3.3rem;
//    background: #272727;
//    border-radius: 0.5rem;
//
//    display: flex;
//    align-items: center;
//    justify-content: center;
//
//    font-variation-settings: 'wght' 700;
//    font-size: 1.3rem;
//    line-height: 116.7%;
//    letter-spacing: 0.03rem;
//    color: #878787;
//    text-align: center;
//
//    &.active {
//      color: #ffffff;
//      text-shadow: 0 0 1.7rem #bd7aff, 0 0 1.1rem #bd7aff;
//    }
//  }
//}
//.commission__description {
//  margin-bottom: 1rem;
//}
//.commission__button {
//  width: 2.3rem;
//  height: 2.3rem;
//
//  background: #754fe0;
//  border: 0.1rem solid #2c2c2c;
//  box-shadow: 0 0 1rem rgba(3, 3, 3, 0.72);
//  border-radius: 1.15rem;
//
//  display: flex;
//  align-items: center;
//  justify-content: center;
//
//  margin: 0 auto;
//
//  &-icon {
//    width: 0.7rem;
//    height: 1.4rem;
//  }
//}

/* Lobby return */
.lobby-return {
  margin-top: auto;
}

/*
  ============================================================
  Main
  ============================================================
*/
.main {
  //padding: 2.4rem 7rem 2.4rem (35rem + 6.5rem);
  padding: 2.4rem 7rem 2.4rem 6.5rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 767px) {
    padding: 2rem 1rem;
  }
}

.main__container {
  flex-grow: 1;
  margin-bottom: 2.4rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.main__copyright {
  //margin-top: auto;
}

/*
  ============================================================
  Copyright
  ============================================================
*/
.copyright {
  display: flex;
  align-items: center;

  background: #141415;
  border-radius: 0.5rem;
  padding: 1rem 7rem 1rem 6.5rem;
  padding-left: 0;

  border-top: 0.12rem solid #323232;
}

.copyright__logo {
  width: 35rem;
  display: flex;
  justify-content: center;
}

.copyright__rate {
  //font-weight: 700;
  font-variation-settings: 'wght' 700, 'wdth' 87.5;
  font-size: 2.2rem;
  line-height: 1;
  color: #292929;

  background: #ebebeb;
  border-radius: 0.3rem;
  padding: 0.6rem 1rem 0.2rem;

  margin-right: 1.2rem;
}

.copyright__content {
  margin-right: 2.4rem;
}

.copyright__text {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 0.8rem;
  line-height: 137%;
  letter-spacing: 0.05em;
  color: #a7a7a7;

  &_faded {
    color: #505050;
  }
}

.accounts {
  font-variation-settings: 'wght' 300;
  font-weight: 300;
  font-size: 1rem;
  line-height: 110%;
  letter-spacing: 0.05em;
  color: #a7a7a7;

  margin: 0 auto;
}

.file-links {
  margin-left: 2.4rem;
  display: flex;
  align-items: center;
}

.file-link {
  display: flex;
  align-items: center;
  padding: 0.3rem 1rem;

  background: #1f1f1f;
  border-radius: 0.5rem;

  font-weight: 300;
  font-variation-settings: 'wght' 300, 'wdth' 0.75;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #ababab;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &__icon {
    width: 1.6rem;
    height: 1.6rem;

    margin-right: 0.6rem;
  }
}</style>
