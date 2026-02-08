<template lang="pug">
.stars
  GameCardStar(
    v-for="(i, index) in 5"
    :key="index"
    :fill="index + 1 <= value"
  )
</template>

<style lang="scss" scoped>
.stars {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1.3rem));
  grid-gap: .3rem;
}
</style>

<script>
import GameCardStar from '@/components/Landing/GameCardStar.vue'

export default {
  components: {
    GameCardStar
  },
  props: {
    value: {
      type: Number
    }
  }
}
</script>
