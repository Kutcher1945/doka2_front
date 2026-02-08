<template lang="pug">
  .footer
    // /agreement.pdf
    .container.footer__container
      .footer-copyright.footer__copyright
        .footer-copyright__main
          .footer-copyright__age 18+
          .footer-copyright__text.footer-copyright__text_bold.footer-copyright__text_light
            | Для использования полного функционала соревновательной платформы CyberT вам должно быть 18+
        .footer-copyright__text.footer-copyright__text_small.footer-copyright__text_bold.
        .footer-copyright__text.footer-copyright__text_small
          br
          | LTD “ONTOORG ORARIOGRAN”, Boumpoulinas,
          br
          | 1, BOUBOULINAS, 3rd floor, Flat/Office 31
          br
          | 1060, Nicosia, Cyprus
          br
          .file-links
        a(href="/docs#termsOfUse" target="_blank").file-link
          br
          | Пользовательское соглашение
        a(href="/docs#privacyPolicy" target="_blank").file-link
          | Политика конфиденциальности
        a(href="/docs#aml" target="_blank").file-link
          | AML политика
      .footer__main
        .footer__logo
          svg-icon(name="logo").footer__logo-image
        a(href="mailto:support@cybert.com").footer__mail support@cybert.com
        ul.footer__soc-links
          -
            var items = [
              // {
              //   name: 'youtube',
              //   link: '#',
              //   icon: 'redesign/soc-youtube'
              // },
              // {
              //   name: 'vk',
              //   link: 'https://vk.com/cybert.online',
              //   icon: 'redesign/soc-vk'
              // },
              // {
              //   name: 'instagram',
              //   link: 'https://www.instagram.com/cybertgames/',
              //   icon: 'redesign/soc-instagram'
              // },
              // {
              //   name: 'twitch',
              //   link: 'https://www.twitch.tv/cybertonline',
              //   icon: 'redesign/soc-twitch'
              // }
              {
                name: 'vk',
                link: 'https://vk.com/cybert.online',
                icon: 'redesign/soc-vk'
              },
              {
                name: 'tiktok',
                link: 'https://www.tiktok.com/@cybert.games',
                icon: 'redesign/soc-tiktok'
              },
              {
                name: 'instagram',
                link: 'https://www.instagram.com/cybertgames/',
                icon: 'redesign/soc-instagram'
              },
              {
                name: 'twitch',
                link: 'https://www.twitch.tv/cybertonline',
                icon: 'redesign/soc-twitch'
              },
              {
                name: 'discord',
                link: 'https://discord.gg/6VSkWvRJ',
                icon: 'redesign/soc-discord'
              },
              {
                name: 'telegram',
                link: 'https://t.me/Cybertgames',
                icon: 'redesign/soc-telegram'
              }
            ]
          each item in items
            li
              a(href= item.link target="_blank").footer__soc-link
                svg-icon(name= item.icon).footer__soc-link-icon
</template>

<script>
export default {
  name: 'LandingFooter'
}
</script>

<style lang="scss" scoped>
/*
  ============================================================
  Footer
  ============================================================
*/
.footer {
  padding: 5.5rem 0;

  position: relative;
  &:before {
    content: '';

    width: 86%;
    height: .1rem;

    background: linear-gradient(90deg, rgba(217, 217, 217, 0) 0%, #D9D9D9 51.67%, rgba(217, 217, 217, 0) 100%);

    position: absolute;
    top: -.05rem;
    left: 12%;
  }
}
.footer__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
    row-gap: 24px;
  }
}
.footer-copyright {

}
.footer-copyright__main {
  display: flex;
  align-items: center;
  column-gap: 6px;
  @media only screen and (max-width: 600px) {
    column-gap: 16px;
  }
}
.footer-copyright__age {
  font-weight: 700;
  font-size: 3.1rem;
  line-height: 1;
  color: #292929;

  background: #EBEBEB;
  border-radius: 1rem;
  padding: .3rem 2rem;
  margin-bottom: .6rem;
}
.footer-copyright__text {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.6rem;
  line-height: 125%;
  letter-spacing: -.05rem;
  color: #505050;

  &_bold {
    font-weight: 400;
    font-variation-settings: 'wght' 400;
  }
  &_small {
    font-size: 1.4rem;
  }
  &_light {
    color: #A7A7A7;
  }
  &_margin {
    margin-bottom: .6rem;
  }
}

.footer__main {
}
.footer__logo {
  &-image {
    width: 27rem;
    height: 6rem;
  }
}
.footer__mail {
  display: block;

  font-weight: 300;
  font-size: 2rem;
  line-height: 125%;
  color: #A7A7A7;

  text-decoration: none;
  text-align: center;

  margin-bottom: 1.2rem;
}
.footer__soc-links {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 2.4rem));
  grid-gap: 2.4rem;
  justify-content: center;
}
.footer__soc-link {
  &-icon {
    color: #A04EFF;
    width: 2.4rem;
    height: 2.4rem;
  }
}
/*
  ============================================================
  Copyright
  ============================================================
*/
.copyright {
  display: flex;
  align-items: center;

  background: #141415;
  border-radius: .5rem;
  padding: 1rem 7rem 1rem 6.5rem;

  border-top: .12rem solid #323232;
}
.copyright__logo {
  width: 35rem;
  display: flex;
  justify-content: center;
}
.copyright__rate {
  //font-weight: 700;
  font-variation-settings: 'wght' 700, 'wdth' 87.5;
  font-size: 2.2rem;
  line-height: 1;
  color: #292929;

  background: #EBEBEB;
  border-radius: .3rem;
  padding: .6rem 1rem .2rem;

  margin-right: 1.2rem;
}
.copyright__content {
  margin-right: 2.4rem;
}
.copyright__text {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: .8rem;
  line-height: 137%;
  letter-spacing: 0.05em;
  color: #A7A7A7;
  &_faded {
    color: #505050;
  }
}
.accounts {
  font-variation-settings: 'wght' 300;
  font-weight: 300;
  font-size: 1rem;
  line-height: 110%;
  letter-spacing: 0.05em;
  color: #A7A7A7;

  margin: 0 auto;
}
.file-links {
  margin-left: 2.4rem;
  display: flex;
  align-items: center;
}
.file-link {
  display: block;

  font-weight: 400;
  font-size: 1.7rem;
  line-height: 136%;
  color: #754FE0;

  &:not(:last-child) {
    margin-right: 4rem;
    @media only screen and (max-width: 600px) {
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
}
</style>
