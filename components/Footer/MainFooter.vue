<template>
  <footer class="main-footer">
    <FooterLegalAge :text="legalAgeText" />
    <FooterAddress :text="address" />
    <FooterSocial />
    <FooterDocs />
  </footer>
</template>

<script>

import FooterLegalAge from './FooterLegalAge'
import FooterAddress from './FooterAddress'
import FooterSocial from './FooterSocial'
import FooterDocs from './FooterDocs'

export default {
  name: 'MainFooter',
  components: {
    FooterDocs,
    FooterSocial,
    FooterAddress,
    FooterLegalAge
  },
  data () {
    return {
      legalAgeText: 'Для использования полного функционала платформы CyberT вам должно быть 18+',
      address: 'LTD “ONTOORG ORARIOGRAN”, Boumpoulinas, 1, BOUBOULINAS, 3rd floor, Flat/Office 31 1060, Nicosia, Cyprus'
    }
  }
}
</script>

<style>
.main-footer {
  background: #141415;
  border-top: 1px solid #323232;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px;
  gap: 15px;
  flex-wrap: wrap;
  @media (max-width: 767px){
    flex-direction: column;
  }
}
</style>
