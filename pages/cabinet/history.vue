<template>
  <div class="history">
    <div class="history__container">
      <div class="history__filters">
        <div class="history__filter">
          Дата
        </div>
        <div class="history__filter">
          Игра
        </div>
        <div class="history__filter">
          Сумма
        </div>
        <div class="history__filter">
          Название лобби
        </div>
        <div class="history__filter">
          Статус лобби
        </div>
        <div class="history__filter">
          Игроки
        </div>
      </div>
      <HistoryLine
        v-for="item in sortedItems"
        :key="item.id"
        class="history__line"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import HistoryLine from '@/components/History/HistoryLine.vue'

export default {
  components: {
    HistoryLine
  },
  layout: 'cabinet-default',
  data () {
    return {
      history: []
    }
  },
  async fetch () {
    this.history = await this.$axios.$get('/dota/game_history/', {
      params: {
        id_user: this.$auth.user.id
      }
    })
  },
  computed: {
    sortedItems () {
      // eslint-disable-next-line
      return this.history.sort((a, b) => new Date(b.finish_game) - new Date(a.finish_game))
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  height: 100%;
  &__line {
    padding: 0 2rem;
  }
}
.history__container {
  max-height: 82vh;
  overflow: auto;
  height: auto;
  background: #141415;
  border-radius: 1.1rem;
  padding:  0 0 3.2rem;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #1C1C1C;
  }
  &::-webkit-scrollbar-thumb {
    background: #754FE0;
    border-radius:10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #7D5AB5;
  }
}
.history__filters {
  position: sticky;
  top: 0;
  display: grid;
  padding: 0 2rem;
  grid-template-columns:
    minmax(150px, 6fr)
    minmax(150px, 8fr)
    minmax(150px, 6fr)
    minmax(150px, 7fr)
    minmax(150px, 6fr)
    minmax(150px, 11fr);

  background: #1F1F1F;
}
.history__filter {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.6rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #FFFFFF;
  padding: 1.2rem 1rem;
  background: #1F1F1F;
  border-bottom: .1rem solid #323232;
  &:not(:last-child){
    border-right: .1rem solid #323232;
  }
}
</style>
