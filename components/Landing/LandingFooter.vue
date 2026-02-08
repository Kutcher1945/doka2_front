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
            a(href="/docs#termsOfUse" target="_blank").file-link Пользовательское соглашение
            a(href="/docs#privacyPolicy" target="_blank").file-link Политика конфиденциальности
            a(href="/docs#aml" target="_blank").file-link AML политика
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
@import '@/assets/scss/design-system/index';

/*
  ============================================================
  Footer - Premium Glassmorphism Design
  ============================================================
*/
.footer {
  padding: 8rem 0 6rem;
  background: transparent;
  position: relative;

  // Gradient line separator
  &:before {
    content: '';
    width: 90%;
    height: 0.1rem;
    background: linear-gradient(
      90deg,
      rgba(141, 94, 244, 0) 0%,
      rgba(141, 94, 244, 0.6) 50%,
      rgba(141, 94, 244, 0) 100%
    );
    position: absolute;
    top: 0;
    left: 5%;
  }

  @media only screen and (max-width: 600px) {
    padding: 5rem 0 4rem;
  }
}
.footer__container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: $spacing-6;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: $spacing-5;
  }
}

.footer-copyright {
  flex: 1;
  max-width: 60rem;

  @media only screen and (max-width: 900px) {
    max-width: 100%;
    text-align: center;
  }
}

.footer-copyright__main {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  margin-bottom: $spacing-4;

  @media only screen and (max-width: 900px) {
    justify-content: center;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: $spacing-2;
  }
}

.footer-copyright__age {
  @include glass-primary;
  @include border-gradient-purple;

  font-weight: $font-bold;
  font-size: 3.2rem;
  line-height: 1;
  color: $purple-400;

  border-radius: $radius-md;
  padding: 0.8rem 2.4rem;
  text-shadow: 0 0 1rem rgba($purple-400, 0.5);
  flex-shrink: 0;
}

.footer-copyright__text {
  font-family: $font-primary;
  font-weight: $font-light;
  font-size: $text-sm;
  line-height: $leading-relaxed;
  color: $neutral-500;

  &_bold {
    font-weight: $font-medium;
  }
  &_small {
    font-size: $text-xs;
  }
  &_light {
    color: $neutral-400;
  }
  &_margin {
    margin-bottom: $spacing-2;
  }
}

.footer__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-4;
}

.footer__logo {
  &-image {
    width: 28rem;
    height: 6rem;
    filter: drop-shadow(0 0 1rem rgba($purple-500, 0.3));
    transition: filter $transition-base $ease-out;

    &:hover {
      filter: drop-shadow(0 0 2rem rgba($purple-500, 0.5));
    }
  }
}

.footer__mail {
  display: block;
  font-family: $font-primary;
  font-weight: $font-medium;
  font-size: $text-lg;
  line-height: $leading-normal;
  color: $neutral-400;
  text-decoration: none;
  text-align: center;
  @include transition-base(color, text-shadow);

  &:hover {
    color: $purple-400;
    text-shadow: 0 0 1rem rgba($purple-400, 0.4);
  }
}

.footer__soc-links {
  display: grid;
  grid-template-columns: repeat(6, 4rem);
  gap: $spacing-3;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(3, 4rem);
    gap: $spacing-4;
  }
}

.footer__soc-link {
  @include glass-primary;
  @include border-gradient-purple;
  border-radius: $radius-md;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @include transition-base(background, box-shadow, transform, border-color);

  &:hover {
    @include glass-hover;
    transform: translateY(-0.4rem);
    box-shadow: 0 0.8rem 2rem rgba($purple-500, 0.4);

    .footer__soc-link-icon {
      color: $purple-300;
      transform: scale(1.2);
    }
  }

  &-icon {
    color: $purple-500;
    width: 2rem;
    height: 2rem;
    @include transition-base(color, transform);
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
  margin-top: $spacing-3;
  display: flex;
  align-items: center;
  gap: $spacing-5;
  flex-wrap: wrap;

  @media only screen and (max-width: 900px) {
    justify-content: center;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: $spacing-3;
  }
}

.file-link {
  display: inline-block;
  font-family: $font-primary;
  font-weight: $font-medium;
  font-size: $text-base;
  line-height: $leading-normal;
  color: $purple-400;
  text-decoration: none;
  position: relative;
  @include transition-base(color, transform);

  // Underline effect
  &::after {
    content: '';
    position: absolute;
    bottom: -0.2rem;
    left: 0;
    width: 0;
    height: 0.2rem;
    background: linear-gradient(90deg, $purple-400, $purple-600);
    @include transition-base(width);
  }

  &:hover {
    color: $purple-300;
    transform: translateX(0.4rem);

    &::after {
      width: 100%;
    }
  }
}
</style>
