<template lang="pug">
.lobby-create

  .lobby-create__main

    h2.lobby-create__title Создать лобби

    ValidationObserver(
      ref="form"
      v-slot="{ handleSubmit, errors }"
    )
      form.lobby-create__form(@submit.prevent="handleSubmit(createLobby)")

        .lobby-create__fields

          // Lobby name
          ValidationProvider.lobby-create__field.lobby-create__field_full(
            rules="required"
            mode="eager"
            v-slot="{ errors, classes }"
            vid="name"
            tag="div"
          )
            .field(:class="classes")
              input.field__input(
                type="text"
                placeholder="Введите название лобби"

                v-model="form.name"
              )
              .field__error(v-if="errors[0]") {{ errors[0] }}

          // Lobby password
          ValidationProvider.lobby-create__field.lobby-create__field_full(
            rules=""
            mode="eager"
            v-slot="{ errors, classes }"
            vid="password"
            tag="div"
          )
            .field.field_disabled(:class="classes")
              input.field__input(
                type="password"
                placeholder="Введите пароль лобби (Необязательно)"

                disabled

                v-model="form.password"
              )
              .field__error(v-if="errors[0]") {{ errors[0] }}

          // Lobby map
          //ValidationProvider.lobby-create__field(
          //  rules="required"
          //  mode="eager"
          //  v-slot="{ errors, classes }"
          //  vid="map"
          //  tag="div"
          //)
          //  .field.field_select(:class="classes")
          //    v-select(
          //      :components="{ OpenIndicator }"
          //      :options="maps"
          //      :clearable="false"
          //      :searchable="false"
          //
          //      placeholder="Карта"
          //      v-model="form.map"
          //      label="map"
          //    ).field__select
          //      template(v-slot:option="option")
          //        | {{ option.map }}

          // Lobby gamemode
          ValidationProvider.lobby-create__field(
            rules="required"
            mode="eager"
            v-slot="{ errors, classes }"
            vid="gamemode"
            tag="div"
          )
            .field.field_select(:class="classes")
              v-select(
                :components="{ OpenIndicator }"
                :options="gamemodes"
                :clearable="false"
                :searchable="false"

                placeholder="Режим игры"
                v-model="form.gamemode"
                label="name"
              ).field__select
                template(v-slot:selected-option="option")
                  | {{ option.name }}
                template(v-slot:option="option")
                  | {{ option.name }}

          // Lobby bet
          ValidationProvider.lobby-create__field(
            rules="required"
            mode="eager"
            v-slot="{ classes }"
            vid="bet"
            tag="div"
          )
            .field(
              :class="{ ...classes, 'field_icon-left': betActive }"
            )
              .field__input-icon ₽
              input.field__input(
                type="number"
                name="bet"
                placeholder="Стоимость комнаты"
                maxlength="10"

                v-model="form.bet"
              )

        .lobby-create__budget В случае победы вы получите: {{ form.bet && form.gamemode ? calculatingBet.toFixed(2) : 0 }}₽
        .lobby-create__wait-time
          | Среднее время поиска команды:
          br
          span {{ '2 минуты' }}

        .lobby-create__error(v-if="observerErrorsHandler(errors)" v-html="observerErrorsHandler(errors)")
        .lobby-create__error(v-show="form.bet > $auth.user.user_wallet.balance") Суммы не достаточно
        .lobby-create__error(v-show="form.bet < minBet && form.bet > 0") Минимальная ставка {{ minBet }}
        .lobby-create__error(v-show="form.bet < 0") Сумма должна быть больше 0

        .lobby-create__bottom
          button(type="submit", :disabled="form.bet < 50").button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center Создать лобби
          NuxtLink(to="/cabinet/lobby").button-mode-3.button-mode-3_tiny.button-mode-3_align_center Поиск лобби
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  layout: 'cabinet-default',
  middleware: ['steam-auth'],
  data () {
    return {
      maps: ['Карта 1', 'Карта 2'],
      gamemodes: [
        { name: 'All Pick', playersCount: 10 },
        { name: '1v1 Solo Mid', playersCount: 2 },
        // { name: 'Captains Draft', playersCount: 10 },
        // { name: 'Mid Only', playersCount: 2 },
        { name: 'Captains Mode', playersCount: 10 }
      ],
      form: {
        name: '',
        password: '',
        map: '',
        gamemode: '',
        bet: ''
      },
      betActive: false,
      OpenIndicator: {
        render: createElement => createElement('span', [
          createElement('svg-icon', {
            class: {
              'open-indicator': true
            },
            props: {
              name: 'redesign/arrow-1'
            }
          })
        ])
      },
      minBet: 50
    }
  },
  computed: {
    calculatingBet () {
      let win = 0

      if (this.form.bet && this.form.gamemode) {
        win = this.form.bet * this.form.gamemode.playersCount / (this.form.gamemode.playersCount / 2) * 0.85
        win = Math.round(win * 100) / 100
      }

      return win
    }
  },
  watch: {
    bet (newValue) {
      this.betActive = !!newValue
    }
  },
  methods: {
    // testCreateLobby () {
    //   /* eslint-disable curly */
    //   if (this.form.bet < 0) return
    //   if (this.form.bet > this.$auth.user.user_wallet.balance) return
    //   console.log('test create lobby')
    // },
    async createLobby () {
      /* eslint-disable curly */
      if (this.form.bet < 50) return
      if (this.form.bet > this.$auth.user.user_wallet.balance) return

      const lobby = await this.$axios.$post('/dota/lobby/', {
        name: this.form.name,
        slots: this.form.gamemode.playersCount,
        game_mode: this.form.gamemode.name,
        bet: this.form.bet,
        lobby_lvl: this.$auth.user.dota_rank,
        leader: this.$auth.user.id
      }).catch((error) => {
        if (this.$axios.isCancel(error)) {
          console.log('Request canceled', error)
        } else {
          // handle error
        }
      })
      // const leader = await this.$axios.$post(`/dota/membership/`, {
      //   user: toString(this.$auth.user.id),
      //   Lobby: toString(Lobby.id),
      //   leader: true
      // })
      // console.log(leader)

      // console.log(lobby)

      this.$router.push({
        path: '/cabinet/lobby/' + lobby.id
      })
    },
    observerErrorsHandler (errors) {
      if (!errors) { return '' }

      let error = ''

      if (errors.map && errors.map.length) {
        error += 'Map field error: ' + errors.map[0] + '<br>'
      }
      if (errors.gamemode && errors.gamemode.length) {
        error += 'Gamemode field error: ' + errors.gamemode[0] + '<br>'
      }
      if (errors.bet && errors.bet.length) {
        error += 'Bet field error: ' + errors.bet[0] + '<br>'
      }

      return error
    }
  }
}
</script>

<style lang="scss" scoped>

.lobby-create {
  height: 100%;
}
.lobby-create__main {
  // margin-left: 42.5%; // 57.5%
  //margin-left: -7.5%;
  background: #141415;
  border-radius: 1.1rem;
  padding: 5.5rem 2.4rem 11rem;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.lobby-create__title {
  //font-weight: 600;
  font-variation-settings: 'wght' 600;
  font-size: 1.6rem;
  line-height: 118%;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: 2rem;
}
.lobby-create__form {

}
.lobby-create__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 15rem));
  grid-gap: 1.5rem;
  justify-content: center;
  align-items: center;

  margin-bottom: 1.2rem;
}
.lobby-create__field {
  &_full {
    grid-column: 1/3;
  }
}
.field {
  background: #282829;
  border-radius: .5rem;
  padding: 0 1.2rem;
  height: 3.2rem;

  display: flex;
  align-items: center;

  position: relative;
  &.invalid {
    border-color: #FF7A00;
  }

  &_select {
    padding: 0;
    border-color: #596192;
  }

  &__input-icon {
    opacity: 0;

    font-weight: 500;
    font-size: 1.4rem;
    color: #FFFFFF;

    position: absolute;
    top: 50%;
    left: 1.7rem;
    transform: translateY(-50%);
  }
  &_icon-left {
    .field__input-icon {
      opacity: 1;
    }
    .field__input {
      padding-left: 1.2rem;
    }
  }
  &__input {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    padding: 0;

    font-weight: 300;
    font-variation-settings: 'wght' 300;
    font-size: 1.3rem;
    line-height: 123%;
    color: #FFFFFF;

    &::placeholder {
      color: #606060;
    }

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
  &__select {
    width: 100%;

    ::v-deep .vs {
      &__dropdown-toggle {
        border: none;
        background: #282829;
        border-radius: .5rem;

        position: relative;

        height: 3.2rem;
        padding: 0 1.2rem 0 1.2rem;
      }
      &__selected {
        font-weight: 300;
        font-variation-settings: 'wght' 300;
        font-size: 1.3rem;
        line-height: 123%;
        color: #FFFFFF;

        margin: 0;
        padding: 0;
        border: 0;
        &-options {
          padding: 0;
        }

        img {
          width: 2.5rem;
          height: 1.75rem;
        }
      }
      &__search {
        font-weight: 300;
        font-variation-settings: 'wght' 300;
        font-size: 1.3rem;
        line-height: 123%;
        color: #FFFFFF;
        margin: 0;
        padding: 0;
        border: 0;

        // buggy search input fix
        // https://github.com/sagalbot/vue-select/issues/430
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
      }
      &__actions {
        flex: 0 0 auto;
        padding: 0;
        margin-left: 1.2rem;
      }

      &__open-indicator {
        width: 1.2rem;
        height: 1.2rem;

        display: flex;
        align-items: center;
        justify-content: center;

        .open-indicator {
          width: 1.2rem;
          height: 1.2rem;
        }
      }

      //&__dropdown-menu {
      //}
      //&__dropdown-option {
      //}
      //&__clear {
      //  .deselect {
      //  }
      //}
    }
    ::v-deep &.vs--open {
      .vs {
        &__dropdown-toggle {
          border-radius: .5rem .5rem 0 0;
        }
      }
    }
    ::v-deep &.vs--single.vs--open .vs__selected {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &__error {
    width: auto;
    max-width: 11rem;
    flex-grow: 1;

    font-weight: 300;
    font-variation-settings: 'wght' 300;
    font-size: 1rem;
    color: #B54A4A;

    margin-left: 1.7rem;
  }
  &_disabled {
    opacity: .5;
    cursor: not-allowed;
    .field__input {
      cursor: not-allowed;
    }
  }
}
.lobby-create__budget {
  //font-weight: 600;
  font-variation-settings: 'wght' 600;
  font-size: 1.6rem;
  line-height: 118%;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: 1rem;
}
.lobby-create__wait-time {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.2rem;
  line-height: 116%;
  color: #606060;
  text-align: center;
  span {
    font-variation-settings: 'wght' 600;
    color: #FFFFFF;
  }

  margin-bottom: 1.5rem;
}
.lobby-create__error {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  color: #B54A4A;
  text-align: center;

  margin-bottom: .5rem;
}
.lobby-create__bottom {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 15rem));
  grid-gap: 1.5rem;
  justify-content: center;
}
</style>
