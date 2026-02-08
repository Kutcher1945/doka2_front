<template lang="pug">
.news
  .header.news__header
    .header__tabs
      button.header__tab(
        v-for="tab in tabs"
        :class="{ 'header__tab_active': tab.slug === activeTab }"
        @click.prevent="selectTab(tab.slug)"
      )
        svg-icon(:name="tab.icon").header__tab-icon
    .header__content
      h4.header__title СООБЩЕСТВО CYBERT
      p.header__subtitle Следи за новостями, не выходя с платформы.

  .news__body(
    :style="{ backgroundImage: news[activeTab] ? 'url(' + news[activeTab].background + ')' : '' }"
  )
    .news__content(
      v-html="news[activeTab] ? news[activeTab].content : ''"
    )
</template>

<script>
export default {
  data () {
    return {
      activeTab: '',
      tabs: [
        {
          slug: 'vk',
          icon: 'redesign/soc-vk'
        },
        {
          slug: 'discord',
          icon: 'redesign/soc-discord'
        },
        {
          slug: 'twitch',
          icon: 'redesign/soc-twitch'
        },
        {
          slug: 'tiktok',
          icon: 'redesign/soc-tiktok'
        },
        {
          slug: 'telegram',
          icon: 'redesign/soc-telegram'
        },
        {
          slug: 'instagram',
          icon: 'redesign/soc-instagram'
        }
      ],
      news: {
        vk: {
          content: `
            <h1>ICEFROG камбекает в доту?</h1>
            <p>Ранее ходили слухи, что известный разработчик нашей с вами любимой доты практически ею не занимался, а был поглощен разработкой новой игры - NEON PRIME.</p>
            <br>
            <p>В сети это начали бурно обсуждать после интервью скиттера (Участник европейского коллектива Tundra Esports и победитель TI11). Процитируем интервью...</p>
            <br>
            <a href="#">Перейти в VK</a>
          `,
          background: '/images/redesign/news-1.png'
        },
        discord: {
          content: `
            <h1>Наш Discord канал.</h1>
            <p>На наших серверах в Discord играют в разные игры, обсуждают новости в мире киберспорта и учавствуют в турнирах. Здесь можно не только найти себе тиммейтов, но и лампово провести время с единомышленниками.</p>
            <p>Одним из полюбившихся нашими пользователями турниров является 1v1 Mid Only.</p>
            <p>Призы мы дарим не только победителям турниров, но и активным пользователям нашего Discord канала.</p>
            <br>
            <a href="#">Перейти в Discord</a>
          `,
          background: '/images/redesign/news-2.png'
        },
        twitch: {},
        tiktok: {},
        telegram: {
          content: `
            <h1>ИИ уже везде.</h1>
            <p>Пользователь Reddit под ником ambientcouch научил нейросеть рисовать персонажей для сериала «Ведьмак», используя информацию из игры The Witcher 3: The Wild Hunt. Результат он выложил в соответствующий раздел на площадке.</p>
            <br>
            <p>С помощью технологий были созданы реалистичные портреты Геральта, Трисс, Йеннифэр и других героев видеоигры...</p>
            <br>
            <a href="#">Читать полностью в Telegram</a>
          `,
          background: '/images/redesign/news-5.png'
        },
        instagram: {
          content: `
            <h1>Топ 3 имбовых героев, с высоким винрейтом в новом патче.</h1>
            <p>Razor</p>
            <p>В период с ноября 2022г. по январь 2023г. винрейт увеличился с 47.83% до 54.78%.</p>
            <ol>
              <li>В последнем патче увеличили урон шарда со 150 до 175;</li>
              <li>Талант 10 уровня к ловкости увеличен с 9 до 12;</li>
              <li>И, конечно же, выход арканы 17 ноября повлиял на винрейт данного героя.</li>
            </ol>
            <br>
            <p>Treant Protector</p>
            <p>В период с ноября 2022г. по январь 2023. винрейт увеличился с 50.74% до 53.80%...</p>
            <br>
            <a href="#">Читать полностью в Telegram</a>
          `,
          background: '/images/redesign/news-6.png'
        }
      }
    }
  },
  mounted () {
    this.activeTab = this.tabs[0].slug
  },
  methods: {
    selectTab (slug) {
      this.activeTab = slug
    }
  }
}
</script>

<style lang="scss" scoped>
.news {
  background: #141415;
  border-radius: 1.1rem;
  overflow: hidden;

  position: relative;
}
.news__header {
  position: absolute;
  top: 1rem;
  left: 1.6rem;
}
/*
  ============================================================
  Header
  ============================================================
*/
.header {
  display: flex;
  align-items: center;
}
.header__tabs {
  display: grid;
  grid-template-columns: repeat(6, 4.5rem);
  grid-gap: .8rem;

  margin-right: 1.2rem;
}
.header__tab {
  width: 4.5rem;
  height: 4.5rem;
  background: #1F1F1F;
  border-radius: .5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  &-icon {
    width: 2.6rem;
    height: 2.6rem;
    color: #754FE0;
  }

  &_active,
  &:hover {
    background: #754FE0;
    .header__tab-icon {
      color: #FFFFFF;
    }
  }
}
.header__content {
  height: 4.5rem;
  padding: 0 1.4rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  background: #1F1F1F;
  border-radius: .5rem;
}
.header__title {
  //font-weight: 700;
  font-variation-settings: 'wght' 700;
  font-size: 2.6rem;
  line-height: 1;
  letter-spacing: .13rem;
  color: #FFFFFF;
}
.header__subtitle {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.3rem;
  line-height: 120.2%;
  letter-spacing: 0.03rem;
  color: #8A8A8A;
}

.news__body {
  padding: (1rem + 4.5rem + 2.4rem) 0 1.6rem 1.6rem;

  background-repeat: no-repeat;
  background-size: auto auto;
  background-position: right center;

}
.news__content {
  max-width: 55rem;

  border-left: .12rem solid #323232;
  padding-left: 1.6rem;
  padding-right: 1.6rem;

  height: 20.5rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: .12rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #323232;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ::v-deep {
    h1, h2, h3, h4, h5, h6 {
      //font-weight: 700;
      font-variation-settings: 'wght' 700;
      font-size: 1.3rem;
      line-height: 127.2%;
      letter-spacing: 0.03rem;
      color: #FFFFFF;

      margin: 0 0 1em 0;

      text-indent: 1em;
    }
    p, li {
      font-weight: 350;
      font-variation-settings: 'wght' 350;
      font-size: 1.3rem;
      line-height: 127.2%;
      letter-spacing: 0.03rem;
      color: #BEBEBE;

      text-indent: 1em;
    }
    ol, ul {
      padding-left: 2.6rem;
    }
    li {
      text-indent: 0;
    }
    a {
      margin-top: auto;

      display: inline-block;
      min-width: 22rem;
      padding: .8rem 2.4rem;
      background: #754FE0;
      border-radius: .5rem;

      font-weight: 300;
      font-variation-settings: 'wght' 300;
      font-size: 1.4rem;
      line-height: 96.2%;
      text-align: center;
      letter-spacing: -0.07rem;
      color: #FFFFFF;
    }
  }
}
</style>
