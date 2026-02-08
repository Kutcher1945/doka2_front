<template lang="pug">
mixin validation-icons()
  svg-icon(name="form-checkmark").validation-icon.validation-icon-checkmark
  svg-icon(name="form-cross").validation-icon.validation-icon-cross

.modal
  .modal__close-space(@click="$emit('close')")
  .auth-modal.sign-in
    button.auth-modal__close-button(@click="$emit('close')" type="button") ×

    .auth-modal__title Вход в аккаунт

    ValidationObserver(ref="form" v-slot="{ handleSubmit }" tag="div")
      form.form(@submit.prevent="handleSubmit(sendMessage)")

        .form__fields.sign-in__fields

          ValidationProvider(
            rules="required|email"
            mode="eager"
            v-slot="{ errors, classes }"
            vid="email"
            tag="label"
          ).field.sign-in__form-field
            .field__container(:class="classes")
              svg-icon(name="redesign/user-3").field__icon
              input(type="text" name="email" v-model="form.phone_number" placeholder="Логин или E-mail").field__input
              .auth-modal__error.field__error(v-if="errors[0]") {{ errors[0] }}

          ValidationProvider(
            rules="required"
            mode="eager"
            v-slot="{ errors, classes }"
            vid="password"
            tag="label"
          ).field
            .field__container(:class="classes")
              svg-icon(name="redesign/lock").field__icon
              input(type="password" name="password" v-model="form.password" placeholder="Пароль").field__input
              .auth-modal__error.field__error(v-if="errors[0]") {{ errors[0] }}

        .sign-in__bottom
          button(type="submit").auth-modal__button.sign-in__button Войти
          label.checkbox
            input(type="checkbox" name="remember_me").checkbox__input
            .checkbox__box
            .checkbox__text Запомнить

        .auth-modal__error.sign-in__form-error(v-if="formError") {{ formError }}

    .auth-modal__redirects(v-show="screenWidth > 600")
      .auth-modal__text.auth-modal__redirect Нет аккаунта?
        button(@click="showSingUp()").auth-modal__text-highlighted Зарегистрироваться
      .auth-modal__text.auth-modal__redirect Забыли пароль?
        button(@click="showRecover()").auth-modal__text-highlighted Восстановить

</template>

<script>
/**
 * .auth-modal__title Вход в аккаунт
    .test(v-show="screenWidth <= 600")
      MobilePlaceholder
    ValidationObserver(ref="form" v-slot="{ handleSubmit }" tag="div" v-show="screenWidth > 600")
 */
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import ModalSignUp from './ModalSignUp'
import ModalRecover from './ModalRecover'
// import MobilePlaceholder from '@/components/MobilePlaceholder'

import screenWidth from '~/mixins/screenWidth'

export default {
  components: {
    ModalRecover,
    ValidationProvider,
    ValidationObserver
    // MobilePlaceholder
  },
  mixins: [screenWidth],
  data () {
    return {
      form: {
        phone_number: '',
        password: ''
      },
      formError: ''
    }
  },
  created () {
    extend('required', {
      ...required,
      message: 'Это поле обязательно к заполнению'
    })
    extend('email', {
      ...email,
      message: 'Это поле должно быть правильной почтой'
    })
  },
  methods: {
    sendMessage () {
      this.logInUser(this.form)
    },
    showSingUp () {
      this.$emit('close')
      this.$modal.show(
        ModalSignUp,
        {
        },
        {},
        {}
      )
    },
    showRecover () {
      this.$emit('close')
      this.$modal.show(
        ModalRecover,
        {
        },
        {},
        {}
      )
      return false
    },

    async logInUser (userData) {
      try {
        await this.$auth.loginWith('local', {
          data: {
            ...userData,
            email: userData.phone_number
          }
        })
        // eslint-disable-next-line no-console
        this.$emit('close')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        this.formError = 'Неправильные данные для входа'
      }
      // eslint-disable-next-line no-console
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/blocks/auth.scss";
.sign-in {

}

.sign-in__fields {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 2.4rem;

  margin-bottom: 2.8rem;

  @media only screen and (max-width: 600px) {
    grid-gap: 1.8rem;
    margin-bottom: 2rem;
  }

  &-bottom {
  }
}

.sign-in__bottom {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 2.4rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.6rem;
  }
}

.sign-in__button {
  margin-right: 2.4rem;

  @media only screen and (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 0;
  }
}

.sign-in__form-error {
  margin-bottom: 2.4rem;
}
</style>
