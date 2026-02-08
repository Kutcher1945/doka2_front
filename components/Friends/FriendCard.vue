<template lang="pug">
.friend
  .friend__avatar
    img(:src="avatar" :alt="username").friend__avatar-image
  .friend__content
    h4.friend__name {{ username }}
    .friend__status {{ status }}
  .friend__actions(v-if="mode === 'search'")
    button.button-mode-3.button-mode-3_tiny.button-mode-3_highlighted.friend__actions-button(
      @click="requestFriendship"
      :disabled="friend || requestSent"
    ) {{ requestSent ? 'Отправлено' : friend ? 'Добавлен' : 'Добавить' }}
  .friend__actions(v-else-if="mode === 'request'")
    button.button-mode-3.button-mode-3_tiny.button-mode-3_highlighted.friend__actions-button(
      @click="$emit('acceptFriendship', id)"
    ) Принять
    button.button-mode-3.button-mode-3_tiny.button-mode-3_highlighted.friend__actions-button(
      @click="$emit('rejectFriendship', id)"
    ) Отклонить
  .friend__actions(v-else ref="menu")
    button.friend__menu-button(@click = "isMenuActive = !isMenuActive")
      svg-icon(name="redesign/three-dots").friend__menu-button-icon
    ul.menu.friends__menu(v-show="isMenuActive")
      li.menu__item
        button.menu__button(@click="$emit('removeFriendship', id)") Удалить друга
</template>

<script>
// Emits:
// 1. removeFriendship
// 2. acceptFriendship
// 3. rejectFriendship
// 4. requestFriendship
export default {
  props: {
    mode: {
      type: String,
      default: '' // '' (default) | search | request
    },
    friend: { // used if search mode to identify whether user is already added
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: '/images/redesign/test-avatar-1.png'
    },
    id: {
      type: Number
    },
    username: {
      type: String,
      default: 'Friendname*'
    },
    status: {
      type: String
    }
  },
  data () {
    return {
      isMenuActive: false,
      requestSent: false
    }
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.close)
  },
  methods: {
    close (e) {
      if (!this.$refs.menu.contains(e.target)) {
        this.isMenuActive = false
      }
    },
    requestFriendship () {
      this.$emit('requestFriendship', this.id)
      this.requestSent = true
    }
  }
}
</script>

<style lang="scss" scoped>

.friend {
  display: flex;
  align-items: center;
  padding: .3rem .6rem .3rem .3rem;

  background: #1F1F1F;
  border-radius: .5rem;

  position: relative;
}
.friend__avatar {
  flex: 0 0 auto;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: .4rem;

  margin-right: .6rem;

  &-image {

  }
}
.friend__content {
  align-self: flex-start;
}
.friend__name {
  font-weight: 350;
  font-size: 1.4rem;
  line-height: 116.7%;
  letter-spacing: 0.03rem;
  color: #FFFFFF;
}
.friend__status {
  font-weight: 300;
  font-size: 1.3rem;
  line-height: 123%;
  letter-spacing: 0.05em;
  color: #05BB9A;
}
.friend__actions {
  flex: 0 0 auto;
  margin-left: auto;
  position: relative;

  display: flex;
  align-items: center;
}
.friend__actions-button {
  &:not(:last-child) {
    margin-right: .8rem;
  }
}
.friend__menu-button {
  line-height: 0;
  padding: 0;

  &-icon {
    width: 2.4rem;
    height: 2.4rem;
  }
}

.menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% - .4rem);
  z-index: 1;

  width: 9rem;
  padding: .6rem 0;

  background: #1F1F1F;
  border: 0.05rem solid #878787;
  border-radius: .5rem;
}
.menu__item {
  &:not(:last-child) {
    margin-bottom: .6rem;
  }
}
.menu__button {
  display: block;
  width: 100%;
  padding: 0;

  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  line-height: 1;
  letter-spacing: 0.03rem;
  color: #878787;
  text-align: center;

  &:hover {
    color: #FFFFFF;
  }
}
</style>
