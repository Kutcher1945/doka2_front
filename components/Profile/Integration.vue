<template lang="pug">
.integration(:class="{'active': connected}")
  .integration__inner
    .integration__logo
      img(:src="'/images/' + logo" :alt="slug" :class="['integration__logo-image', 'integration__logo-image_' + slug]")

    .integration__name {{ name }}

    div(v-if="steam").integration__status {{ connected ? 'Булыжник | Обновлено 1 год назад' : 'Не подключено' }}
    div(v-else-if="wallet").integration__status {{ connected ? wallet : 'Не подключено' }}
    div(v-else).integration__status {{ connected ? 'Подключено' : 'Не подключено' }}

    //button.button-mode-3.button-mode-3_tiny.button-mode-3_align_center.integration__change(v-if="connected") Изменить
  button.button-mode-3.button-mode-3_highlighted.button-mode-3_tiny.button-mode-3_align_center.integration__connect(
    v-if="!connected"
  ) Подключить
</template>

<script>
export default {
  props: {
    slug: {
      type: String
    },
    logo: {
      type: String
    },
    name: {
      type: String
    },
    connected: {
      type: Boolean
    },
    visa: {
      type: Boolean,
      default: false
    },
    wallet: {
      type: String
    },
    steam: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.integration {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 12rem;
  grid-gap: 1.2rem;
  align-items: center;
}
.integration__inner {
  flex-grow: 1;

  background: #1F1F1F;
  border-radius: .5rem;

  height: 2.7rem;
  padding: 0 0 0 1rem;

  display: flex;
  align-items: center;
}
.integration__logo {
  display: flex;
  flex: 0 0 auto;
  margin-right: .8rem;
  width: 3.2rem;
  align-items: center;
  &-image {
    width: 1.6rem;
    height: 1.6rem;

    &_visa {
      width: 3.2rem;
    }
    &_mir {
      width: 3.2rem;
      height: 2.4rem;
    }
  }
}
.integration__name {
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1;
  letter-spacing: 0.03rem;
  color: #878787;

  margin-right: 1.2rem;
  position: relative;
  &:after {
    content: '';

    width: .1rem;
    height: 1.1rem;
    background: #525F63;

    position: absolute;
    left: calc(100% + .6rem - .05rem);
    top: 50%;
    transform: translateY(-50%);
  }
}
.integration__status {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 1;
  letter-spacing: 0.03rem;
  color: #525F63;
}
.integration__change {
  flex: 0 0 auto;
  width: 12rem;
  margin-left: auto;
}
.integration__connect {

}
.integration.active {
  grid-template-columns: minmax(0, 1fr);
}
</style>
