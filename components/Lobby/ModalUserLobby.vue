<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .modal__body.modal-service
    h2.modal-service__title Ошибка
    div.modal-service__text
      p Сперва освободите слот в другом лобби.
      p Перейдите в лобби {{ GET_CURRENT_LOBBY.id }} и освободите слот.
    .modal-service__buttons
      button.button-mode-3.button-mode-3_medium.modal-service__button(@click="$emit('close')") Закрыть
      NuxtLink.button-mode-3.button-mode-3_medium.button-mode-3_highlighted.modal-service__button(:to="`/cabinet/lobby/${GET_CURRENT_LOBBY.id}`") Перейти в лобби

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserLobby',
  computed: {
    ...mapGetters(['GET_CURRENT_LOBBY'])
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

  background: #1f1f1f;
  border: 0.1rem solid #282828;
  border-radius: 0.8rem;
}
.modal-service__title {
  font-weight: 400;
  font-size: 2rem;
  line-height: 120%;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;

  margin-bottom: 2.4rem;
}
.modal-service__text {
    p {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 153%;
        color: #ffffff;
        text-align: center;
    }

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
