<template lang="pug">
.field
  .field__label(v-if="label") {{ label }}
  .field__container
    input(
      :value="value"
      @input="$emit('input', $event.target.value)"

      :type="type ? type : 'text'"
      :name="name"
      :placeholder="placeholder"
      :maxlength="maxlength ? maxlength : ''"
      :disabled="disabled ? disabled : false"
    ).field__input
  .field__error(v-if="error") {{ error }}
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    type: String,
    name: String,
    placeholder: String,
    maxlength: Number,
    disabled: Boolean,
    error: String
  }
}
</script>

<style lang="scss" scoped>
.field {
  //&.invalid {
  //  border-color: #FF7A00;
  //}
}
.field__label {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #525F63;

  margin-bottom: .3rem;
}
.field__container {
  height: 2.7rem;

  display: flex;
  align-items: center;
  padding: 0 .8rem;

  background: #1F1F1F;
  border-radius: .5rem;
}
.field__input {
  background: none;
  border: none;
  padding: 0;
  outline: none;
  width: 100%;

  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;

  color: #FFFFFF;
  &::placeholder {
    color: #525F63;
  }
}
.field__error {
  color: red;
  margin-top: .2rem;
}
</style>
