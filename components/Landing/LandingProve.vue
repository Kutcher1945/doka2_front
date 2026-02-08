<template lang="pug">
  .prove
    .container
      .prove__content.select-none
        //img(src="/images/redesign/landing/prove.png" alt="").prove__image.select-none
        h2.prove__title
          | Докажи, что игра
          br
          span.highlighted не просто хобби
          br
          | и трата времени
        ul.prove__list-1
          li.prove__text.prove__list-1-item-1
            | Здесь нет места
            br
            .prove__text_accent ливерам
          li.prove__text.prove__list-1-item-2
            | Здесь нет места
            br
            .prove__text_accent смурфам
          li.prove__text.prove__list-1-item-3
            | Здесь нет места
            br
            .prove__text_accent читерам
          li.prove__text.prove__list-1-item-4
            | Здесь нет места
            br
            .prove__text_accent руинерам
        h2.prove__second-title Здесь есть ты!
        ul.prove__list-2
          li.prove__text.prove__list-2-item-1
            | Готов
            br
            | монетизировать свой
            br
            .prove__text_accent скилл
          li.prove__text.prove__list-2-item-2
            | Готов
            br
            | получать
            br
            .prove__text_accent бонусы
          li.prove__text.prove__list-2-item-3
            .prove__text_accent.prove__text_accent_highlighted Готов
            .prove__text_accent.prove__text_accent_highlighted быть частью
            .prove__text_accent.prove__text_accent_larger CyberT
          li.prove__text.prove__list-2-item-4
            | Готов
            br
            | получать
            br
            .prove__text_accent бонусы
          li.prove__text.prove__list-2-item-5
            | Готов
            br
            | сражаться за
            br
            .prove__text_accent победу!
</template>

<script>
export default {
  name: 'LandingProve'
}
</script>

<style lang="scss">

/*
  ============================================================
  Prove
  ============================================================
*/
.prove {
  margin-bottom: 12rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 6rem;
    .container {
      padding: 0;
    }
  }
}
.prove__content {
  text-align: center;
  min-height: 100vh;
  height: auto;
  position: relative;
  background-image: url('/images/redesign/landing/prove.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 4rem 0;

  @media only screen and (max-width: 600px) {
    min-height: 80vh;
    background-size: cover;
  }
}
.prove__image {
  width: 192rem;
  height: 110rem;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 600px) {
    display: none;
  }
}
.prove__title {
  font-family: 'Colus', sans-serif;
  font-size: 3.4rem;
  line-height: 86.9%;
  color: #FFFFFF;
  //text-shadow: 0 .4rem 6.9rem #000000, 0 .4rem 6.9rem #000000;
  .highlighted {
    color: #8D5DF4;
  }

  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  @media only screen and (max-width: 600px) {
    top: 5%;
    font-size: 28px;
    line-height: 113%;
  }
}
.prove__second-title {
  font-family: 'Colus', sans-serif;
  font-size: 6.6rem;
  line-height: 104.4%;
  color: #8D5EF4;
  text-shadow: 0 .4rem 3.9rem #000000, 0 .4rem 6.9rem #000000;

  position: absolute;
  top: 42.5%;
  left: 50%;
  transform: translateX(-50%);
  @media only screen and (max-width: 600px) {
    display: none;
  }
}
.prove__text {
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 121%;
  text-align: center;
  color: #CBCBCB;
  text-shadow: 0 0 .3rem #000000;
  text-transform: uppercase;

  transition: transform .25s;
  &:hover {
    transform: scale(1.1);
    &.prove__list-2-item-3 {
      transform: translateX(-50%) scale(1.1);
    }
  }

  animation-name: proveText;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;

  &_accent {
    font-family: 'Colus', sans-serif;
    font-size: 2.8rem;
    line-height: 125%;
    color: #FFFFFF;
    text-shadow: 0 .4rem 6.9rem #000000, 0 .4rem 6.9rem #000000;
    @media only screen and (max-width: 600px) {
      font-size: 1.8rem;
      color: #F2F2F2;
    }
  }
  &_accent_larger {
    font-size: 4.5rem;
    line-height: 124%;
    text-shadow: 0 .4rem 6rem #FFFFFF;
  }
  &_accent_highlighted {
    color: #8D5EF4;
  }
}

@keyframes proveText {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
.prove__list-1 {
  &-item {
    padding: 1.2rem 2rem;
    background: rgba(20, 20, 21, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.2rem;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(141, 94, 244, 0.15);
      border-color: rgba(141, 94, 244, 0.4);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(141, 94, 244, 0.3);
    }

    &-1 {
      position: absolute;
      top: 30%;
      left: 5%;
      animation-delay: 0.2s;

      @media only screen and (max-width: 1200px) {
        left: 2%;
        top: 28%;
      }
    }
    &-2 {
      position: absolute;
      top: 31%;
      left: 20%;

      @media only screen and (max-width: 1200px) {
        left: 18%;
      }
      @media only screen and (max-width: 600px) {
        display: none;
      }
    }
    &-3 {
      position: absolute;
      top: 31%;
      right: 20%;

      @media only screen and (max-width: 1200px) {
        right: 18%;
      }
      @media only screen and (max-width: 600px) {
        right: 2%;
        top: 28%;
      }
    }
    &-4 {
      position: absolute;
      top: 30%;
      right: 5%;
      animation-delay: 0.2s;

      @media only screen and (max-width: 1200px) {
        right: 2%;
        top: 28%;
      }
    }

    &-1,
    &-4 {
      color: #9E9E9E;
      .prove__text_accent {
        color: #B8B8B8;
        font-size: 2rem;
        font-weight: 800;
      }
    }

    &-2,
    &-3 {
      color: #AEAEAE;
      .prove__text_accent {
        color: #D4D4D4;
        font-size: 2rem;
        font-weight: 800;
      }
    }
  }
}
.prove__list-2 {
  &-item {
    &-1 {
      position: absolute;
      bottom: 18.5%;
      left: 4%;
      animation-delay: 1s;
      @media only screen and (max-width: 600px) {
        display: none;
      }
    }
    &-2 {
      position: absolute;
      left: 20%;
      bottom: 15%;
      @media only screen and (max-width: 600px) {
        display: none;
      }
    }
    &-3 {
      position: absolute;
      left: 48.5% - 8.5%;
      //transform: translateX(-50%);
      bottom: 9%;
      @media only screen and (max-width: 600px) {
        left: 25%;
      }
    }
    &-4 {
      position: absolute;
      right: 24.5%;
      bottom: 15%;
      @media only screen and (max-width: 600px) {
        display: none;
      }
    }
    &-5 {
      position: absolute;
      bottom: 18.5%;
      right: 8%;
      animation-delay: 1s;
      @media only screen and (max-width: 600px) {
        display: none;
      }
    }

    &-1,
    &-5 {
      font-size: 1.2rem;
      color: #303030;
      .prove__text_accent {
        color: #3C3C3C;
      }
    }

    &-2,
    &-4 {
      color: #686868;
      .prove__text_accent {
        color: #9C9C9C;
      }
    }
  }
}
</style>
