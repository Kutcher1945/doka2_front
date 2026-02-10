<template lang="pug">
.prove#prove
  video.prove__video(autoplay, muted, loop)
    source(src="/video-omen.mp4" type="video/mp4")

  .container
    .prove__content.select-none

      // Main title
      h2.prove__title
        | Докажи, что игра
        br
        span.highlighted не просто хобби
        br
        | и трата времени

      // Top grid - "No place for" cards
      .prove__grid-top
        .prove__card.prove__card_exclude
          .prove__card-label Здесь нет места
          .prove__card-value ливерам
        .prove__card.prove__card_exclude
          .prove__card-label Здесь нет места
          .prove__card-value смурфам
        .prove__card.prove__card_exclude
          .prove__card-label Здесь нет места
          .prove__card-value читерам
        .prove__card.prove__card_exclude
          .prove__card-label Здесь нет места
          .prove__card-value руинерам

      // Middle CTA
      h2.prove__second-title Здесь есть ты!

      // Bottom grid - "Ready to" cards
      .prove__grid-bottom
        .prove__card.prove__card_include
          .prove__card-label Готовый монетизировать свой
          .prove__card-value скилл
        .prove__card.prove__card_include
          .prove__card-label Готовый получать
          .prove__card-value бонусы
        .prove__card.prove__card_featured
          .prove__card-featured-line Готовый
          .prove__card-featured-line быть частью
          .prove__card-featured-brand CyberT
        .prove__card.prove__card_include
          .prove__card-label Готовый получать
          .prove__card-value призы
        .prove__card.prove__card_include
          .prove__card-label Готовый сражаться за
          .prove__card-value победу!
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
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  // Override container to make it full width
  .container {
    max-width: 100%;
    width: 100%;
    padding: 0;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 6rem;
    min-height: 80vh;
  }
}

.prove__video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  z-index: 0;
  object-fit: cover;
  filter: blur(3px);
}
.prove__content {
  text-align: center;
  min-height: 100vh;
  height: auto;
  position: relative;
  padding: 4rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  // Background video replaces static image
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background-image: url('/images/redesign/landing/prove.png');
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   background-position: center center;
  //   filter: blur(3px);
  //   z-index: 0;
  // }

  // Purple gradient overlay
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(141, 94, 244, 0.15) 0%,
      rgba(117, 79, 224, 0.25) 40%,
      rgba(88, 28, 135, 0.3) 70%,
      rgba(20, 20, 21, 0.5) 100%
    );
    z-index: 1;
  }

  // All content on top of background
  > * {
    position: relative;
    z-index: 2;
  }

  @media only screen and (max-width: 600px) {
    min-height: 80vh;
    padding: 3rem 1.6rem;
    gap: 2.4rem;
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
  font-size: 5.2rem;
  line-height: 110%;
  color: #FFFFFF;
  text-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.8);
  margin-bottom: 0;
  font-weight: normal;

  .highlighted {
    color: #8D5DF4;
    text-shadow:
      0 0 3rem rgba(141, 94, 244, 0.8),
      0 0.4rem 2rem rgba(0, 0, 0, 0.8);
    font-size: 5.6rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 3.2rem;
    line-height: 113%;

    .highlighted {
      font-size: 3.6rem;
    }
  }
}
.prove__second-title {
  font-family: 'Colus', sans-serif;
  font-size: 6.6rem;
  line-height: 104.4%;
  color: #8D5EF4;
  text-shadow: 0 .4rem 3.9rem #000000, 0 .4rem 6.9rem #000000;
  margin: 2rem 0;

  @media only screen and (max-width: 600px) {
    font-size: 4.2rem;
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

// Grid layouts
.prove__grid-top {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3.2rem;
  width: 100%;
  max-width: 140rem;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
    max-width: 100%;
    padding: 0 1rem;
  }
}

.prove__grid-bottom {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3.2rem;
  width: 100%;
  max-width: 160rem;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    .prove__card_featured {
      grid-column: 2 / 3;
    }
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
    max-width: 100%;
    padding: 0 1rem;

    .prove__card_featured {
      grid-column: 1;
    }
  }
}

// Card styles
.prove__card {
  padding: 3.2rem 4rem;
  background: rgba(20, 20, 21, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.6rem;
  transition: all 0.3s ease;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.5);
  text-align: center;
  cursor: pointer;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-0.6rem);
  }

  @media only screen and (max-width: 600px) {
    padding: 2rem 2rem;
    min-height: auto;
  }
}

.prove__card_exclude {
  background: rgba(20, 20, 21, 0.95);

  &:hover {
    background: rgba(30, 20, 20, 0.95);
    border-color: rgba(239, 68, 68, 0.5);
    box-shadow: 0 0.8rem 2.4rem rgba(239, 68, 68, 0.4);
  }

  .prove__card-label {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 121%;
    color: #CBCBCB;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .prove__card-value {
    font-family: 'Colus', sans-serif;
    color: #EF4444;
    font-size: 3.6rem;
    line-height: 125%;
    font-weight: normal;
    text-decoration: line-through;
    text-decoration-thickness: 0.3rem;

    @media only screen and (max-width: 600px) {
      font-size: 2.8rem;
    }
  }

  .prove__card-label {
    @media only screen and (max-width: 600px) {
      font-size: 1.4rem;
    }
  }
}

.prove__card_include {
  background: rgba(30, 25, 40, 0.95);
  border-color: rgba(117, 79, 224, 0.4);

  &:hover {
    background: rgba(40, 30, 50, 0.95);
    border-color: rgba(117, 79, 224, 0.6);
    box-shadow: 0 0.8rem 2.4rem rgba(117, 79, 224, 0.5);
  }

  .prove__card-label {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 121%;
    color: #CBCBCB;
    margin-bottom: 1rem;
  }

  .prove__card-value {
    font-family: 'Colus', sans-serif;
    font-size: 3.6rem;
    line-height: 125%;
    color: #8D5EF4;
    text-shadow: 0 .4rem 6.9rem #000000, 0 .4rem 6.9rem #000000;

    @media only screen and (max-width: 600px) {
      font-size: 2.8rem;
    }
  }

  .prove__card-label {
    @media only screen and (max-width: 600px) {
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }
  }
}

.prove__card_featured {
  background: linear-gradient(135deg, rgba(117, 79, 224, 0.85), rgba(88, 28, 135, 0.85));
  border-color: rgba(168, 85, 247, 0.7);
  box-shadow:
    0 0 3rem rgba(117, 79, 224, 0.6),
    inset 0 0 2rem rgba(168, 85, 247, 0.25);
  padding: 4rem 4.8rem;
  min-height: 20rem;

  &:hover {
    background: linear-gradient(135deg, rgba(117, 79, 224, 0.95), rgba(88, 28, 135, 0.95));
    transform: translateY(-0.8rem) scale(1.05);
    box-shadow:
      0 1.2rem 4rem rgba(117, 79, 224, 0.7),
      inset 0 0 3rem rgba(168, 85, 247, 0.35);
  }

  .prove__card-featured-line {
    font-family: 'Colus', sans-serif;
    color: #8D5EF4;
    font-size: 3.2rem;
    line-height: 125%;
  }

  .prove__card-featured-brand {
    font-family: 'Colus', sans-serif;
    font-size: 6rem;
    line-height: 124%;
    color: #FFFFFF;
    text-shadow: 0 .4rem 6rem #FFFFFF;
    margin-top: 1rem;
  }

  @media only screen and (max-width: 600px) {
    padding: 2.4rem 2rem;
    min-height: auto;

    .prove__card-featured-line {
      font-size: 2rem;
    }

    .prove__card-featured-brand {
      font-size: 3.6rem;
      margin-top: 0.8rem;
    }
  }
}

// Remove old list styles
// Old styles - keeping for backward compatibility but unused
.prove__list-1,
.prove__list-2 {
  display: none;
}
</style>
