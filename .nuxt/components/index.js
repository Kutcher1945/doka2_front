export { default as CabinetLayout } from '../../components/CabinetLayout.vue'
export { default as MobilePlaceholder } from '../../components/MobilePlaceholder.vue'
export { default as PaymentPage } from '../../components/PaymentPage.vue'
export { default as Tab } from '../../components/Tab.vue'
export { default as Tabs } from '../../components/Tabs.vue'
export { default as CabinetBackToLobby } from '../../components/Cabinet/CabinetBackToLobby.vue'
export { default as CabinetCommission } from '../../components/Cabinet/CabinetCommission.vue'
export { default as CabinetCommissionInfo } from '../../components/Cabinet/CabinetCommissionInfo.vue'
export { default as CabinetCommuniy } from '../../components/Cabinet/CabinetCommuniy.vue'
export { default as CabinetData } from '../../components/Cabinet/CabinetData.vue'
export { default as CabinetFinances } from '../../components/Cabinet/CabinetFinances.vue'
export { default as CabinetCarousel } from '../../components/Cabinet/Carousel.vue'
export { default as CabinetCommunityCarousel } from '../../components/Cabinet/CommunityCarousel.vue'
export { default as CabinetGameCard } from '../../components/Cabinet/GameCard.vue'
export { default as CabinetModalGameConnect } from '../../components/Cabinet/ModalGameConnect.vue'
export { default as CabinetModalGames } from '../../components/Cabinet/ModalGames.vue'
export { default as CabinetModalService } from '../../components/Cabinet/ModalService.vue'
export { default as CabinetNews } from '../../components/Cabinet/News.vue'
export { default as CabinetStars } from '../../components/Cabinet/Stars.vue'
export { default as CabinetUser } from '../../components/Cabinet/User.vue'
export { default as CabinetVerificationCard } from '../../components/Cabinet/VerificationCard.vue'
export { default as CommonCabinetHeader } from '../../components/Common/CabinetHeader.vue'
export { default as CommonCustomTable } from '../../components/Common/CustomTable.vue'
export { default as DocsAML } from '../../components/Docs/AML.vue'
export { default as DocsPrivacyPolicy } from '../../components/Docs/PrivacyPolicy.vue'
export { default as DocsTermsOfUse } from '../../components/Docs/TermsOfUse.vue'
export { default as FooterAddress } from '../../components/Footer/FooterAddress.vue'
export { default as FooterDocs } from '../../components/Footer/FooterDocs.vue'
export { default as FooterLegalAge } from '../../components/Footer/FooterLegalAge.vue'
export { default as FooterSocial } from '../../components/Footer/FooterSocial.vue'
export { default as FooterMainFooter } from '../../components/Footer/MainFooter.vue'
export { default as FriendsFriendCard } from '../../components/Friends/FriendCard.vue'
export { default as HistoryLine } from '../../components/History/HistoryLine.vue'
export { default as LandingFaqAccordion } from '../../components/Landing/FaqAccordion.vue'
export { default as LandingFaqAccordionItem } from '../../components/Landing/FaqAccordionItem.vue'
export { default as LandingGameCard } from '../../components/Landing/GameCard.vue'
export { default as LandingGameCardStar } from '../../components/Landing/GameCardStar.vue'
export { default as LandingGameCardStars } from '../../components/Landing/GameCardStars.vue'
export { default as LandingGamesCarousel } from '../../components/Landing/GamesCarousel.vue'
export { default as LandingFeatures } from '../../components/Landing/LandingFeatures.vue'
export { default as LandingFooter } from '../../components/Landing/LandingFooter.vue'
export { default as LandingLogin } from '../../components/Landing/LandingLogin.vue'
export { default as LandingPreFooter } from '../../components/Landing/LandingPreFooter.vue'
export { default as LandingProve } from '../../components/Landing/LandingProve.vue'
export { default as LandingModalRecover } from '../../components/Landing/ModalRecover.vue'
export { default as LandingModalSignUp } from '../../components/Landing/ModalSignUp.vue'
export { default as LandingModalSingIn } from '../../components/Landing/ModalSingIn.vue'
export { default as LandingPhoneCodeSwitcher } from '../../components/Landing/PhoneCodeSwitcher.vue'
export { default as LobbyCard } from '../../components/Lobby/LobbyCard.vue'
export { default as LobbyPlayer } from '../../components/Lobby/LobbyPlayer.vue'
export { default as LobbySettings } from '../../components/Lobby/LobbySettings.vue'
export { default as LobbyModalReady } from '../../components/Lobby/ModalReady.vue'
export { default as LobbyModalResults } from '../../components/Lobby/ModalResults.vue'
export { default as LobbyModalResultsPlayer } from '../../components/Lobby/ModalResultsPlayer.vue'
export { default as LobbyModalService } from '../../components/Lobby/ModalService.vue'
export { default as LobbyModalUserLobby } from '../../components/Lobby/ModalUserLobby.vue'
export { default as LobbySimilarLobbies } from '../../components/Lobby/SimilarLobbies.vue'
export { default as ProfileFieldCodeConfirm } from '../../components/Profile/FieldCodeConfirm.vue'
export { default as ProfileFieldPassword } from '../../components/Profile/FieldPassword.vue'
export { default as ProfileFieldUsername } from '../../components/Profile/FieldUsername.vue'
export { default as ProfileInput } from '../../components/Profile/Input.vue'
export { default as ProfileIntegration } from '../../components/Profile/Integration.vue'
export { default as ProfilePaymentSettings } from '../../components/Profile/PaymentSettings.vue'
export { default as ProfilePersonalSettings } from '../../components/Profile/PersonalSettings.vue'
export { default as ProfileSocialSettings } from '../../components/Profile/SocialSettings.vue'
export { default as UIButton } from '../../components/UI/Button.vue'
export { default as UICheckBtn } from '../../components/UI/CheckBtn.vue'
export { default as UISearch } from '../../components/UI/Search.vue'
export { default as UIToggleBtn } from '../../components/UI/ToggleBtn.vue'
export { default as WalletBonusSwitcher } from '../../components/Wallet/BonusSwitcher.vue'
export { default as WalletModalPayment } from '../../components/Wallet/ModalPayment.vue'
export { default as WalletModalWithDrawal } from '../../components/Wallet/ModalWithDrawal.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
