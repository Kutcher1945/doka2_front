<template lang="pug">
.cabinet-index
  .cabinet-index__carousel
    Carousel
  CabinetData

</template>

<script>

import CabinetData from '../../components/Cabinet/CabinetData'
import Carousel from '@/components/Cabinet/Carousel.vue'
export default {
  components: { CabinetData, Carousel },
  layout: 'cabinet-default'
}
</script>

<style lang="scss" scoped>
.cabinet-index {

}
.cabinet-index-menu {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 2rem;
}
.cabinet-index__carousel {
  margin-bottom: 2.4rem;
}

.cabinet-index__container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 2.4rem;
}

</style>
