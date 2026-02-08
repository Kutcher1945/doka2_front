<template>
  <div class="footer-docs">

    <a href="/docs#termsOfUse" target="_blank" class="file-link">
      <img src="/images/redesign/aml.svg" class="file-link__icon" alt="icon terms of use" />
      Пользовательское соглашение
    </a>
    <a href="/docs#aml" target="_blank" class="file-link">
      <img src="/images/redesign/terms.svg" class="file-link__icon" alt="icon aml policy" />
      AML политика
    </a>
    <a href="/docs#privacyPolicy" target="_blank" class="file-link">
      <img src="/images/redesign/terms.svg" class="file-link__icon" alt="icon privacy policy" />
      Политика конфиденциальности
    </a>
  </div>
</template>

<script>
export default {
  name: 'FooterDocs'
}
</script>

<style lang="scss" scoped>
.footer-docs {
  display: flex;
  column-gap: 15px;
  margin-left: 15px;

  @media (max-width: 767px){
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin: 0;
  }

  .file-link {
    display: flex;
    align-items: center;
    padding: .7rem 1rem;

    background: #1F1F1F;
    border-radius: .5rem;

    font-variation-settings: 'wght' 300, 'wdth' .75;
    font-weight: 300;
    font-size: 14px;
    line-height: 92.2%;
    /* identical to box height, or 13px */
    letter-spacing: 0.3px;
    color: #ABABAB;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &__icon {
      width: 2rem;
      height: 2rem;

      margin-right: 1.1rem;
    }
  }
}
</style>
