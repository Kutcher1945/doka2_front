<template>
  <button :disabled="disabled" role="button" :class="{'toggle-btn': true, 'toggle-btn--active': isActive, 'toggle-btn--disabled': disabled}">
    <svg
      :class="{'toggle-btn__icon': true, 'toggle-btn__icon--disabled': disabled}"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="21"
        height="21"
        rx="10.5"
        fill="#754FE0"
        stroke="#2C2C2C"
        stroke-width="2"
      />
      <path d="M10.5682 17V9.5H12.4282V17H10.5682ZM10.5682 8.36V6.5H12.4282V8.36H10.5682Z" fill="white" />
    </svg>
    <div class="toggle-btn__text">
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-btn {
  // Base properties
  user-select: none;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 7px;
  background: #282829;
  color: white;
  border-radius: 5px;
  font-family: Bahnschrift;
  font-size: 13px;
  font-weight: 700;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: center;

  // Nested elements and modifiers
  &__icon {
    margin-right: auto;
    &--disabled {
      filter: grayscale(1);
    }
  }

  &--active {
    background: #754FE0;
  }

  &--disabled {
    cursor: not-allowed;
    background: #c3c3c3;
    &:hover {
      background: #c3c3c3!important;
    }
  }

  &:hover {
    background: #754FE0;
  }

  &__text {
    margin-right: auto;
  }
}
</style>
