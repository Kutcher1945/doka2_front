<template lang="pug">
.modal
  // .modal__close-space(@click="$emit('close')")
  .modal__body.modal-ready

    // button.modal-ready__close(@click="$emit('close')") Закрыть

    .modal-ready__set(v-show="!ready")

      h2.modal-ready__title Матч готов
      .modal-ready__subtitle Нажми кнопку “Готов” чтобы присоединится к игре

      button.button-mode-3.button-mode-3_highlighted.button-mode-3_align_center.modal-ready__button(
        @click.prevent="readySet()"
      ) Готов

      .modal-ready__timer 00:54

    transition(name="ready-set")
      .modal-ready__wait(v-show="ready")

        h2.modal-ready__title.modal-ready__wait-title Матч готов

        .modal-ready__loading(:class="'modal-ready__loading_slots_' + lobby.slots")
          svg-icon.modal-ready__loading-icon(
            name="redesign/user-2"

            v-for="(i, index) in lobby.slots"
            :key="index"

            :class="{ 'modal-ready__loading-icon_active': index < readyMembersCount }"
          )
        .modal-ready__wait-progress {{ readyMembersCount }}/{{ lobby.slots }} игроков готовы
</template>

<script>
export default {
  name: 'ModalReady',
  props: {
    lobbySocket: {
      type: [Object, WebSocket],
      required: true
    },
    lobby: {
      type: Object
    },
    lobbyMembers: {
      type: Array
    }
  },
  data () {
    return {
      ready: false
    }
  },
  computed: {
    readyMembersCount () {
      const members = this.lobbyMembers
      let readyMembersCount = 0
      for (let i = 0; i < members.length; i++) {
        if (members[i].status) {
          readyMembersCount++
        }
      }

      return readyMembersCount
    }
  },
  methods: {
    sendAccept () {
      // this.$modal.hide('Lobby-ready')
    },
    readySet () {
      // console.log('Send!')
      this.lobbySocket.send(JSON.stringify({
        data: {
          command: 'status_ready',
          userID: this.$auth.user.id,
          lobbyID: this.$route.params.id
        }
      }))
      // TODO: error handler?
      // this.$emit('close')
      this.ready = true
    }
  }
}
</script>

<style lang="scss" scoped>

.modal-ready {
  width: 48.5rem;
  padding: 2.4rem 2.4rem 1.6rem;

  position: relative;

  background: #1F1F1F;
  border: .1rem solid #282828;
  border-radius: .8rem;
}
.modal-ready__close {
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: uppercase;
  color: #FFFFFF;

  position: absolute;
  bottom: calc(100% + 1.4rem);
  right: 0;
}
.modal-ready__set {
  display: flex;
  flex-direction: column;
  align-items: center;

  //position: absolute;
  //width: 100%;
  //left: 50%;
  //top: 50%;
  //transform: translate(-50%, -50%);
}
.modal-ready__title {
  font-weight: 400;
  font-size: 2rem;
  line-height: 120%;
  color: #FFFFFF;
  text-transform: uppercase;
  text-align: center;

  position: relative;

  margin-bottom: 2.4rem;

  &:after {
    content: '';

    width: 17.2rem;
    height: .2rem;

    background: #272727;

    position: absolute;
    top: calc(100% + 1rem);
    left: 50%;
    transform: translateX(-50%);
  }
}
.modal-ready__subtitle {
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 118%;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: 4rem;
}
.modal-ready__button {
  width: 15rem;
  margin-bottom: 3.6rem;
  box-shadow: 0 0 12.7rem #754FE0;
}
.modal-ready__timer {
  //font-weight: 600;
  font-variation-settings: 'wght' 600;
  font-size: 1.6rem;
  line-height: 118%;
  color: #FFFFFF;
  text-align: center;
}
.modal-ready__wait {
  display: flex;
  flex-direction: column;
  align-items: center;

  //position: absolute;
  //width: 100%;
  //left: 50%;
  //top: 50%;
  //transform: translate(-50%, -50%);

  margin-bottom: 2rem;
}
.modal-ready__wait-title {
  margin-bottom: 3.2rem;
}
.modal-ready__loading {
  display: grid;
  grid-template-columns: repeat(10, 2.8rem);
  grid-gap: 1.1rem;

  margin-bottom: 2.4rem;

  &-icon {
    width: 2.4rem;
    height: 3.6rem;

    color: #FFFFFF;
    //--fill-color: ;
    --stroke-color: #555555;

    &_active {
      --fill-color: #754FE0;
      --stroke-color: #754FE0;
    }
  }

  &_slots {
    &_2 {
      grid-template-columns: repeat(2, 2.8rem);
    }
    &_10 {
      grid-template-columns: repeat(10, 2.8rem);
    }
  }
}
.modal-ready__wait-progress {
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 118%;
  color: #FFFFFF;
  text-align: center;
}

.ready-set-enter-active, .ready-set-leave-active { transition: opacity .5s; }
.ready-set-enter, .ready-set-leave-active { opacity: 0; }
</style>
