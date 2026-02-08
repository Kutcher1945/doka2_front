<template>
  <div class="commission-info">
    <div class="commission-info__content">
      <button @mouseover="showInfo" @mouseleave="hideInfo" class="commission-info__button">
        <svg-icon name="redesign/info" class="commission-info__button-icon" />
      </button>
      <div class="commission-info__tooltip" v-if="isHovered">
        <div class="commission-info__speech-bubble" v-html="infoText"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CabinetCommissionInfo',
  data() {
    return {
      isHovered: false,
      infoText: '1-2 игры — комиссия 15%<br />3-4 игры — комиссия 10%<br />5 и более — комиссия 5%'
    }
  },
  methods: {
    showInfo() {
      this.isHovered = true
    },
    hideInfo() {
      this.isHovered = false
    }
  }
}
</script>

<style lang="scss">
.commission-info {
  position: absolute;
  right: 3px;
  top: 3px;

  &__button {
    border-radius: 100%;
    background: #754FE0;
    border: 1px solid #171717;
    border-radius: 11.5px;
    width: 23px;
    height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__button-icon {
    width: 7px;
    height: 14px;
  }

  &__speech-bubble {
    position: relative;
    padding: 16px 12px;
    background: #1F1F1F;
    border: 1px solid #282828;
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    /* or 19px */

    text-align: center;
    letter-spacing: -0.2px;

    color: #FFFFFF;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 10%;
      width: 0;
      height: 0;
      border: 12px solid transparent;
      border-bottom-color: #1F1F1F;
      border-top: 0;
      margin-left: -12px;
      margin-top: -12px;
    }
  }

  &__tooltip {
    position: absolute;
    right: calc(-100% + 12px);
    top: calc(100% + 12px);
    width: 100%;
    min-width: 200px;
  }
}
</style>
