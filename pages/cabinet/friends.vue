<template>
  <div class="friends">
    <div class="friends__content">
      <div class="header">
        <div class="header__title-wrapper">
          <h2 class="header__title">
            Друзья
          </h2>
          <p class="header__subtitle">
            {{ 3 }} в сети из {{ 45 }}
          </p>
        </div>
      </div>
      <div class="body">
        <ul class="menu">
          <li
            class="menu__item"
            :class="{ 'menu__item_active': activeTab === 'friends' }"
            @click.prevent="activeTab = 'friends'"
          >
            <button class="menu__item-button">
              Друзья
            </button>
          </li>
          <li
            class="menu__item"
            :class="{ 'menu__item_active': activeTab === 'search' }"
            @click.prevent="activeTab = 'search'"
          >
            <button class="menu__item-button">
              Поиск
            </button>
          </li>
          <li
            class="menu__item"
            :class="{ 'menu__item_active': activeTab === 'invites' }"
            @click.prevent="activeTab = 'invites'"
          >
            <button class="menu__item-button">
              Заявки в друзья
            </button>
          </li>
        </ul>
        <div class="body__main">
          <div v-if="activeTab == 'search'" class="tab search">
            <form class="search-field search__field" @submit.prevent="findUser">
              <label class="search-field__label">Добавить друга:</label>
              <input
                v-model="search"
                class="search-field__input"
                type="search"
                name="search"
                :placeholder="`Введите id друга, ваш id: ${$auth.user.username}@${$auth.user.id}`"
              >
              <button
                class="button-mode-3 button-mode-3_tiny button-mode-3_highlighted search-field__button"
                type="submit"
              >
                Поиск
              </button>
            </form>
            <FriendCard
              v-if="searchResults"
              mode="search"
              v-bind="searchResults"
              @requestFriendship="requestFriendship"
            />
            <div v-else-if="searchResults !== null" class="search__text">
              К сожалению, пользователь не найден
            </div>
          </div>
          <div v-if="activeTab == 'friends'" class="tab friends-list">
            <FriendCard
              v-for="(friend, index) in friends"
              :key="index + Math.random()"
              v-bind="friend"
              @removeFriendship="removeFriendship"
            />
          </div>
          <div v-if="activeTab == 'invites'" class="tab invites-list">
            <FriendCard
              v-for="(friend, index) in requests"
              :key="index + Math.random()"
              mode="request"
              v-bind="friend"
              @rejectFriendship="rejectFriendship"
              @acceptFriendship="acceptFriendship"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendCard from '@/components/Friends/FriendCard.vue'

export default {
  components: { FriendCard },
  layout: 'cabinet-default',
  data () {
    return {
      activeTab: 'friends',
      search: '',
      searchResults: null,
      requests: [],
      friends: []
    }
  },
  async fetch () {
    this.requests = await this.$axios.$get('/community/friends/received_requests/')
    this.friends = await this.$axios.$get('/community/friends/list/')
  },
  fetchOnServer: false,
  methods: {
    async findUser () {
      await this.$axios
        .$get('/community/friends/find/', {
          params: {
            user_id: this.search
          }
        })
        .then((response) => {
          console.log('Response: ', response)
          if (response.id === this.$auth.user.id) {
            this.searchResults = ''
          } else {
            for (let i = 0; i < this.friends.length; i++) {
              if (response.id === this.friends[i].id) {
                this.searchResults = {
                  ...response,
                  friend: true
                }
                return
              }
            }
            this.searchResults = response
          }
        })
        .catch((error) => {
          console.log('Error: ', error)
          this.searchResults = ''
        })
    },
    async removeFriendship (userId) {
      await this.$axios
        .$post('/community/friends/remove/', {
          user_id: userId
        })
        .then((response) => {
          console.log('Response: ', response)
          this.$fetch()
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    },
    async acceptFriendship (userId) {
      await this.$axios
        .$post('/community/friends/accept/', {
          user_id: userId
        })
        .then((response) => {
          console.log('Response: ', response)
          this.$fetch()
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    },
    async rejectFriendship (userId) {
      await this.$axios
        .$post('/community/friends/reject/', {
          user_id: userId
        })
        .then((response) => {
          console.log('Response: ', response)
          this.$fetch()
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    },
    async requestFriendship (userId) {
      await this.$axios
        .$post('/community/friends/request/', {
          user_id: userId
        })
        .then((response) => {
          console.log('Response: ', response)
          this.$fetch()
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.friends__content {
  background: #141415;
  border-radius: 1.1rem;
  padding: 1.6rem 3.2rem;
}
/*
  ============================================================
  Header
  ============================================================
*/
.header {
  display: flex;
  align-items: center;

  border-bottom: .12rem solid #323232;
  padding-bottom: 1.2rem;

  margin-bottom: 1.6rem;
}
.header__title-wrapper {

}
.header__title {
  font-weight: 400;
  font-size: 2.1rem;
  line-height: 119%;
  letter-spacing: 0.05em;
  color: #754FE0;

  margin-bottom: .2rem;
}
.header__subtitle {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.4rem;
  line-height: 121%;
  letter-spacing: 0.05em;
  color: #FFFFFF;
}
/*
  ============================================================
  Search
  ============================================================
*/
.search-field {
  display: flex;
  align-items: center;

  background: #1F1F1F;
  border-radius: .5rem;
  padding: .8rem .8rem .8rem 1.8rem;

  @media screen and (max-width: 767px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    gap: 1rem;
  }
}
.search-field__label {
  flex: 0 0 auto;

  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.4rem;
  line-height: 116.7%;
  letter-spacing: 0.03rem;
  color: #878787;

  margin-right: 1.2rem;
  @media screen and (max-width: 767px) {
    grid-column: 1/3;
    grid-row: 1/2;
  }
}
.search-field__input {
  width: 100%;

  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.4rem;
  line-height: 116.7%;
  letter-spacing: 0.03rem;
  color: #FFFFFF;

  border: none;
  background: #141415;
  border-radius: .5rem;
  padding: .5rem .8rem;
  outline: none;

  margin-right: .8rem;

  &::placeholder {
    color: #5A5A5A;
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
  @media screen and (max-width: 767px) {
    grid-column: 1/3;
    grid-row: 2/3;
  }
}
.search-field__button {
  flex: 0 0 auto;
  @media screen and (max-width: 767px) {
    grid-column: 1/3;
    grid-row: 3/4;
    text-align: center;
    justify-content: center;
  }
}
.search__field {
  margin-bottom: 1rem;
}
.search__text {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.4rem;
  line-height: 116.7%;
  letter-spacing: 0.03rem;
  color: #FFFFFF;
}
/*
  ============================================================
  Body
  ============================================================
*/
.body {
  display: grid;
  grid-template-columns: 20.5rem minmax(0, 1fr);
  grid-gap: 3.6rem;

  @media screen and (max-width: 767px) {
    grid-template-columns: auto;
  }
}
.menu {
  align-self: flex-start;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1rem;
}
.menu__item {
  &-button {
    width: 100%;

    background: #1F1F1F;
    border-radius: .5rem;
    padding: .3rem 1rem;

    font-weight: 300;
    font-size: 1.3rem;
    line-height: 135.2%;
    letter-spacing: 0.03rem;
    color: #FFFFFF;
    text-align: left;
  }

  &_active {
    .menu__item-button {
      background: #754FE0;
    }
  }
}
.friends-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 1rem 3.6rem;
}
.invites-list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1rem;
}
</style>
