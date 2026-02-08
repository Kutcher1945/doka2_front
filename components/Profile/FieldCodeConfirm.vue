<template lang="pug">
// settings field
  // disabled field + edit button
  // Validation Observer
   // ValidationProvider email field + not exact
   // Send code button
   // Discard button
  // ValidationObserver code
   // ValidaionProvider code
   // Confirm button
   // NOTE: whether it's link with unique id? What if reload page?
.code-confirm
  .code-confirm__field(v-if="!edit")
    Input(
      v-model="value"
      :disabled="true"
      :label="label"

      type="text"
      :name="changingValueName"
    )
    // TODO: autofocus on input on click
    //button.button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center(
    //  @click.prevent="edit = true"
    //) Изменить
  ValidationObserver(
    v-else

    :ref="changingValueName + 'Form'"
    v-slot="{ handleSubmit }"
  )
    form(
      @submit.prevent="handleSubmit(sendCode)"
    ).code-confirm__form
      ValidationProvider(
        rules="required"
        mode="eager"
        v-slot="{ errors, classes }"
      )
        Input(
          v-model="value"
          :label="label"
          type="text"
          :name="changingValueName + '_edit'"
        )
      button(type="submit").button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center Получить код
  ValidationObserver(
    v-if="codeInput"

    :ref="changingValueName + 'CodeForm'"
    v-slot="{ handleSubmit }"
  )
    form(
      @submit.prevent="handleSubmit(confirmCode)"
    ).code-confirm__code
      ValidationProvider(
        rules="required"
        mode="eager"
        v-slot="{ errors, classes }"
      )
        Input(
          v-model="code"
          type="text"
          name="code"
        )
        //PincodeInput(
        //  v-model="phone.code"
        //  placeholder=" "
        //  :length="6"
        //).field-code__input
      button(type="submit").button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center Подтвердить
</template>

<script>
import Input from '@/components/Profile/Input'
import PincodeInput from 'vue-pincode-input'
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
    PincodeInput,
    ValidationObserver,
    ValidationProvider
  },
  props: {
    changingValue: String,
    changingValueName: String,
    label: String
  },
  data () {
    return {
      value: this.changingValue,
      code: '',
      edit: false,
      codeInput: false
    }
  },
  methods: {
    sendCode () {
      console.log('Send code')
      this.codeInput = true
    },
    confirmCode () {
      console.log('Confirm code')
      this.phoneCode = ''
      this.codeInput = false
      this.edit = false
    }
  }
}
</script>

<style lang="scss" scoped>
.code-confirm__field {
  display: grid;
  //grid-template-columns: minmax(0, 1fr) 12rem 12rem;
  grid-template-columns: 22rem;
  grid-gap: .4rem;
  align-items: flex-end;
}
.code-confirm__form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 12rem 12rem;
  grid-gap: .4rem;
  align-items: flex-end;

  margin-bottom: 1.2rem;
}
.code-confirm__code {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 12rem 12rem;
  grid-gap: .4rem;
  align-items: flex-end;
}
</style>
