<template lang="pug">
.password
  ValidationObserver(
    ref="passwordForm"
    v-slot="{ handleSubmit }"
  )
    form(@submit.prevent="handleSubmit(changePassword)").password__form
      ValidationProvider(
        rules="required"
        mode="eager"
        v-slot="{ errors, classes }"
      ).password__field-1
        Input(
          v-model="password"
          label="Сменить пароль"

          type="password"
          name="old_password"
          placeholder="Cтарый пароль"
          :error="errors[0]"
        )
      ValidationProvider(
        rules="required|confirmed:new_password_confirm"
        mode="eager"
        v-slot="{ errors, classes }"
        vid="new_password"
      ).password__field-2
        Input(
          v-model="password_new"
          type="password"
          name="new_password"
          placeholder="Введите новый пароль"
          :error="errors[0]"
        )
      ValidationProvider(
        rules="required|confirmed:new_password"
        mode="eager"
        v-slot="{ errors, classes }"
        vid="new_password_confirm"
      ).password__field-3
        Input(
          v-model="password_new_confirm"
          type="password"
          name="new_password_confirm"
          placeholder="Повторите новый пароль"
          :error="errors[0]"
        )
      button.button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center.field-input__button.password__button(
        type="submit"
      ) Сохранить
    .message_field.error(v-show="password_incorrect") {{ error_message }}
    .message_field.success(v-show="password_changed") Пароль успешно изменен
</template>

<script>
import Input from '@/components/Profile/Input'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { confirmed, required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('confirmed', {
  ...confirmed,
  message: 'Password mismatch'
})

export default {
  components: {
    Input,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      password: '',
      password_new: '',
      password_new_confirm: '',
      error_message: '',
      password_incorrect: false,
      password_changed: false
    }
  },
  methods: {
    async changePassword () {
      /**
       * old_password
       * new_password
       * new_password_copy
       * */
      this.password_incorrect = false
      this.password_changed = false
      try {
        if (this.password_new !== this.password_new_confirm) {
          console.log('Новые пароли не совпадают')
          return
        }

        const data = {
          old_password: this.password,
          new_password: this.password_new,
          new_password_copy: this.password_new_confirm
        }

        const respChangePassword = await this.$axios.$post('/auth/change_password/', data)
        console.log('Пароль успешно изменен')
        // Дополнительные действия после успешной смены пароля
        this.password_changed = true
        this.password = ''
        this.password_new = ''
        this.password_new_confirm = ''

        setTimeout(() => {
          this.password_changed = false // Установка значения в false после 3 секунд
        }, 3000)
      } catch (e) {
        if (e.response && e.response.status === 400) {
          console.log('Ошибка смены пароля: неверные данные')
          this.error_message = 'Ошибка смены пароля: неверные данные'
          // Дополнительные действия при ошибке неверных данных
          this.password_incorrect = true
        } else {
          console.log('Ошибка при смене пароля', e)
          this.error_message = e.error
          // Дополнительные действия при других ошибках
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.password__form {
  display: grid;

  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 10rem;
  grid-gap: 1.2rem .4rem;
}
.password__field {
  &-2 {
    grid-column: 1/2;
  }
}
.message_field {
  margin: 16px 0 0 0;
  &.error {
    color: #5F0000;
  }
  &.success {
    color: #06BD19;
  }
}
</style>
