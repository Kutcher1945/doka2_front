<template lang="pug">
  .username
    .username__field(v-if="!isChangeUsernameActive")
      Input(
        v-model="username"
        :disabled="true"
        label="Никнэйм и id"
        type="text"
        name="username"
      )
      //button.button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center(
      //  @click.prevent="copy"
      //) Копировать
      button.button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center(
        @click.prevent="isChangeUsernameActive = true"
      ) Изменить
    ValidationObserver(
      v-else

      ref="usernameForm"
      v-slot="{ handleSubmit }"
    )
      form(
        @submit.prevent="handleSubmit(changeUsername)"
      ).username__form
        ValidationProvider(
          rules="required"
          mode="eager"
          v-slot="{ errors, classes }"
        )
          Input(
            v-model="username"
            label="Никнэйм и id"
            type="text"
            name="username_edit"
          )
        button(type="submit").button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center Сохранить
</template>

<script>
import Input from '@/components/Profile/Input'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { email, required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('email', {
  ...email,
  message: 'Please type your email'
})

export default {
  components: {
    Input,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      isChangeUsernameActive: false,
      username: this.$auth.user.username
    }
  },
  methods: {
    copy () {
      console.log('Copy! maybe...')
    },
    async changeUsername () {
      console.log('Save username')

      await this.$axios.$put('/auth/data/', {
        username: this.username
      }, {
        headers: {
          Authorization: this.$auth.$storage.getUniversal('_token.local')
        }
      }).catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
      })

      this.$auth.fetchUser()
      this.isChangeUsernameActive = false
    }
  }
}
</script>

<style lang="scss" scoped>
.username__field {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 12rem 12rem;
  //grid-template-columns: 22rem auto;
  align-items: flex-end;
  grid-gap: .4rem;
}
.username__form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 12rem;
  align-items: flex-end;
  grid-gap: .4rem;
}
</style>
