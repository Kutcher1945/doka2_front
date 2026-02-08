<template lang="html">
  <div class="stars" :class="{ 'stars_functional': functional }">
    <label
      v-for="(i, index) in 5"
      :key="'star-' + index"
      class="stars__item"
      :data-index="index"
    >
      <input
        :disabled="functional === false"

        type="radio"
        :name="'stars-' + uid"
        :value="(5 - index)"
        @click="changeValue((5 - index))"
      >

      <span v-if="!small">
        <svg
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"

          class="stars__star"
        >
        <defs>
          <linearGradient
            :id="'stars-gradient-' + index + '-' + uid"
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
          >
            <stop :offset="starFillPercent(5 - index)" stop-color="#FFD600" />
            <stop offset="0%" stop-color="#696969" />
          </linearGradient>
        </defs>
          <!--      :fill="(index + 1 <= value) ? '#FFE600' : '#1C1F32'"-->
        <path
          class="stars__star-path"
          d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z"
          :fill="'url(' + '#stars-gradient-' + index + '-' + uid + ')'"
        />
      </svg>
      </span>

      <span>
        <svg
          width="9"
          height="8"
          viewBox="0 0 9 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"

          class="stars__star"
        >
        <defs>
          <linearGradient
            :id="'stars-gradient-' + index + '-' + uid"
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
          >
            <stop :offset="starFillPercent(5 - index)" stop-color="#FFD600" />
            <stop offset="0%" stop-color="#696969" />
          </linearGradient>
        </defs>
          <!--      :fill="(index + 1 <= value) ? '#FFE600' : '#1C1F32'"-->
        <path
          class="stars__star-path"

          d="M4.26087 0L5.48806 2.57178L8.3132 2.94419L6.24651 4.90604L6.76535 7.70799L4.26087 6.3487L1.75639 7.70799L2.27523 4.90604L0.208542 2.94419L3.03368 2.57178L4.26087 0Z"
          :fill="'url(' + '#stars-gradient-' + index + '-' + uid + ')'"
        />
      </svg>

      </span>

    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    },
    functional: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uid: ''
    }
  },
  mounted () {
    this.uid = this._uid
  },
  methods: {
    starFillPercent (index) {
      if (index < this.value) {
        return '100%'
      }
      if (index - this.value < 1) {
        return (this.value - (index - 1)) * 100 + '%'
      }
      return '0%'
    },
    changeValue (value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.stars {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  font-size: 1rem;
}
.stars__item {
  input {
    position: absolute;
    left: -9999px;
    visibility: hidden;
    opacity: 0;
  }
  &:not(:last-child) {
    margin-left: .2em;
  }
}
.stars__star {
  width: 1.4em;
  height: 1.3em;
}

.stars_functional {
  .stars__item {
    cursor: pointer;
    &:hover {
      .stars__star-path {
        fill: red;
      }
      ~ .stars__item {
        .stars__star-path {
          // fill: '#FFE600'
          fill: red;
        }
      }
    }
  }
}
</style>
