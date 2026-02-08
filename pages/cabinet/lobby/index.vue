<template>
  <div class="lobbies">
    <div class="lobbies__container">
      <h2 class="lobbies__title">
        Поиск лобби
      </h2>
      <div class="filters lobbies__filters">
        <UIToggleBtn :is-active="mode === '1-v-1'" @click.native="mode = '1-v-1'">
          1 v 1 solo mid
        </UIToggleBtn>
        <UIToggleBtn :is-active="mode === 'all-pick'" @click.native="mode = 'all-pick'">
          all pick
        </UIToggleBtn>
        <UIToggleBtn disabled :is-active="mode === 'captains-mode'" @click.native="mode = 'captains-mode'">
          captains mode
        </UIToggleBtn>
        <NuxtLink to="/cabinet/lobby/create" class="button-mode-3 button-mode-3_highlighted button-mode-3_align_center button-mode-3_medium">
          Создать лобби
        </NuxtLink>
        <UISearch v-model="search" placeholder="Введите название или id лобби" />
        <div class="bet filters__bet">
          <div class="bet__label">
            Стоимость комнаты:
          </div>
          <div class="bet__fields">
            <label class="bet__field">
              <div class="bet__field-label">От:</div>
              <input v-model="lobby_bet_min" type="number" name="bet_from" class="bet__field-input">
            </label>
            <label class="bet__field">
              <div class="bet__field-label">До:</div>
              <input v-model="lobby_bet_max" type="number" name="bet_from" class="bet__field-input">
            </label>
          </div>
        </div>
        <button class="button-mode-3 button-mode-3_highlighted button-mode-3_align_center button-mode-3_medium lobbies__header-button" @click="applyFilter">
          Применить
        </button>
        <UICheckBtn v-if="mode === 'all-pick'" v-model="line.center.value">
          {{ line.center.label }}
        </UICheckBtn>
        <UICheckBtn v-if="mode === 'all-pick'" v-model="line.easy.value">
          {{ line.easy.label }}
        </UICheckBtn>
        <UICheckBtn v-if="mode === 'all-pick'" v-model="line.hard.value">
          {{ line.hard.label }}
        </UICheckBtn>
        <UICheckBtn v-if="mode === 'all-pick'" v-model="line.support.value">
          {{ line.support.label }}
        </UICheckBtn>
        <UICheckBtn v-if="mode === 'all-pick'" v-model="line.full_support.value">
          {{ line.full_support.label }}
        </UICheckBtn>
      </div>

      <div class="lobbies-table lobbies__list">
        <div class="table-container">
          <div class="table">
            <div class="row header">
              <span v-for="(header, index) in items" :key="index" class="cell">{{ header }}</span>
            </div>
            <div class="tbody-wrapper">
              <div v-for="(row, index) in filteredLobbies" :key="index" class="row" @click="onLobbyClick(row)">
                <span class="cell">
                  {{ row.name }}
                </span>
                <span class="cell">
                  {{ row.id }}
                </span>
                <span class="cell">
                  {{ row.bet ? row.bet : 0 }}₽
                </span>
                <span class="cell">
                  <!--                {{ lobby.membership.length }}/{{ lobby.slots }}-->
                  {{ 0 }}/{{ row.slots }}
                </span>
                <span class="cell">
                  {{ 'Rate' }}
                </span>
                <span class="cell">
                  {{ (row.bet * commissionPercent).toFixed(2) }}₽
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!filteredLobbies.length" class="lobbies-table__row lobbies-table__row--no-data">
          Нет данных в режиме {{ mode }}
        </div>
      </div>
      <div class="pagination lobbies-table__pagination">
        <button class="pagination__item pagination__item-prev" @click="getLobbies(page - 1)">
          <svg-icon name="redesign/arrow-1" class="pagination__item-arrow" />
        </button>
        <template v-for="(i, index) in [1,2,3,4,5]">
          <button
            v-if="i < 2 || lobbies.length === amount"
            :key="index"
            class="pagination__item"
            :class="{ 'pagination__item_active': page === i }"
            @click="getLobbies(index+1)"
          >
            <svg-icon name="redesign/dot" class="pagination__item-icon" />
          </button>
        </template>
        <button class="pagination__item pagination__item-next" @click="getLobbies(page + 1)">
          <svg-icon name="redesign/arrow-1" class="pagination__item-arrow" />
        </button>
      </div>
      <div class="statistics" />
    </div>
  </div>
</template>

<script>
const defaultLine = () => ({
  center: {
    label: 'Центр',
    value: false
  },
  easy: {
    label: 'Лёгкая',
    value: false
  },
  hard: {
    label: 'Сложная',
    value: false
  },
  support: {
    label: 'Поддержка',
    value: false
  },
  full_support: {
    label: 'Полная поддержка',
    value: false
  }
})
export default {
  layout: 'cabinet-default',
  middleware: ['steam-auth'],
  async asyncData ({ $axios }) {
    const lobbies = await $axios.$get('/dota/lobby_filtered/', {
      params: {
        amount: 5,
        offset: 0,
        lobby_bet_min: 0,
        lobby_bet_max: 999999
        // lobby_name: 'test'
        // lobby_player_amount: 1
      }
    })
    return { lobbies }
  },
  data () {
    return {
      search: '',
      mode: '1-v-1',
      lobby_bet_min: null,
      lobby_bet_max: null,
      amount: 5,
      line: {
        center: {
          label: 'Центр',
          value: false
        },
        easy: {
          label: 'Лёгкая',
          value: false
        },
        hard: {
          label: 'Сложная',
          value: false
        },
        support: {
          label: 'Поддержка',
          value: false
        },
        full_support: {
          label: 'Полная поддержка',
          value: false
        }
      },
      page: 1,
      isLobbySelected: false,
      items: ['Название лобби', 'id лобби', 'Стоимость комнаты', 'Места', 'Лига', 'В случае победы вы получите'],
      lobbies: [],
      OpenIndicator: {
        render: createElement => createElement('span', [
          createElement('svg-icon', {
            class: {
              'open-indicator': true
            },
            props: {
              name: 'arrow-4'
            }
          })
        ])
      },
      commissionPercent: 0
    }
  },
  computed: {
    filteredLobbies () {
      const reversed = [...this.lobbies] // Создаем копию исходного массива
      reversed.reverse() // Возвращаем перевернутую копию массива
      return reversed.reverse().filter((lobby) => {
        return (lobby.slots < 3 && this.mode === '1-v-1') || (lobby.slots > 2 && this.mode === 'all-pick')
      })
    }
  },
  watch: {
    mode (mode) {
      if (mode === '1-v-1') {
        this.line = defaultLine()
      }
    }
  },
  beforeMount () {
    this.getCurrentCommission()
  },
  methods: {
    async onLobbyClick (lobby) {
      if (this.isLobbySelected) { return }
      await this.$router.push('/cabinet/lobby/' + lobby.id)
      this.isLobbySelected = true
      setTimeout(() => {
        this.isLobbySelected = false
      }, 1500)
    },
    async getLobbies (page) {
      if (page <= 0) {
        page = 1
      }
      if (page >= 5) {
        page = 5
      }

      await this.$axios.$get('/dota/lobby_filtered/', {
        params: {
          amount: this.amount,
          offset: page - 1
        }
      }).then((res) => {
        this.lobbies = res
        this.page = page
      })
    },
    applyFilter () {
      this.updateLobbyList({
        amount: this.amount,
        offset: 0,
        lobby_bet_min: this.lobby_bet_min || 0,
        lobby_bet_max: this.lobby_bet_max || 99999999,
        lobby_name: this.search || null
      })
    },
    async updateLobbyList (params) {
      this.lobbies = await this.$axios.$get('/dota/lobby_filtered/', {
        params
      })
    },
    async getCurrentCommission () {
      try {
        const currentCommission = await this.$axios.$get(`/dota/get_user_game_current_commission/?user_id=${this.$auth.user.id}`)
        switch (currentCommission.commission) {
          case 15:
            this.commissionPercent = 1.7
            break
          case 10:
            this.commissionPercent = 1.8
            break
          case 5:
            this.commissionPercent = 1.9
            break
          default:
            this.commissionPercent = 1.7
            break
        }
        // console.log('currentCommission', currentCommission)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error get current user commission ', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lobbies {

}
.lobbies__container {
  background: #141415;
  border-radius: 1.1rem;
  padding: 1.2rem 3.6rem 4.8rem;
}
.lobbies__title {
  //font-weight: 600;
  font-variation-settings: 'wght' 600;
  font-size: 1.6rem;
  line-height: 118%;
  color: #FFFFFF;
  text-align: center;

  margin-bottom: 1.6rem;
}
.lobbies__filters {
  margin-bottom: .8rem;
}
.filters {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: .8rem 1.2rem;
  @media screen and (max-width: 767px){
    display: flex;
    flex-direction: column;
  }
}
.filters__search {
  grid-column: 1/4;
}
.filters__bet {
  grid-column: 1/3;
  grid-row-start: 2;
  grid-column-start: 2;
  grid-column-end: 4;
}
.search {
  background: #282829;
  border-radius: .5rem;

  height: 3.2rem;
  padding: 0 2.4rem 0 1.2rem;

  display: flex;
  align-items: center;

  &__icon {
    width: 1.6rem;
    height: 1.6rem;

    margin-right: 2.4rem;
  }
  &__input {
    background: none;
    outline: none;
    border: none;
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
  }
}
.bet {
  height: 3.2rem;
  padding: 0 1.2rem;
  background: #282829;
  border-radius: .5rem;

  display: flex;
  align-items: center;
}
.bet__label {
  flex: 0 0 auto;
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 123%;
  color: #FFFFFF;

  margin-right: 1.2rem;
}
.bet__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 15rem));
  grid-gap: 1.6rem;
  margin: 0 auto;
}
.bet__field {
  height: 2.7rem;
  padding: 0 1.2rem;
  background: #141415;
  border-radius: .3rem;

  display: flex;
  align-items: center;

  &-label {
    flex: 0 0 auto;
    font-weight: 300;
    font-size: 1.3rem;
    line-height: 123%;
    color: #878787;

    margin-right: 1.2rem;
  }
  &-input {
    background: none;
    outline: none;
    border: none;
    width: 100%;
    padding: 0;

    font-weight: 300;
    font-size: 1.3rem;
    line-height: 123%;
    color: #FFFFFF;

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
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination__item {
  background: none;
  border: none;
  padding: 0;
  outline: none;

  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  //font-weight: 700;
  //font-size: 1.2rem;
  //color: #FFFFFF;

  margin-left: .4rem;
  margin-right: .4rem;

  transition: background .25s, box-shadow .25s;
  &:not(.pagination__item_active):hover {
    //background: #7D5AB5;
    //box-shadow: 0 0.4rem 3.5rem rgb(197 91 234 / 41%);
  }
  &_active {
    //background: #7D5AB5;
    .pagination__item-icon {
      color: #C8C8C8;
    }
  }
}
.pagination__item-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: #494949;
}
.pagination__item-prev {
  transform: rotate(90deg);
  margin-right: 1.2rem;
}
.pagination__item-next {
  transform: rotate(-90deg);
  margin-left: 1.2rem;
}
.pagination__item-arrow {
  width: 1.4rem;
  height: 1.4rem;
}

.tbody-wrapper {
  max-height: 320px;
  overflow-y: auto;

  @media screen and (max-width: 767px) {
    overflow:unset;
  }

  &::-webkit-scrollbar {
    width: .12rem;
    height: 90%
  }

  &::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #754FE0;
  }

  ::-webkit-scrollbar-track {
    height: 90%;
  }

  .cell {
    background: #141415;
  }
}

.table {
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  margin-bottom: 1rem;

  background: #141415;
  border: 1px solid #323232;
  border-radius: 5px;

  &-container {
    @media screen and (max-width: 767px) {
      overflow-x: auto;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    //border-bottom: 1px solid #ccc;

    &:hover {
      .cell {
        background-color: #754FE0;
        color: #fff;
        font-weight: bold;
      }

    }

    &.header {
      &:hover {
        .cell {
          background: #1F1F1F;
          color: #878787;
          font-weight: 400;
        }
      }
      .cell {
        display: flex;
        align-items: center;
        @media screen and (max-width: 767px) {
        background: #1F1F1F;
      }
      }
    }

    &:last-child {
      border-bottom: none;
    }

    .cell {
      padding: 5px 16px;
      text-align: left;
      vertical-align: top;
      border-right: 1px solid #323232;
      flex-grow: 1;
      flex-basis: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      font-weight: 300;
      font-size: 14px;
      line-height: 135%;
      /* identical to box height, or 19px */

      letter-spacing: 0.3px;

      color: #878787;

      min-width: 120px;

      &:last-child {
        border-right: none;
      }

      @media screen and (max-width: 767px){
        white-space: inherit;
        overflow: unset;
      }
    }
  }

  .header {
    font-weight: 400;
    font-size: 14px;
    line-height: 135%;
    /* identical to box height, or 19px */

    letter-spacing: 0.3px;

    color: #6D6D6D;
    background: #1F1F1F;
    border-radius: 5px 5px 0px 0px;
  }
}
</style>
