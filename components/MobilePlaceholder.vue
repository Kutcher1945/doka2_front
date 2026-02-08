<!-- components/MobilePlaceholder.vue -->
<template>
  <div class="mobile-placeholder">
    <h1>Извините, мобильная версия сайта еще не готова.</h1>
    <p>Пожалуйста, посетите наш сайт с компьютера.</p>
  </div>
</template>

<script>
export default {
  name: 'MobilePlaceholder'
}
</script>

<style lang="scss">
  .mobile-placeholder {
    color: #fff;
    h1 {
      font-size: 32px;
      line-height: 123%;
    }
    p {
      font-size: 24px;
      font-style: italic;
      line-height: 123%;
    }
  }
</style>
