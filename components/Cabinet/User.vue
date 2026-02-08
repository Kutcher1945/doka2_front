<template lang="pug">
  .user.header__user
    //.user__level
      svg-icon(name="redesign/level-icon").user__level-icon
    .user__avatar
      img(src="/images/user-ava.png" alt="Cybert_cbb").user__avatar-image
      span
        img(src="/images/user-ava-logo.svg" alt="Cybert_logo").user__avatar-logo
    .user__name {{ $auth.user.username }}

    button.user__button(@click.prevent="isMenuActive = !isMenuActive")
      //svg-icon(name="redesign/arrow-1").user__button-icon
      span
      span
      span

    .user-dropdown.user__dropdown(v-if="isMenuActive")
      .user-dropdown__name {{ $auth.user.username }}
      .user-dropdown__level(v-if="rating")
        svg-icon(:name="`redesign/${rating}`").user-dropdown__level-icon
      Stars(:value="$auth.user.service_rating", :small="true").user-dropdown__stars
      //ul.user-dropdown__stats
      //  li
      //    | Кол.во игр:
      //    = " "
      //    span.bold {{ 3267 }}
      //  li
      //    | Кол.во побед:
      //    = " "
      //    span.bold {{ 521 }}
      //  li
      //    | Статус:
      //    = " "
        span(:class="{ 'verified': verified }") {{ verified ? 'Верифицирован' : 'Не верифицирован' }}
      NuxtLink(to="/cabinet/profile" @click.native="isMenuActive = false").button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center.user-dropdown__button
        svg-icon(name="redesign/user").button-mode-3__icon
        | Мой аккаунт
      button(@click="$auth.logout()").button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center.user-dropdown__button.user-dropdown__logout
        svg-icon(name="redesign/return").button-mode-3__icon
        | Выход
</template>

<script>
import Stars from '@/components/Cabinet/Stars.vue'

export default {
  components: {
    Stars
  },
  data () {
    return {
      isMenuActive: false,
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
    verified () {
      return this.$auth.user.verification && this.$auth.user.verification.is_verified
    },
    rating () {
      return this.getRatingSvgName(this.$auth.user.dota_mmr)
    }
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.close)
  },
  methods: {
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.isMenuActive = false
      }
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
/* User */
.user {
  width: auto;
  min-width: 20rem;
  flex: 0 0 auto;

  display: flex;
  align-items: center;

  background: #1F1F1F;
  border-radius: .5rem;
  padding: .6rem .8rem;

  position: relative;

  @media (max-width: 767px) {
    display: none;
  }
}

.user__level {
  padding-right: 1.2rem;
  position: relative;

  &:after {
    content: '';

    width: .1rem;
    height: 2.1rem;
    background: #515151;

    position: absolute;
    left: calc(100% - 0.05rem);
    top: 50%;
    transform: translateY(-50%);
  }

  &-icon {
    width: 3.3rem;
    height: 3.3rem;
  }
}

.user__name {
  //font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 14px;
  line-height: 134.7%;
  /* identical to box height, or 19px */

  letter-spacing: 2.3px;
  color: #FFFFFF;

  padding: 0 1.2rem;
}

.user__avatar {
  width: 5.2rem;
  height: 5.2rem;
  border-right: 0.5px solid #FFFFFF;
  border-radius: 5px 0px 0px 5px;
  overflow: hidden;
  position: relative;
  min-width: 5.2rem;

  //margin-left: auto;
  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-logo {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 15px;
    height: 12px;
  }
}

.user__button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  //background: none;
  outline: none;
  padding: 12px;
  margin-left: .8rem;

  background: #754FE0;
  border-radius: 5px;
  width: 35px;
  height: 35px;

  span {
    display: inline-block;
    width: 11px;
    height: 2px;
    border-radius: 2px;
    background-color: #fff;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

.user__dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-dropdown {
  background: #1F1F1F;
  border-radius: 0 0 .5rem .5rem;
  padding: .5rem 1rem 1rem;
}

.user-dropdown__name {
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 123%;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: .4rem;
}

.user-dropdown__level {
  display: flex;
  justify-content: center;
  margin-bottom: .8rem;

  &-icon {
    width: 4.6rem;
    height: 4.6rem;
  }
}

.user-dropdown__stars {
  justify-content: center;
  margin-bottom: .6rem;
}

.user-dropdown__stats {
  display: grid;
  //grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-columns: auto;

  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  line-height: 134.2%;
  letter-spacing: 0.03rem;
  color: #A5A5A5;
  text-align: center;

  margin-bottom: 1.2rem;

  .bold {
    font-variation-settings: 'wght' 700;
    color: #FFFFFF;
  }

  .verified {
    color: #06BD19;
  }

  li:nth-child(3) {
    grid-column: 1/3;
  }
}

.user-dropdown__button {
  width: 100%;
  max-width: 15rem;
  margin: 0 auto;
}

.user-dropdown__logout {
  background: #E04F4F;
  margin-top: .8rem;
}
</style>
