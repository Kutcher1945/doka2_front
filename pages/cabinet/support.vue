<template lang="pug">
.cabinet-index
    .support
      h2.support__title Добро пожаловать в службу поддержки CyberT
      p.support__subtitle Чем мы можем вам помочь?
      ul.support__links
        -
          var items = [
            {
              icon: 'soc-discord',
              name: 'Личный счет',
              link: '',
              preposition: ''
            },
            {
              icon: 'soc-discord',
              name: 'Платформа',
              link: '',
              preposition: ''
            },
            {
              icon: 'soc-discord',
              name: 'Бонусы',
              link: '',
              preposition: ''
            },
            {
              icon: 'soc-telegram',
              name: 'Рейтинг',
              link: '',
              preposition: ''
            }
          ]
        each item in items
          li
            if item.link
              <a href=#{item.link} target="_blank" class="support-link">
            else
              <div class="support-link">
            .support-link__icon-wrapper
              svg-icon(
                name='redesign/' + item.icon
                class=(item.link ? 'support-link__icon' : 'support-link__icon support-link__icon_inactive')
              )
            .support-link__content
              .support-link__name(class=(item.link ? '' : 'support-link__name_inactive'))= (item.link ? "" : "") + item.preposition + " " + item.name
              .support-link__link= item.link
            if item.link
              </a>
            else
              </div>
</template>

<script>
import ModalService from '@/components/Cabinet/ModalService'
import Carousel from '@/components/Cabinet/Carousel.vue'

export default {
  components: { ModalService, Carousel },
  layout: 'cabinet-default',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.cabinet-index {

}
.cabinet-index-menu {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 2.4rem;
}
.cabinet-index__carousel {
  margin-bottom: 2.4rem;
}

.cabinet-index__container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 0.4rem;
}

/*
  ============================================================
  Steps
  ============================================================
*/
.steps {
  background: #141415;
  border-radius: 1.1rem;
  padding: 2rem 2.4rem;
}
.steps__title {
  //font-weight: 700;
  font-variation-settings: 'wght' 700;
  font-size: 2.6rem;
  line-height: 134.7%;
  letter-spacing: 0.03rem;
  color: #754FE0;
  text-align: center;
}
.steps__subtitle {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 13px;
  line-height: 120.2%;
  letter-spacing: 0.03rem;
  color: #8A8A8A;
  text-align: center;
}

/*
  ============================================================
  Support
  ============================================================
*/
.support {
  height: 100%;
  background: #141415;
  border-radius: 1.1rem;
  padding: 3.2rem 2.4rem;
}
.support__title {
  font-variation-settings: 'wght' 700;
  font-size: 2.6rem;
  line-height: 134.7%;
  letter-spacing: 0.03rem;
  color: #754FE0;
  text-align: left;
}
.support__subtitle {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.3rem;
  line-height: 120.2%;
  letter-spacing: 0.03rem;
  color: #FFFFFF;
  text-align: left;

  margin-bottom: 1.2rem;
}
.support__links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 1.4rem 1.8rem;

  @media screen and (max-width: 767px) {
    grid-template-columns: auto;
  }
}
.support-link {
  display: flex;
  align-items: center;
  height: 4.5rem;

  background: #1F1F1F;
  border-radius: .5rem;
}
.support-link__icon-wrapper {
  flex: 0 0 auto;
  padding: 0 1.6rem;
  position: relative;
  &:after {
    content: '';

    width: .1rem;
    height: 3.8rem;
    background: #323232;

    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.support-link__icon {
  color: #754FE0;
  width: 2.6rem;
  height: 2.6rem;

  &_inactive {
    color: #525F63;
  }
}
.support-link__content {
  padding: 0 1.6rem;
}
.support-link__name {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 92.7%;
  letter-spacing: 0.03rem;
  color: #FFFFFF;

  margin-bottom: .2rem;

  &_inactive {
    color: #FFFFFF;
  }
}
.support-link__link {
  //font-weight: 300;
  font-variation-settings: 'wght' 300, 'wdth' 87.5;
  font-size: 1rem;
  line-height: 134.7%;
  letter-spacing: 0.03rem;
  color: #525F63;
}

</style>
