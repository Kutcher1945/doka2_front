<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .auth-modal.recover
    button.auth-modal__close-button(@click="$emit('close')" type="button") ×

    .recover__main(v-if="!emailSend")
      .auth-modal__title.recover__title Забыли пароль?
      .auth-modal__text.recover__subtitle Введите email связанный с Вашим аккаунтом. Мы отправим Вам письмо с инструкцией

      ValidationObserver(ref="form" v-slot="{ handleSubmit }")
        form.form.recover__form(@submit.prevent="handleSubmit(sendMessage)")

          .form__fields.recover__fields
            ValidationProvider(
              rules="required|email"
              mode="eager"
              v-slot="{ errors, classes }"
              vid="email"
              tag="label"
            ).field.recover__form-field
              .field__container(:class="classes")
                input(type="email" name="email" v-model="email" placeholder="Enter your email").field__input
                .auth-modal__error.field__error(v-if="errors[0]") {{ errors[0] }}

          .recover__button
            button.auth-modal__button Отправить
            //.auth-modal__error.recover__form-error(v-if="formError") {{ formError }}

          .auth-modal__text.auth-modal__redirect Вспомнили пароль?
            button(@click="showSingIn()").auth-modal__text-highlighted Войти

    .recover__success(v-else)
      .auth-modal__title.recover__title Успех!
      .auth-modal__text.recover__subtitle Проверьте почту. Мы отправили Вам письмо с инструкцией
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import ModalSingIn from './ModalSingIn'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      email: '',
      emailSend: false
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
    async sendMessage () {
      const data = {
        email: this.email
      }

      await this.$axios
        .$post('/auth/restore_password/', {
          ...data
        })
        .then((response) => {
          console.log(response)
          this.emailSend = true
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/blocks/auth.scss";
.recover__title {
  margin-bottom: 1.6rem;
}
.recover__subtitle {
  margin: 0 auto 2rem;
}
.recover__fields {
  margin-bottom: 2.4rem;
}
.recover__button {
  display: block;

  position: relative;

  margin-bottom: 1.2rem;
}
.recover__form-error {
  position: absolute;
  left: calc(100% + 1.2rem);
  top: 50%;
  transform: translateY(-50%);
}
</style>
