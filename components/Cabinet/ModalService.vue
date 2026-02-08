<template lang="pug">
.modal
  .modal__close-space(@click="$emit('close')")
  .modal__body.service
    h4.service__title {{ title }}
    p.service__text {{ text }}
    button.button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.service__button(
      @click="$emit('close')"
    ) {{ buttonText }}
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
    buttonText: {
      type: String,
      default: 'Далее'
    }
    // TODO: callback function; Usage exmp: start welcome interface tutorial
  }
}
</script>

<style lang="scss">
.service {
  background: #1F1F1F;
  border-radius: .8rem;
  border: .1rem solid #282828;

  max-width: 42rem;
  padding: 2.4rem;

  text-align: center;

  position: relative;
  z-index: 0;
}
.service__title {
  font-weight: 400;
  font-size: 2rem;
  line-height: 131.2%;
  letter-spacing: -0.02rem;
  color: #FFFFFF;
  text-transform: uppercase;
  text-align: center;

  margin-bottom: 1.2rem;
}
.service__text {
  font-weight: 300;
  font-size: 1.4rem;
  line-height: 128.7%;
  letter-spacing: -0.07rem;
  color: #8A8A8A;
  text-align: center;

  margin-bottom: 2.4rem;
}
.service__button {
  margin: 0 auto;
}
</style>
