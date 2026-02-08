<template lang="pug">
.similar
  .similar__title
    | Похожие:
    span.similar__counter {{ 4 }}
  .similar-table.similar__table
    .similar-table__head
      .similar-table__line.similar-table__head-line
        .similar-table__cell.similar-table__head-cell Название лобби
        .similar-table__cell.similar-table__head-cell Стоимость комнаты
        .similar-table__cell.similar-table__head-cell Рейтинг
    .similar-table__body
      NuxtLink.similar-table__line(
        v-for="lobby in lobbies"
        :key="lobby.id"
        :to="'/cabinet/lobby/' + lobby.id"
      )
        .similar-table__cell {{ lobby.name }}
        .similar-table__cell {{ lobby.bet }}₽
        .similar-table__cell Дефолт
</template>

<script>
export default {
  props: {
    lobbies: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*
  ============================================================
  Similar
  ============================================================
*/
.similar {
  display: flex;
  flex-direction: column;
}
.similar__title {
  padding-left: 1.2rem;

  //font-weight: 600;
  font-variation-settings: 'wght' 600;
  font-size: 1.6rem;
  line-height: 118%;
  color: #FFFFFF;

  margin-bottom: .5rem;
}
.similar__counter {
  color: #754FE0;
  margin-left: .25em;
}
.similar__table {
  //flex-grow: 1;
}
.similar-table {
  border: .1rem solid #323232;
  border-radius: .5rem;
  padding: .8rem 1.2rem 3.6rem;
}
.similar-table__head {

}
.similar-table__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: .5rem;
}

.similar-table__line {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  grid-gap: .8rem;

  &:not(.similar-table__head-line) {
    background: #282829;
    border-radius: .5rem;

    cursor: pointer;
    &:hover {
      .similar-table__cell {
        color: #FFFFFF;
      }
    }
  }
}
.similar-table__head-line {
  margin-bottom: .5rem;
}

.similar-table__cell {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 123%;
  color: #606060;
  transition: color .25s;

  padding: .8rem 1rem;
}
.similar-table__head-cell {
  color: #FFFFFF;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
