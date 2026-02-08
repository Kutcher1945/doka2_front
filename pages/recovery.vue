<template lang="pug">
  .index
    .restore-password
      .restore-password__error(v-if="!tokenConfirmation")
        h2.restore-password__title Токен истёк или является недействительным
      .restore-password__content(v-else-if="!passwordChanged")
        p {{ token }}
        h2.restore-password__title Восстановление пароля

        ValidationObserver(ref="recoveryForm" v-slot="{ handleSubmit }")
          form(@submit.prevent="handleSubmit(updatePassword)")

            .restore-password__fields

              ValidationProvider(
                rules="required|min:8|confirmed:passwordConfirmation"
                mode="eager"
                v-slot="{ classes, errors }"
                vid="password"
              )
                .field
                  .field__label
                  .field__container(:class="classes")
                    svg-icon(name="redesign/lock").field__icon
                    input.field__input(
                      type="password"
                      name="password"
                      placeholder="Новый пароль"
                      v-model="password"
                    )
                  .field__error(v-if="errors[0]") {{ errors[0] }}
              ValidationProvider(
                rules="required|min:8|confirmed:password"
                mode="eager"
                v-slot="{ errors, classes }"
                vid="passwordConfirmation"
              )
                .field
                  .field__label
                  .field__container(:class="classes")
                    svg-icon(name="redesign/lock").field__icon
                    input.field__input(
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Повторите новый пароль"
                      v-model="passwordConfirmation"
                    )
                  .field__error(v-if="errors[0]") {{ errors[0] }}

            button.auth-modal__button.sign-in__button(type="submit") Подтвердить
      .restore-password__success(v-else)
        h2.restore-password__title Пароль успешно изменён
        NuxtLink(to="/#sign-in").button-mode-1.button-mode-1_highlighted.restore-password__button Вход
    <LandingFooter />
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { confirmed, required, min } from 'vee-validate/dist/rules'
import LandingFooter from '@/components/Landing/LandingFooter'

extend('required', {
  ...required,
  message: 'Это поле обязательно'
})
extend('confirmed', {
  ...confirmed,
  message: 'Пароли не совпадают'
})
extend('min', {
  ...min,
  message: 'Пароль меньше 8 символов!'
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    LandingFooter
  },
  layout: 'index',
  auth: 'guest',
  async asyncData ({ $axios, route }) {
    let tokenConfirmation = false
    await $axios
      .$get('/auth/restore_password/submit', {
        params: {
          token: route.query.token
        }
      })
      .then(() => {
        tokenConfirmation = true
      })
      .catch((error) => {
        console.log(error.response)
      })

    return { tokenConfirmation }
  },
  data () {
    return {
      tokenConfirmation: false,
      password: '',
      passwordConfirmation: '',
      passwordChanged: false
    }
  },
  methods: {
    async updatePassword () {
      console.log('Update password')

      await this.$axios
        .$post(`/auth/restore_password/submit/?token=${this.$route.query.token}`, {
          password: this.password,
          password_copy: this.passwordConfirmation
        })
        .then((response) => {
          console.log('Response: ', response)
          this.passwordChanged = true
        })
        .catch((error) => {
          console.log('Error: ', error.response)
        })
    },
    goToSignIn () {

    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/blocks/auth.scss";

.restore-password {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.restore-password__title {
  color: #fff;
  font-size: 3.5rem;
  font-weight: 400;
  letter-spacing: -.07rem;
  line-height: 104.2%;
  margin-bottom: 3.8rem;
}
.restore-password__fields {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1.2rem;

  margin-bottom: 2.4rem;
}
.restore-password__button {
  margin: 0 auto;
  min-width: 17rem;
  padding: 0 1.6rem;
  border-radius: 0.7rem;
  color: #fff;
  font-size: 1.8rem;
  font-variation-settings: "wght" 350;
  font-weight: 350;
  height: 4.8rem;
  letter-spacing: .03rem;
  line-height: 134.7%;
  background: #9F64FF;
  box-shadow: 0 0.4rem 3.5rem rgba(197, 91, 234, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
