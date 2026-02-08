<template lang="pug">
.tab(v-show="isActive")
  slot
</template>

<script>
export default {
  props: {
    slug: {
      type: String
    },
    title: {
      type: String,
      default: 'Tab'
    },
    icon: {
      type: String
    }
  },
  data () {
    return {
      isActive: true
    }
  }
}
</script>
