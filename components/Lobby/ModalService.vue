<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .modal__body.modal-service
    h2.modal-service__title {{ title }}

    .modal-service__buttons
      button.button-mode-3.button-mode-3_medium.modal-service__button(@click="$emit('close')") Отмена
      button.button-mode-3.button-mode-3_medium.button-mode-3_highlighted.modal-service__button(@click="() => { $emit('confirm'); $emit('close') }") Пожаловаться
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

.modal-service {
  width: 48.5rem;
  padding: 2.4rem;

  position: relative;

  display: flex;
  flex-direction: column;

  background: #1F1F1F;
  border: .1rem solid #282828;
  border-radius: .8rem;
}
.modal-service__title {
  font-weight: 400;
  font-size: 2rem;
  line-height: 120%;
  color: #FFFFFF;
  text-align: center;
  text-transform: uppercase;

  margin-bottom: 2.4rem;
}
.modal-service__buttons {
  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-service__button {
  &:not(:last-child) {
    margin-right: 1.2rem;
  }
}
</style>
