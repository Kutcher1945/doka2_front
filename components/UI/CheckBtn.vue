<template>
  <div role="button" class="check-btn" @click="toggle">
    <div class="check-btn__text">
      <slot />
    </div>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" rx="3" fill="#1F1F1F" />
      <rect
        v-if="value"
        x="4"
        y="4"
        width="8"
        height="8"
        rx="2"
        fill="#754FE0"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.check-btn {
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px;
  background: #282829;
  color: white;
  border-radius: 5px;
  font-family: Bahnschrift;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  font-weight: 700;
  &:hover {
    background: #754FE0;
  }
}
</style>
