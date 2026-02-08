<template lang="pug">
.accordion-item(:class="{ 'accordion-item_active': active }")
  button.accordion-item__header(
    @click.prevent="$emit('accordionSelect', id)"
  )
    span.accordion-item__title {{ title }}
    svg.accordion-item__icon(
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    )
      path(
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      )
  transition(name="accordion-body")
    .accordion-item__body(v-show="active")
      .accordion-item__text {{ text }}
</template>

<script>
export default {
  props: {
    id: Number,
    active: Boolean,
    title: String,
    text: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/design-system/index';

.accordion-item {
  // Glassmorphic background
  @include glass-primary;
  @include border-gradient-purple;
  border-radius: $radius-lg;
  overflow: hidden;
  @include transition-base(background, box-shadow, border-color);

  // Hover effect
  &:hover {
    @include glass-hover;
  }

  // Active state with purple glow
  &_active {
    background: rgba($purple-900, 0.3);
    border-color: rgba($purple-500, 0.4);
    box-shadow:
      0 0 2rem rgba($purple-500, 0.2),
      inset 0 0 1rem rgba($purple-500, 0.1);

    .accordion-item__header {
      &::before {
        opacity: 1;
        transform: scaleX(1);
      }
    }

    .accordion-item__icon {
      transform: rotate(180deg);
      color: $purple-400;
    }
  }
}

.accordion-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  text-align: left;
  outline: none;
  border: none;
  background: transparent;
  padding: $spacing-4 $spacing-5;
  position: relative;

  // Purple accent line on active
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.4rem;
    background: linear-gradient(
      180deg,
      $purple-400 0%,
      $purple-600 100%
    );
    border-radius: 0 $radius-sm $radius-sm 0;
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left;
    @include transition-base(opacity, transform);
  }

  &:hover {
    .accordion-item__title {
      color: $purple-300;
      text-shadow: 0 0 1rem rgba($purple-400, 0.3);
    }

    .accordion-item__icon {
      color: $purple-400;
      transform: scale(1.1);
    }
  }
}

.accordion-item__title {
  font-family: $font-primary;
  font-weight: $font-medium;
  font-size: $text-xl;
  line-height: $leading-tight;
  color: $neutral-100;
  @include transition-base(color, text-shadow);

  @media (max-width: 768px) {
    font-size: $text-lg;
  }
}

.accordion-item__icon {
  width: 2.4rem;
  height: 2.4rem;
  color: $neutral-500;
  flex-shrink: 0;
  margin-left: $spacing-3;
  @include transition-base(transform, color);
}

.accordion-item__body {
  overflow: hidden;
}

.accordion-item__text {
  font-family: $font-primary;
  font-weight: $font-light;
  font-size: $text-base;
  line-height: $leading-relaxed;
  color: $neutral-400;
  padding: 0 $spacing-5 $spacing-4 $spacing-5;

  @media (max-width: 768px) {
    font-size: $text-sm;
  }
}

// Smooth accordion animation
.accordion-body-enter-active,
.accordion-body-leave-active {
  transition:
    opacity $transition-base $ease-out,
    max-height $transition-base $ease-out;
}

.accordion-body-enter,
.accordion-body-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-body-enter-to,
.accordion-body-leave {
  opacity: 1;
  max-height: 50rem;
}
</style>
