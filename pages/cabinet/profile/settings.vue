<template lang="pug">
.settings

  .settings__container
    .settings__section
      h4.settings__title Личные данные
      // Username form
      .settings__field
        FieldUsername
      .settings__field
        FieldCodeConfirm(
          :changing-value="$auth.user.phone_number"
          changing-value-name="phone"
          label="Номер телефона"
        )
      .settings__field
        FieldCodeConfirm(
          :changing-value="$auth.user.email"
          changing-value-name="email"
          label="E-Mail"
        )
      h4.settings__title.settings__title_margin_4 Пароль
      // Password change
      FieldPassword()
    .settings__section
      h4.settings__title Настройка платежей
    .settings__section
      h4.settings__title Настройка интеграций
      .settings__list
        Integration(
          v-for="(integration, integration_index1) in integrations.platforms"
          :key="integration_index1"
          v-bind="integration"
        )
    .settings__section
      h4.settings__title Настройка cоц. сетей
      .settings__list
        Integration(
          v-for="(integration, integration_index2) in integrations.services"
          :key="integration_index2"
          v-bind="integration"
        )
</template>

<script>
import Integration from '@/components/Profile/Integration.vue'
import FieldUsername from '@/components/Profile/FieldUsername'
import FieldCodeConfirm from '@/components/Profile/FieldCodeConfirm'
import FieldPassword from '@/components/Profile/FieldPassword'

export default {
  components: {
    FieldPassword,
    FieldCodeConfirm,
    FieldUsername,
    Integration
  },
  layout: 'cabinet-default',
  data () {
    return {
      integrations: {
        platforms: [
          {
            slug: 'steam',
            logo: 'redesign/steam.png',
            name: 'Steam',
            connected: true
          },
          {
            slug: 'xbox',
            logo: 'redesign/xbox.png',
            name: 'XBOX',
            connected: false
          },
          {
            slug: 'sony',
            logo: 'redesign/ps.png',
            name: 'Sony PSN',
            connected: false
          },
          {
            slug: 'Battle.net',
            logo: 'redesign/battlenet.png',
            name: 'Battle.net',
            connected: false
          }
        ],
        services: [
          {
            slug: 'twitch',
            logo: 'redesign/twitch.png',
            name: 'Twitch',
            connected: false
          },
          {
            slug: 'discord',
            logo: 'redesign/discord.png',
            name: 'Discord',
            connected: false
          },
          {
            slug: 'google',
            logo: 'redesign/google.png',
            name: 'Google',
            connected: false
          },
          {
            slug: 'google',
            logo: 'redesign/telegram.png',
            name: 'Telegram',
            connected: false
          }
        ]
      }
      // languages: [
      //   { slug: 'ua', icon: 'flag-ua.png', code: '+(380)', mask: '## ##-##-###' },
      //   { slug: 'ru', icon: 'flag-ru.png', code: '+(7)', mask: '(###) ###-##-##' },
      //   { slug: 'kz', icon: 'flag-kz.png', code: '+(7)', mask: '(###) ###-##-##' }
      // ],
      // phone: {
      //   language: { slug: 'ua', icon: 'flag-ua.png', code: '+(380)', mask: '## ##-##-###' },
      //   number: '',
      //   code: ''
      // },
      // OpenIndicator: {
      //   render: createElement => createElement('span', [
      //     createElement('svg-icon', {
      //       class: {
      //         'open-indicator': true
      //       },
      //       props: {
      //         name: 'arrow-3'
      //       }
      //     })
      //   ])
      // }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

.settings {

}
.settings__container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1.6rem;
}
.settings__section {
  background: #141415;
  border-radius: 1.1rem;
  padding: 2rem;
}
.settings__title {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #878787;

  margin-bottom: 2rem;

  &_margin_4 {
    margin-bottom: .4rem;
  }
}
.settings__list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1.2rem;
}
.settings__field {
  margin-bottom: 1.2rem;
}
/*
  ============================================================
  Fields
  ============================================================
*/
.field {
  //&.invalid {
  //  border-color: #FF7A00;
  //}
}
.field__label {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #525F63;

  margin-bottom: .3rem;
}
.field__container {
  height: 2.7rem;

  display: flex;
  align-items: center;
  padding: 0 .8rem;

  background: #1F1F1F;
  border-radius: .5rem;
}
.field__input {
  background: none;
  border: none;
  padding: 0;
  outline: none;
  width: 100%;

  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;

  color: #FFFFFF;
  &::placeholder {
    color: #525F63;
  }
}
.fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 40rem));
  grid-gap: 4rem;
}

.fields__section {

}
.field-user {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__name {
    font-weight: 500;
    font-size: 1.4rem;
    color: #FFFFFF;

    margin-right: 1.7rem;
  }
  &__controls {
    flex: 0 0 auto;
  }
  &__control {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;

    font-weight: 500;
    font-size: 1.4rem;
    color: #BA98F0;

    margin-right: 1.2rem;
  }
}

.field-input {
  width: 100%;

  display: flex;
  align-items: center;

  &__input {
    width: 100%;
    background: none;
    border: none;
    outline: none;

    font-weight: 500;
    font-size: 1.4rem;
    color: #FFFFFF;
    &::placeholder {
      color: #FFFFFF;
    }
  }
  &__button {
    flex: 0 0 auto;
    margin-left: 2.4rem;
  }
}
.field-phone {
  display: flex;
  align-items: center;
  &__lang-select {
    flex: 0 0 auto;

    width: 2.5rem;

    margin-right: 1.3rem;

    ::v-deep .vs {
      &__dropdown-toggle {
        border: none;
        background: none;
        // border-radius: 1.5rem;

        position: relative;

        height: 1.75rem;
        padding: 0;
      }
      &__selected {
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 120%;
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
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 120%;
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
        margin-left: 0;

        position: absolute;
        left: 50%;
        top: calc(100% + .1rem);
        transform: translateX(-50%);
      }

      &__open-indicator {
        //$koef: 1.25;
        //width: 1.4rem/$koef;
        //height: .8rem/$koef;

        width: 1.12rem;
        height: 0.64rem;

        display: flex;
        align-items: center;
        justify-content: center;

        .open-indicator {
          //width: 1.4rem/$koef;
          //height: .8rem/$koef;
          width: 1.12rem;
          height: 0.64rem;
        }
      }

      &__dropdown-menu {
        background: none;
        box-shadow: none;
        border: none;

        width: 2.5rem;
        min-width: 0;
        padding: 0;

        top: calc(100% + 1.25rem);
      }
      &__dropdown-option {
        background: none;
        padding: 0;
        &:hover {
          background: none;
        }
        img {
          width: 2.5rem;
          height: 1.75rem;
        }
      }
      //&__clear {
      //  .deselect {
      //  }
      //}
    }
    ::v-deep &.vs--open {
      .vs {
        &__dropdown-toggle {
          border-radius: 1.5rem 1.5rem 0 0;
        }
      }
    }
    ::v-deep &.vs--single.vs--open .vs__selected {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &__input-wrapper {
    font-weight: 500;
    font-size: 1.4rem;
    color: #FFFFFF;

    display: flex;
    align-items: center;
  }
  &__input-prefix {
    flex: 0 0 auto;
    margin-right: .15em;
  }
  &__input {
    width: 100%;
    background: none;
    border: none;
    outline: none;

    font-weight: 500;
    font-size: 1.4rem;
    color: #FFFFFF;
    &::placeholder {
      color: #FFFFFF;
    }
  }
  &__button {
    flex: 0 0 auto;
    margin-left: 1.2rem;
  }
}
.field-code {
  display: flex;
  align-items: center;
  width: 100%;
  &__input {
    width: 100%;
    justify-content: center;

    ::v-deep .vue-pincode-input {
      background: none;
      box-shadow: none;
      border-radius: 0;
      border: none;
      outline: none;
      margin: 0;
      padding: 0;

      font-weight: 500;
      font-size: 1.4rem;
      color: #FFFFFF;

      width: 1.2rem;
      border-bottom: .2rem solid #FFFFFF;

      margin-right: 1.2rem;
      &:last-child {
        margin-right: 0;
      }
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
  &__button {
    flex: 0 0 auto;
    margin-left: 2.4rem;
  }
}
.field-button {
  flex: 0 0 auto;
  width: 16rem;
  padding: 0;

  font-weight: 500;
  font-size: 1.4rem;
  color: #BA98F0;

  margin-left: 1.2rem;
}
</style>
