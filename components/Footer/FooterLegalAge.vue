<template>
  <div class="legal-age">
    <div class="legal-age__age">18+</div>
    <div class="legal-age__text">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'FooterLegalAge',
  props: {
    text: {
      type: String,
      default: 'Для использования полного функционала платформы CyberT вам должно быть 21+'
    }
  }
}
</script>

<style lang="scss" scoped>
.legal-age {
  display: flex;
  align-items: center;
  column-gap: 16px;

  &__age {
    background: #EBEBEB;
    border-radius: 3px;
    padding: 12.5px 7px 12.5px 9px;
    font-weight: 700;
    font-size: 22px;
    line-height: 15px;
    /* identical to box height, or 68% */
    text-align: center;
    color: #292929;
  }

  &__text {
    font-weight: 300;
    font-size: 14px;
    line-height: 135%;
    /* or 19px */
    letter-spacing: 0.3px;

    color: #FFFFFF;
    max-width: 300px;
    min-width: 300px;
  }
}
</style>
