<template>
  <div class="profile">
    <div class="header profile__header">
      <div class="header__background">
        <img src="/images/settings-promo-bg.png" class="header__background-image">
      </div>
      <div class="header__content">
        <div class="avatar header__avatar">
          <img src="/images/settings-user-ava-default.png" alt="default user avatar">
          <!--          <img v-if="false" src="" class="avatar__image">-->
          <!--          <svg-icon name="redesign/user-2" class="avatar__placeholder" />-->
          <button class="avatar__edit">
            <svg-icon name="redesign/edit" class="avatar__edit-icon" />
          </button>
        </div>

        <div class="header__statistics">
          <div class="header__main">
            <h2 class="header__username">
              {{ $auth.user.username }}
            </h2>
            <p class="header__text header__location" />
            <p class="header__text">
              Зарегистрирован <br> {{ getFormattedDate($auth.user.datetime_create) }}
            </p>
          </div>

          <div class="header__statistics-container">
            <div class="header__statistics-rating">
              <h6 class="header__statistics-title">
                Мой рейтинг
              </h6>
              <!--              <div class="header__statistics-text header__statistics-text_align_center">-->
              <!--                Жалоб: <span class="bold">{{ 7 }}</span> Похвал:-->
              <!--                <span class="bold">{{ 64 }}</span>-->
              <!--              </div>-->
              <Stars class="header__stars" :small="true" :value="$auth.user.service_rating" />
            </div>
          </div>
          <div class="header__statistics-container">
            <div class="header__statistics-game">
              <div v-if="rating" class="header__statistics-container header__level">
                <svg-icon :name="`redesign/${rating}`" class="header__level-icon" />
              </div>
              <div class="header__statistics-logo">
                <img src="/images/dota_22.png" alt="dota 2">
              </div>
            </div>
            <div class="header__statistics-item">
              <!--              <div class="header__statistics-text">-->
              <!--                Кол.во игр: <span class="bold">{{ 3267 }}</span>-->
              <!--              </div>-->
              <!--              <div class="header__statistics-text">-->
              <!--                Кол.во побед: <span class="bold">{{ 521 }}</span>-->
              <!--              </div>-->
              <div class="header__statistics-text">
                Статус: <span :class="{ 'verified': verified, 'not-verified': !verified }">{{ verified ? 'Верифицирован' : 'Не верифицирован' }}</span>
              </div>
              <div class="header__statistics-text">
                Steam ID: <span>{{ $auth.user.steam_id }}</span>
              </div>
            </div>
            <!--            <div class="header__statistics-item">-->
            <!--              <div class="header__statistics-text">Доля побед: <span class="not-verified">31%</span></div>-->
            <!--              <div class="header__statistics-text">В игре Dota 2 с <span class="bold"> 06.11.2021</span></div>-->
            <!--              <div class="header__statistics-text">Жалоб:  <span class="bold">7</span></div>-->
            <!--            </div>-->
          </div>
        </div>
        <!--        <div class="header__buttons">-->
        <!--          <button class="button-mode-3 button-mode-3_medium button-mode-3_dark">-->
        <!--            <svg-icon name="redesign/share" class="button-mode-3__icon" />-->
        <!--            ПОДЕЛИТЬСЯ-->
        <!--          </button>-->
        <!--          <NuxtLink to="/cabinet/profile/settings" class="button-mode-3 button-mode-3_medium button-mode-3_highlighted">-->
        <!--            <svg-icon name="redesign/gear" class="button-mode-3__icon" />-->
        <!--            НАСТРОЙКИ-->
        <!--          </NuxtLink>-->
        <!--          <button v-if="!verified" class="button-mode-3 button-mode-3_medium button-mode-3_highlighted button-mode-3_align_center" @click.prevent="generateVerificationUrl">-->
        <!--            Верификация-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="profile-content">
      <PersonalSettings />
      <PaymentSettings />
      <!--        <SocialSettings />-->
    </div>
  </div>
</template>
<script>
import PersonalSettings from '../../../components/Profile/PersonalSettings'
import PaymentSettings from '../../../components/Profile/PaymentSettings'
import SocialSettings from '../../../components/Profile/SocialSettings'
import Stars from '@/components/Cabinet/Stars'
export default {
  components: {
    PersonalSettings,
    PaymentSettings,
    // SocialSettings,
    Stars
  },
  layout: 'cabinet-default',
  data () {
    return {
    }
  },
  computed: {
    rating () {
      return this.getRatingSvgName(this.$auth.user.dota_mmr)
    },
    verified () {
      return this.$auth.user.verification && this.$auth.user.verification.is_verified
    }
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.query.verificated) {
      console.log('Test')
      // this.$axios
      //   .$get('/auth/verification/get_verification_data/', {
      //     params: {
      //       verification_id: this.$route.query.verification_id
      //     }
      //   })
      //   .then((response) => {
      //     console.log('Response: ', response)
      //     // Modal verification submitted
      //     // $auth fetch => update ui
      //   })
      //   .catch((error) => {
      //     console.log('Error: ', error)
      //     // Modal verification error
      //   })
    }
  },
  methods: {
    getRatingSvgName (mmr) {
      if (mmr < 201) {
        return '0-2'
      } else if (mmr < 401) {
        return '0-4'
      } else if (mmr < 601) {
        return '0-6'
      } else if (mmr < 801) {
        return '0-8'
      } else if (mmr < 1001) {
        return '1'
      } else if (mmr < 1201) {
        return '1-2'
      } else if (mmr < 1401) {
        return '1-4'
      } else if (mmr < 1601) {
        return '1-6'
      } else if (mmr < 1801) {
        return '1-8'
      } else if (mmr < 2001) {
        return '2'
      } else if (mmr < 2201) {
        return '2-2'
      } else if (mmr < 2401) {
        return '2-4'
      } else if (mmr < 2601) {
        return '2-6'
      } else if (mmr < 2801) {
        return '2-8'
      } else if (mmr < 3001) {
        return '3'
      } else if (mmr < 3201) {
        return '3-2'
      } else if (mmr < 3401) {
        return '3-4'
      } else if (mmr < 3601) {
        return '3-6'
      } else if (mmr < 3801) {
        return '3-8'
      } else if (mmr < 4001) {
        return '4'
      } else if (mmr < 4201) {
        return '4-2'
      } else if (mmr < 4401) {
        return '4-4'
      } else if (mmr < 4601) {
        return '4-6'
      } else if (mmr < 4801) {
        return '4-8'
      } else if (mmr < 5001) {
        return '5'
      } else if (mmr < 5201) {
        return '5-2'
      } else if (mmr < 5401) {
        return '5-4'
      } else if (mmr < 5601) {
        return '5-6'
      } else if (mmr < 5801) {
        return '5-8'
      } else if (mmr < 6001) {
        return '6'
      } else if (mmr < 6201) {
        return '6-2'
      } else if (mmr < 6401) {
        return '6-4'
      } else if (mmr < 6801) {
        return '6-8'
      } else if (mmr < 7001) {
        return '7'
      } else if (mmr < 7201) {
        return '7-2'
      } else if (mmr < 7401) {
        return '7-4'
      } else if (mmr < 7801) {
        return '7-8'
      } else if (mmr > 7999) {
        return '8'
      } else {
        return '8'
      }
    },
    getFormattedDate (date) {
      // Convert to date object
      const dateObj = new Date(date)

      // Format date string
      const formattedDateString = dateObj.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).replace(/\b(\d)\b/g, '0$1')
        .replace(/,\s/g, ' ')

      return formattedDateString // Output: "05 марта 2023 г."
    },
    generateVerificationUrl () {
      this.$axios
        .$get('/auth/verification/generate_verification_url/', {
          params: {
            user_id: this.$auth.user.id
          }
        })
        .then((response) => {
          console.log('Response: ', response)

          window.location.href = response.url
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {

}
.profile__header {
  margin-bottom: 2rem;
}

.profile-content {
  background: #141415;
  border-radius: 1.1rem;
  padding: 2rem;
  display: flex;
  column-gap: 30px;
  @media screen and (max-width: 767px){
    flex-wrap: wrap;
    gap: 30px;
  }
}
/*
  ============================================================
  Header
  ============================================================
*/
.header {
  padding: 1.2rem;
  border: .1rem solid #323232;
  border-radius: 1.1rem;
}
.header__background {
  height: 19rem;
  background: #141415;
  border-radius: .8rem;

  margin-bottom: 1.5rem;

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover
  }
}

.header__content {
  display: flex;
  align-items: flex-end;

  position: relative;
  padding-left: 2rem + 14.5rem + 1rem;

  @media screen and (max-width: 767px) {
   padding-left: 0;
   flex-direction: column;
   gap: 2rem;
   align-items: center;
  }
}
/* Avatar */
.header__avatar {
  position: absolute;
  left: 2rem;
  bottom: 0;
  @media screen and (max-width: 767px) {
    position: relative;
  }
}
.avatar {
  width: 21.5rem;
  height: 21.5rem;
  border-radius: 50%;
  background: #878787;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4rem;
  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
}
.avatar__image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.avatar__placeholder {
  width: 4.8rem;
  height: 7.2rem;

  --fill-color: #FFFFFF;
  --stroke-color: #FFFFFF;
}
.avatar__edit {
  width: 4.3rem;
  height: 4.3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #141415;
  border: none;
  padding: 0;
  border-radius: .5rem;

  position: absolute;
  bottom: 0;
  left: 1.1rem;
  z-index: 1;

  &-icon {
    width: 2.9rem;
    height: 2.9rem;
  }
}
/* Main */
.header__main {
  max-width: 30rem;
  margin-right: 2.5rem;
}
.header__username {
  font-weight: 400;
  font-size: 2.5rem;
  line-height: 135.2%;
  letter-spacing: -0.07rem;
  color: #FFFFFF;
}
.header__text {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #606060;
}
.header__location {
  margin-bottom: .4rem;
}
/* Statistics */
.header__statistics {
  flex-grow: 1;
  display: flex;
  align-items: center;
  //justify-content: center;
  max-width: 85%;
  margin: 0 0 0 auto;

  background: #141415;
  border-radius: .8rem;
  padding: 1.2rem 1.8rem 1.2rem 2.8rem;

  //margin-right: 1rem;
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: center;
    max-width: none;
    margin: 0 auto;
  }
}
.header__statistics-container {
  //padding: 0 1.2rem;
  display: flex;
  column-gap: 20px;
}
.header__statistics-rating {
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;
  padding: 0 18px;
  &::after {
    position: absolute;
    right: 0;
    top: 0;
    width: 2px;
    height: 90%;
    background: #fff;
  }
}
.header__level {
  &-icon {
    display: block;
    width: 3.9rem;
    height: 3.9rem;
  }
}
.header__statistics-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header__statistics-title {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  line-height: 134.2%;
  letter-spacing: 0.03rem;
  color: #A5A5A5;
  text-align: center;
}

.header__statistics-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header__statistics-logo {
  img {
    width: 25px;
  }
}
.header__statistics-text {
  //font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 14px;
  line-height: 134.2%;
  letter-spacing: 0.03rem;
  color: #606060;
  &_align_center {
    text-align: center;
  }

  .bold {
    font-variation-settings: 'wght' 700;
    color: #FFFFFF;
  }
  .verified {
    color: #06BD19;
  }
  .not-verified {
    color: #B54B4B;
  }
}
.header__stars {
  justify-content: center;
  margin-top: .2rem;
}
/* Buttons */
.header__buttons {
  flex: 0 0 auto;
  width: 16rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: .5rem;
}
</style>
