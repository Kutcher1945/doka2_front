<template>
  <div class="bonus-switcher">
    <span class="bonus-switcher__title">
      Игра на<br />
    бонусы
    </span>
    <label class="switch" :class="{'switch--checked': value}" @click="toggle">
      <div class="switch__track"></div>
      <div class="switch__thumb"></div>
    </label>
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
    toggle() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.bonus-switcher {
  display: flex;
  column-gap: 6px;
  align-items: center;
  &__title {
    font-family: 'Bahnschrift';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 110.02%;
    /* or 11px */

    letter-spacing: 0.065em;

    color: #FFFFFF;
  }
}
.switch {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 24px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
}

.switch__track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  margin-top: 0;
  background: #141415;
  border: 1px solid #515151;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  margin-top: 0;
  background-color: #515151;
  border-radius: 2px;
  border: 4px solid #1F1F1F;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s;
}

.switch--checked .switch__track {
  //background-color: #007aff;
}

.switch--checked .switch__thumb {
  transform: translateX(20px);
  border-color: #754FEB;
  background-color: #fff;
}
</style>
