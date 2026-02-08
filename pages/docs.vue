<template lang="pug">
.docs
  .docs__container
    Tabs
      Tab(title="Политика конфиденциальности" icon="redesign/privacy" slug="privacyPolicy")
        PrivacyPolicy.docs__item
      Tab(title="Пользовательское соглашение" icon="redesign/offer" slug="termsOfUse")
        TermsOfUse.docs__item
      Tab(title="AML политика" icon="redesign/invites" slug="aml")
        AML.docs__item
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import TermsOfUse from '@/components/Docs/TermsOfUse.vue'
import PrivacyPolicy from '@/components/Docs/PrivacyPolicy.vue'
import AML from '@/components/Docs/AML.vue'
export default {
  components: {
    Tabs,
    Tab,
    TermsOfUse,
    PrivacyPolicy,
    AML
  },
  layout: 'cabinet-empty',
  auth: false
}
</script>

<style lang="scss" scoped>
.docs {
  width: 95vw;
  height: 90vh;
  margin: 0 auto;
  margin-top: 5vh;
  flex-grow: 1;

  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 0;
  }
}
.docs__container {
  background: #141415;
  border-radius: 1.1rem;
  padding: 1.6rem 3.2rem;
  @media screen and (max-width: 767px) {
    padding: 1.6rem;
  }
}

.docs__item {
  background: #1F1F1F;
  border-radius: .5rem;
  padding: 1.6rem 3.2rem;
  height: auto;
  max-height: 80vh;
  overflow: auto;

  @media screen and (max-width: 767px) {
    padding: 1.6rem;
  }
  &::-webkit-scrollbar {
    width: .12rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #323232;
  }

  ::v-deep {
    h1 {
      font-weight: 300;
      font-variation-settings: 'wght' 300, 'wdth' .75;
      font-size: 2rem;
      line-height: 116.7%;
      letter-spacing: 0.03rem;
      color: #FFFFFF;

      margin: 0 0 1em 0;
    }
    h2 {
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 116.7%;
      letter-spacing: 0.03rem;
      text-transform: uppercase;
      color: #FFFFFF;

      margin: 0 0 1em 0;
    }
    p, li {
      font-weight: 350;
      font-size: 1.6rem;
      line-height: 116.7%;
      letter-spacing: 0.03rem;
      color: #FFFFFF;
    }
    p {
      margin-bottom: 1em;
    }
    ul {
      margin-bottom: 1.6rem;
    }
    li {
      margin-bottom: 1em;
    }

    a {
      color: #754FE0;
      word-break: break-all;
      text-wrap: wrap;
      display: none;
    }
  }
}
</style>
