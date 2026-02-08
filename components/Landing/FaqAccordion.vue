<template lang="pug">
.accordion
  FaqAccordionItem(
    v-for="(item, index) in questionsAndAnswers"
    :key="index"
    v-bind="item"
    :id="index"
    :active="index === activeItem"
    @accordionSelect="accordionSelect"
  )
</template>

<script>
import FaqAccordionItem from '@/components/Landing/FaqAccordionItem.vue'

export default {
  components: { FaqAccordionItem },
  props: {
    questionsAndAnswers: Array
  },
  data () {
    return {
      activeItem: 0
    }
  },
  methods: {
    accordionSelect (id) {
      if (id === this.activeItem) {
        this.activeItem = -1
        return
      }
      this.activeItem = id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/design-system/index';

.accordion {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: $spacing-4;

  // Staggered fade-in animation
  > * {
    animation: fade-in-up $transition-base $ease-out;
    animation-fill-mode: both;
  }

  > *:nth-child(1) { animation-delay: 0ms; }
  > *:nth-child(2) { animation-delay: 100ms; }
  > *:nth-child(3) { animation-delay: 200ms; }
  > *:nth-child(4) { animation-delay: 300ms; }
  > *:nth-child(5) { animation-delay: 400ms; }
  > *:nth-child(6) { animation-delay: 500ms; }
  > *:nth-child(7) { animation-delay: 600ms; }
}
</style>
