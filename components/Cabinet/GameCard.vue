<template lang="pug">
  NuxtLink.game(
    @click.native="playGame()"
    :class="{ 'in-dev': inDev, 'game_is-connected': isConnected }"

    to="cabinet/lobby"
    :to="isConnected ? '/cabinet/lobby' : ''"
  )
    // :event="isConnected ? 'click' : ''"
    img(:src="'/images/' + image" alt="").game__image
    .game__name
      svg-icon(:name="icon").game__icon
      | {{ name }}
    .game__panel {{ isConnected ? 'Играть' : 'Подключить' }}
</template>

<script>
import ModalGameConnect from './ModalGameConnect'

export default {
  props: {
    image: {
      type: String
    },
    icon: {
      type: String
    },
    name: {
      type: String
    },
    isConnected: {
      type: Boolean
    },
    inDev: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    playGame () {
      if (this.inDev) { return }

      this.$emit('close')

      if (!this.isConnected) {
        this.showGameConnect()
      }
    },
    showGameConnect () {
      this.$modal.show(
        ModalGameConnect,
        {
        },
        {},
        {}
      )
    }
  }
}
</script>

<style lang="scss" scoped>

.game {
  width: 13rem;
  height: 18rem;
  background: #272727;
  border-radius: .7rem;

  cursor: pointer;

  position: relative;

  &:before {
    content: '';

    width: 100%;
    height: 100%;

    background: linear-gradient(0deg, rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, 0) 100%);
    border-radius: .7rem;

    position: absolute;
    left: 0;
    bottom: 0;
  }
  &:after {
    content: '';

    width: 100%;
    height: 30%;

    background: linear-gradient(0deg, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, 0) 100%);
    border-radius: 0 0 .7rem .7rem;

    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
}
.game__image {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  z-index: 0;
}
.game__name {
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  color: #FFFFFF;

  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  display: flex;
  align-items: flex-end;

  white-space: nowrap;
}
.game__icon {
  width: 2.2rem;
  height: 2.2rem;

  margin-right: .6rem;
}
.game__panel {
  font-weight: 350;
  font-variation-settings: 'wght' 350, 'wdth' 87.5;
  font-size: 1.3rem;
  line-height: 123%;
  color: #FFFFFF;

  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #754FE0;
  border-radius: 0 0 .7rem .7rem;

  opacity: 0;
  transition: opacity .25s;
}

.game:hover {
  .game {
    &__panel {
      opacity: 1;
    }
  }
}

.game_is-connected {
  &:before {
    background: linear-gradient(0deg, rgba(117, 79, 224, .4) 0%, rgba(0, 0, 0, 0) 100%);
  }
  &:after {
    background: linear-gradient(0deg, rgba(117, 79, 224, .6) 0%, rgba(0, 0, 0, 0) 100%);
  }
}
.game.in-dev {
  cursor: not-allowed;

  .game__panel {
    display: none;
  }

  opacity: .25;
}
</style>
