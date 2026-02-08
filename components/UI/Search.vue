<template>
  <div class="search-ui">
    <svg-icon name="redesign/search" alt="" class="search-ui__icon" />
    <input v-model="inputVal" type="search" :placeholder="placeholder" class="search-ui__input">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Введите название или id лобби'
    }
  },
  data () {
    return {
      inputVal: ''
    }
  },
  watch: {
    inputVal (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.inputVal = val
    }
  },
  mounted () {
    this.inputVal = this.value
  }
}
</script>

<style lang="scss" scoped>
.search-ui {
  background: #282829;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 5px 14px;
  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  &__input {
    width: 100%;
    background: none;
    outline: none;
    display: block;
    border: none;
    width: 100%;
    padding: 0;
    font-family: Bahnschrift;
    font-size: 13px;
    font-weight: 300;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    font-variation-settings: 'wght' 300;
    color: #FFFFFF;
    &::placeholder {
      color: #606060;
    }
  }
}
</style>
