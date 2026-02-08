<template lang="pug">
.settings

  .settings__main
    .settings__title Настройки лобби
    button.settings__button Изменить настройки
    .settings__list
      .settings__item Пароль: {{ String(lobbyId) }}
      .settings__item Стоимость комнаты: {{ bet }}₽
      .settings__item В случае победы вы получите: {{ (bet * percent).toFixed(2) }}₽
    .settings__info SteamID: {{ this.$auth.user.steam_id }}. Перед подтверждением игры убедитесь, что вы находитесь под авторизованным steam id в Dota. Сделать это можно открыв стим - аккаунт - об аккаунте

  //
  .timer
    .timer__timer {{ statusText }}

  .buttons
    slot(name="buttons")
</template>

<script>
export default {
  props: {
    // password: {
    //   type: String,
    //   default: '*******'
    // },
    lobbyId: {
      type: Number,
      default: 0
    },
    bet: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 1.7
    },
    lobbyState: {
      type: String,
      default: 'Created'
    }
    // timerTime: {
    //   type: String
    // }
  },
  computed: {
    statusText () {
      switch (this.lobbyState) {
        case 'Created':
          return 'Игра создана'
        case 'Pending':
          return 'Ожидаем игроков'
        case 'Game started':
          return 'Игра началась'
        case 'Finished':
          return 'Игра закончена'
        case 'Error':
          return 'Ошибка'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.settings {
  margin-top: 2.4rem;
}
.settings__main {
  margin-bottom: 1.6rem;
}
/*
  ============================================================
  Main
  ============================================================
*/
.settings__title {
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 116%;
  color: #FFFFFF;

  margin-bottom: .4rem;
}
.settings__button {
  display: block;
  padding: 0;
  border: none;
  outline: none;

  font-weight: 300;
  font-size: 1.2rem;
  line-height: 116%;
  color: #BA98F0;

  margin: 0 0 .8rem;
}
.settings__list {
}
.settings__item {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.2rem;
  line-height: 116%;
  color: #FFFFFF;

  &:not(:last-child) {
    //margin-bottom: 1.2rem;
  }
}

.settings__info {
  margin-top: 24px;
  border-top: 1px solid #B7B7B7;
  padding-top: 16px;
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.2rem;
  line-height: 116%;
  color: #FFFFFF;
}
/*
  ============================================================
  Timer
  ============================================================
*/
.timer {
  margin-bottom: 1.6rem;
}
.timer__timer {
  font-weight: 400;
  font-size: 3rem;
  line-height: 120%;
  text-transform: uppercase;
  color: #FFFFFF;
}
/*
  ============================================================
  Buttons
  ============================================================
*/
.buttons {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1.2rem;
}
</style>
