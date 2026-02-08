<template>
  <div class="footer-address" v-html="text" />
</template>

<script>
export default {
  name: 'FooterAddress',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-address {
  max-width: 353px;
  font-weight: 300;
  font-size: 14px;
  line-height: 135%;
  /* or 19px */

  letter-spacing: 0.3px;

  color: #FFFFFF;
}
</style>
