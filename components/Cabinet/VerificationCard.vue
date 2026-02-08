<template>
  <div class="verification-block">
    <div class="verification-block__text">
      Для получения доступа к счёту
      пройдите верификацию аккаунта
    </div>
    <div class="verification-block__divider" />
    <div class="verification-block__button-block">
      <button
        class="button-mode-3 button-mode-3_medium button-mode-3_highlighted button-mode-3_align_center"
        @click.prevent="generateVerificationUrl">
        Верификация
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    generateVerificationUrl () {
      this.$axios
        .$get('/auth/verification/generate_verification_url/', {
          params: {
            user_id: this.$auth.user.id
          }
        })
        .then((response) => {
          console.log('Response: ', response)

          window.location.href = response.url
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.verification-block {
  background: #1F1F1F;
  padding: 8px 12px;
  font-weight: 300;
  color: white;
  font-variation-settings: 'wght' 300;
  font-size: 13px;
  line-height: 14.04px;
  display: flex;
  align-items: center;
  width: 400px;
  justify-content: space-between;
  border-radius: 5px;
  &__text {
    max-width: 205px;
  }
  &__divider {
    margin: 0 auto;
    width: 1px;
    height: 25px;
    background-color: #515151;
  }
  &__button-block {}
}

</style>
