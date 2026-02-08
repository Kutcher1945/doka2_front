<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .auth-modal.sign-up
    button.auth-modal__close-button(@click="$emit('close')" type="button") ×

    .auth-modal__title Создать аккаунт

    ValidationObserver(ref="form" v-slot="{ handleSubmit, errors }")
      form.form(@submit.prevent="handleSubmit(signUp)")

        .form__fields.sign-up__fields

          ValidationProvider(
            rules="required|email"
            mode="eager"
            v-slot="{ errors, classes }"
            vid="name"
            tag="label"
          ).field
            .field__container(:class="classes")
              input(type="text" name="name" v-model="form.email" placeholder="Введите Email").field__input
              .auth-modal__error.field__error(v-if="errors[0]") {{ errors[0] }}

          // Phone
          ValidationObserver(
            v-slot="{ handleSubmit, errors }"
            tag="div"
          ).field
            form(@submit.prevent="handleSubmit(sendSms)")
              .field-phone
                .field__container(:class="{ 'invalid': errors['phone-number'] && errors['phone-number'].length }")
                  PhoneCodeSwitcher(@codeChanged="codeChanged").field-phone__switcher
                  ValidationProvider(
                    rules="required"
                    mode="eager"
                    vid="phone-number"
                    v-slot="{ classes, errors }"
                    tag="label"
                  ).field-phone__container
                    span.field-phone__code {{ phone.language.code }}
                    the-mask(
                      :mask="phone.language.mask"
                      v-model="phone.number"
                    ).field__input
                    .auth-modal__error.field__error(v-if="errors[0]") {{ errors[0] }}

          // rules="required|min:10|regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).+$/ |confirmed:password2"
          // rules="{ required: true }"
          ValidationProvider(
            mode="eager"
            :rules="{ required: true, min: 10, regex: passwordRegex, confirmed: 'password2' }"
            v-slot="{ errors, classes }"
            vid="password"
            tag="label"
          ).field
            .field__container(:class="classes")
              input(
                type="password"
                name="password"
                v-model="form.password"
                placeholder="Пароль"
              ).field__input
              .auth-modal__error.field__error(v-if="errors[0]") {{ passwordErrorHandler(errors[0]) }}

          ValidationProvider(
            rules="required|confirmed:password"
            mode="eager"
            v-slot="{ errors, classes }"
            vid="password2"
            tag="label"
          ).field
            .field__container(:class="classes")
              input(type="password" name="password" v-model="form.password2" placeholder="Повторите пароль").field__input
              .auth-modal__error.field__error(v-if="errors[0]") {{ errors[0] }}

        .form__checkboxes.sign-up__checkboxes
          ValidationProvider(
            rules="truthy"
            mode="eager"
            v-slot="{ classes }"
            vid="privacy-policy"
            tag="label"
          )
            label.checkbox.sign-up__form-data
              input(type="checkbox" name="privacy-policy" v-model="form.privacy_policy").checkbox__input
              .checkbox__box
              .checkbox__text
                | Я соглашаюсь с
                = " "
                a(href="/docs#termsOfUse" target="_blank").checkbox__link Пользовательским соглашением
                = " "
                |,
                = " "
                a(href="/docs#privacyPolicy" target="_blank").checkbox__link Политикой Конфиденциальности
                = " "
                | и
                = " "
                a(href="/docs#aml" target="_blank").checkbox__link AML политикой
                = " "
                | CyberT
                = " "
        .sign-up__button
          button.auth-modal__button(type="submit") Регистрация
          .auth-modal__error.sign-up__form-error(v-if="observerErrorsHandler(errors)" v-html="observerErrorsHandler(errors)")

    .auth-modal__text.auth-modal__redirect Уже есть аккаунт?
      button(@click="showSingIn()").auth-modal__text-highlighted Войти
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, confirmed, min, regex } from 'vee-validate/dist/rules'
import PhoneCodeSwitcher from './PhoneCodeSwitcher'
import ModalSingIn from './ModalSingIn'

const passwordRegexMessage = 'Пароль должен содержать как минимум по одному из следующих символов: буква верхнего регистра, буква нижнего регистра, цифра, специальный символ'
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).+$/

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    PhoneCodeSwitcher
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        password2: '',
        privacy_policy: false
      },
      phone: {
        language: '',
        number: ''
      },
      formError: '',
      passwordRegex
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
    extend('confirmed', {
      ...confirmed,
      message: 'Пароли не совпадают'
    })
    extend('truthy', {
      validate (value, args) {
        return value
      },
      message: 'Согласитесь с Политикой Конфиденциальности'
    })
    extend('min', {
      ...min,
      message: 'Пароль должен содержать как минимум 10 символов'
    })
    extend('regex', {
      ...regex,
      message: passwordRegexMessage
    })
  },
  methods: {
    async signUp () {
      this.formError = ''
      await this.$axios
        .$post('/auth/users/', {
          phone_number: this.phone.language.code + this.phone.number,
          username: 'Unnamed',
          ...this.form
        })
        .then((response) => {
          // eslint-disable-next-line no-console
          this.$emit('close')
          this.$auth.loginWith('local', {
            data: {
              phone_number: this.phone.language.code + this.phone.number,
              ...this.form
            }
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('errors: ', error.response)
          if (error.response.status === 400 && error.response.data.email) {
            this.formError = error.response.data.email[0]
          }
        })
    },
    codeChanged (language) {
      this.phone.language = language
      this.phone.number = ''
    },
    showSingIn () {
      this.$emit('close')
      this.$modal.show(
        ModalSingIn,
        {
        },
        {},
        {}
      )
    },
    observerErrorsHandler (errors) {
      if (!errors) { return }

      let error = ''

      if (this.formError) {
        error += this.formError + '<br>'
      }

      if (errors['privacy-policy'] && errors['privacy-policy'].length) {
        error += errors['privacy-policy'][0] + '<br>'
      }

      if (errors.password && errors.password.length && errors.password[0] === passwordRegexMessage) {
        error += errors.password[0] + '<br>'
      }

      return error
    },
    passwordErrorHandler (error) {
      if (error === passwordRegexMessage) {
        return ''
      }
      return error
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/blocks/auth.scss";

.sign-up__fields {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 2.4rem;

  margin-bottom: 2.8rem;
  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
  }
}
.sign-up__checkboxes {
  margin-bottom: 2.4rem;
  margin-left: 0;
}
.sign-up__button {
  position: relative;

  margin-bottom: 2.4rem;
}
.sign-up__form-error {
  margin-top: 1rem;
}

.field-phone {
  &__switcher {
    flex: 0 0 auto;

    margin-right: 1.2rem;
  }
  &__code {
    flex: 0 0 auto;

    font-weight: 350;
    font-variation-settings: 'wght' 350;
    font-size: 1.8rem;
    line-height: 134.7%;
    letter-spacing: 0.03rem;
    color: #FFFFFF;
  }
  &__container {
    display: flex;
    align-items: center;

    width: 100%;
  }
}
</style>
