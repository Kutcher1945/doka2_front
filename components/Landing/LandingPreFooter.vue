<template lang="pug">
  .pre-footer
    .steps.select-none#steps
      .container
        h2.steps__title Как начать играть
        ul.steps__list
          li.step(:class="{ 'step_active': activeStep === 1 }")
            .step__number 1
            .step__dot
              .step__dot-icon
            h6.step__title Зарегистрируйся
            .step__decoration
              img(src="/images/redesign/landing/step-1.png").step__decoration-image.select-none
          li.step(:class="{ 'step_active': activeStep === 2 }")
            .step__number 2
            .step__dot
              .step__dot-icon
            h6.step__title Пройди верификацию
            .step__decoration
              img(src="/images/redesign/landing/step-2.png").step__decoration-image.select-none
          li.step(:class="{ 'step_active': activeStep === 3 }")
            .step__number 3
            .step__dot
              .step__dot-icon
            h6.step__title Выбери лобби
            .step__decoration
              img(src="/images/redesign/landing/step-3.png").step__decoration-image.select-none
    .modes.select-none
      .container
        h4.modes__title Играй и выигрывай в режимах
        ul.modes__list
          li.mode.mode-1
            svg-icon(name="redesign/mode-1").mode__icon
            | Solo mid 1x1
          li.mode.mode-2
            svg-icon(name="redesign/mode-2").mode__icon
            | All pick
          li.mode.mode-3
            svg-icon(name="redesign/mode-3").mode__icon
            | Captains mode
    .faq
      .container
        h2.faq__title.select-none FAQ
        .faq__content
          FaqAccordion(
            :questions-and-answers="faq"
          ).faq__accordion
          //form.faq__form(
          //  @submit.prevent="sendProposal"
          //)
          //  input(type="text" name="proposal" placeholder="Что еще мы можем улучшить?").faq__input
          //  button.faq__button(type="submit") Отправить
</template>

<script>
import FaqAccordion from '@/components/Landing/FaqAccordion.vue'

export default {
  name: 'LandingPreFooter',
  components: { FaqAccordion },
  data () {
    return {
      activeStep: 1,
      faq: [
        {
          title: 'Как пройдет отбор на бета-тест? Как я узнаю, что меня выбрали?',
          text: 'Вы получите уведомление в Телеграме от нашего бота.'
        },
        {
          title: 'Что делать, если в игре я встречу недобросовестного игрока?',
          text: 'Если встретите подозительного игрока, пожалуйтесь на него на нашем сайте в процессе матча или сразу после его завершения. Если окажется, что он мошенничал и использовал читы, деньги за игру вернутся на ваш игровой счет.'
        },
        {
          title: 'Что потребуется для запуска игры?',
          text: 'Потребуется ПК с рекомендованными системными требованиями, хороший интернет и документ, удостоверяющий вашу личность для верификации аккаунта.'
        },
        {
          title: 'Сколько продлится бета-тест? ',
          text: 'Бета-тестирование платформы начнется сразу после набора нужного количества игроков и продлится 2 месяца. Точная дата окончания может измениться.'
        },
        {
          title: 'Что будет входить в мои обязанности?',
          text: 'Вам нужно будет играть, соревноваться, выводить средства на карту, находить лаги в системе и сообщать о них нам.'
        },
        {
          title: 'Что будет после бета-теста?',
          text: 'После бета-тестирования состоится открытый запуск соревновательной платформы CyberT для всех желающих.'
        },
        {
          title: 'Как мне вывести бонусные 200 ₽?',
          text: 'Чтобы вывести бонусные 200 ₽, нужно их удвоить: для этого соревнуйтесь с другими пользователями платформы и выигрывайте матчи.'
        }
      ]
    }
  },
  mounted () {
    // Cycle through steps animation
    this.stepInterval = setInterval(() => {
      this.activeStep = this.activeStep >= 3 ? 1 : this.activeStep + 1
    }, 4000) // Change step every 4 seconds
  },
  beforeDestroy () {
    if (this.stepInterval) {
      clearInterval(this.stepInterval)
    }
  }
}
</script>

<style lang="scss" scoped>

// Keyframe animations for step glow effect
@keyframes stepGlow {
  0%, 100% {
    box-shadow: 0 8px 32px rgba(141, 94, 244, 0.3);
    border-color: rgba(141, 94, 244, 0.4);
  }
  50% {
    box-shadow: 0 12px 50px rgba(141, 94, 244, 0.6),
                0 0 80px rgba(141, 94, 244, 0.3);
    border-color: rgba(141, 94, 244, 0.7);
  }
}

@keyframes imageGlow {
  0%, 100% {
    filter: drop-shadow(0 4px 20px rgba(141, 94, 244, 0.2))
            brightness(1);
  }
  50% {
    filter: drop-shadow(0 8px 40px rgba(141, 94, 244, 0.6))
            drop-shadow(0 0 60px rgba(141, 94, 244, 0.4))
            brightness(1.2);
  }
}

@keyframes numberPulse {
  0%, 100% {
    text-shadow: 0 0 2rem #8D5EF4;
  }
  50% {
    text-shadow: 0 0 3rem #8D5EF4,
                 0 0 5rem #B999FD;
  }
}

/*
  ============================================================
  Pre-footer
  ============================================================
*/
.pre-footer {
  background-image: url(/images/redesign/landing/background-1.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom center;

  @media only screen and (max-width: 600px) {
    background-size: contain;
    background-repeat: no-repeat;
  }
}
/*
  ============================================================
  Steps
  ============================================================
*/
.steps {
  margin-bottom: 2.4rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 0;
    .container {
      background: #000;
    }
  }
}
.steps__title {
  font-family: 'Colus', sans-serif;
  font-weight: 400;
  font-size: 7rem;
  line-height: 124%;
  color: #FFFFFF;
  text-align: center;

  background: linear-gradient(135deg, #FFFFFF 0%, #B999FD 50%, #8D5EF4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  position: relative;
  margin-bottom: 8rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 12rem;
    height: 0.4rem;
    background: linear-gradient(90deg, transparent, #8D5EF4, transparent);
    border-radius: 2px;
  }

  @media only screen and (max-width: 600px) {
    font-size: 48px;
  }
}
.steps__list {
  display: grid;
  grid-template-columns: repeat(3, 30rem);
  grid-gap: 8rem;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
    grid-gap: 0;
  }
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 3.5rem;
  border-radius: 2rem;
  background: rgba(20, 20, 21, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  // Inactive state - grayed out
  .step__number {
    color: #474747;
    transition: all 0.6s ease;
  }

  .step__title {
    color: #6B6B6B;
    transition: all 0.6s ease;
  }

  .step__decoration-image {
    filter: grayscale(100%) brightness(0.4) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3));
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px);
    background: rgba(141, 94, 244, 0.1);
    border-color: rgba(141, 94, 244, 0.3);
    box-shadow: 0 10px 40px rgba(141, 94, 244, 0.2);

    .step__number {
      color: #FFFFFF;
      text-shadow: 0 0 2rem #8D5EF4;
    }

    .step__title {
      color: #FFFFFF;
    }

    .step__decoration-image {
      filter: grayscale(0%) brightness(1) drop-shadow(0 4px 20px rgba(141, 94, 244, 0.4));
    }
  }

  &_active {
    background: rgba(141, 94, 244, 0.15);
    border-color: rgba(141, 94, 244, 0.4);
    animation: stepGlow 3s ease-in-out infinite;

    .step__number {
      color: #FFFFFF;
      animation: numberPulse 3s ease-in-out infinite;
    }

    .step__dot {
      &-icon {
        background: #9B67CF;
        box-shadow: 0 0 2.5rem #9B67CF;
        animation: pulse 2s ease-in-out infinite;
      }
    }

    .step__title {
      color: #FFFFFF;
      text-shadow: 0 0 2.5rem #9B67CF;
    }

    .step__decoration-image {
      filter: grayscale(0%) brightness(1.1) drop-shadow(0 4px 20px rgba(141, 94, 244, 0.4));
      animation: imageGlow 3s ease-in-out infinite;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 2.5rem #9B67CF;
  }
  50% {
    box-shadow: 0 0 4rem #9B67CF, 0 0 6rem rgba(155, 103, 207, 0.5);
  }
}
.step__number {
  font-family: 'Colus', sans-serif;
  font-size: 7rem;
  line-height: 124%;
  color: #474747;
  text-shadow: 0 0 3.7rem rgba(155, 103, 207, 0.51);

  margin-bottom: .6rem;
  @media only screen and (max-width: 600px) {
    color: #fff;
  }
}
.step__dot {
  width: 100%;
  position: relative;

  margin-bottom: 1.4rem;

  &:after {
    content: '';

    width: calc(100% - 1.6rem - 1.6rem + 10rem);
    height: .2rem;

    position: absolute;
    left: calc(50% + 1.6rem);
    top: 50%;
    transform: translateY(-50%);

    background: #474747;
    @media only screen and (max-width: 600px) {
      content: none;
    }

  }

  &-icon {
    margin: 0 auto;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: #474747;
    @media only screen and (max-width: 600px) {
        background: #9B67CF;
        box-shadow: 0 0 2.5rem #9B67CF;
    }
  }
}
.step__title {
  font-family: 'Colus', sans-serif;
  font-size: 2.5rem;
  line-height: 130%;
  text-align: center;
  word-wrap: break-word;
  hyphens: auto;

  min-height: 8rem;

  color: #474747;
  text-shadow: 0 0 2.5rem rgba(155, 103, 207, 0.44);

  margin-bottom: 1.2rem;
  padding: 0 0.5rem;

  @media only screen and (max-width: 600px) {
    color: #fff;
  }
}
.step__decoration {
  &-image {
    width: 24.8rem;
    height: 16.9rem;
    // Filter is now controlled by the step state (active/inactive/hover)
  }
}
.step:last-child {
  .step__dot:after {
    display: none;
  }
}
/*
  ============================================================
  Modes
  ============================================================
*/
.modes {
  margin-bottom: 4.8rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 0;
    .container {
      background: #000;
    }
  }
}
.modes__title {
  font-family: 'Colus', sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  line-height: 124%;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 4.8rem;

  background: linear-gradient(135deg, #FFFFFF 0%, #B999FD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media only screen and (max-width: 600px) {
    padding-top: 100px;
  }
}
.modes__list {
  display: grid;
  grid-template-columns: repeat(3, 28.5rem);
  grid-gap: 6.4rem;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
    grid-gap: 24px;

  }
}
.mode {
  background: linear-gradient(135deg, rgba(141, 94, 244, 0.1) 0%, rgba(185, 153, 253, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(141, 94, 244, 0.2);
  box-shadow: 0 4px 30px rgba(141, 94, 244, 0.2);
  border-radius: 1.6rem;

  font-family: 'Colus', sans-serif;
  font-size: 2.5rem;
  line-height: 124%;
  color: #FFFFFF;

  position: relative;
  padding: 2rem 3rem 2rem 11rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  text-align: left;

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, rgba(141, 94, 244, 0.2) 0%, rgba(185, 153, 253, 0.1) 100%);
    border-color: rgba(141, 94, 244, 0.4);
    box-shadow: 0 8px 40px rgba(141, 94, 244, 0.4);

    .mode__icon {
      transform: translateY(-50%) scale(1.1);
      filter: drop-shadow(0 0 15px rgba(141, 94, 244, 0.6));
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 2rem 2rem 2rem 9rem;
    font-size: 2rem;
  }
}
.mode__icon {
  width: 6rem;
  height: 7.5rem;

  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 10px rgba(141, 94, 244, 0.3));

  @media only screen and (max-width: 600px) {
    width: 5rem;
    height: 6.25rem;
    left: 1.5rem;
  }
}
.mode-1 {
  .mode__icon {
    // Icon position adjusted to be inside
  }
}
.mode-2 {
  .mode__icon {
    // Icon position adjusted to be inside
  }
}
.mode-3 {
  .mode__icon {
    // Icon position adjusted to be inside
  }
}
/*
  ============================================================
  FAQ title
  ============================================================
*/
.faq {
  padding-bottom: 13.5rem;
}
.faq__title {
  font-family: 'Colus', sans-serif;
  font-weight: 400;
  font-size: 12rem;
  line-height: 125%;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 4rem;

  background: linear-gradient(135deg, #FFFFFF 0%, #B999FD 50%, #8D5EF4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 15rem;
    height: 0.5rem;
    background: linear-gradient(90deg, transparent, #8D5EF4, transparent);
    border-radius: 3px;
  }

  @media only screen and (max-width: 600px) {
    padding-top: 100px;
    font-size: 48px;
  }
}
.faq__content {
  max-width: 100rem;
  margin: 0 auto;

  background: rgba(20, 20, 21, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);

  padding: 3rem 4rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(141, 94, 244, 0.2);
    box-shadow: 0 12px 50px rgba(141, 94, 244, 0.15);
  }

  @media only screen and (max-width: 600px) {
    padding: 2rem;
  }
}
.faq__accordion {
  //margin-bottom: 1.6rem;
}
.faq__form {
  display: flex;
  align-items: center;
}
.faq__input {
  flex-grow: 1;
  outline: none;

  background: rgba(217, 217, 217, 0.12);
  border: none;
  padding: .8rem 1.2rem;

  font-size: 2.3rem;
  line-height: 121%;

  color: #FFFFFF;
  &::placeholder {
    color: #B7B7B7;
  }
}
.faq__button {
  flex: 0 0 auto;

  background: linear-gradient(280.78deg, #5F0000 -33.58%, #DB9919 102.08%), rgba(217, 217, 217, 0.12);
  border: none;
  padding: .8rem 1.2rem;

  font-size: 2.3rem;
  line-height: 121%;
  color: #FFFFFF;

  margin-left: 1.6rem;
}
</style>
