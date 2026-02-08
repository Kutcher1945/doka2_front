<template>
  <div class="table-container">
    <div class="table">
      <div class="row header">
        <span v-for="(header, index) in headers" :key="index" class="cell">{{ header }}</span>
      </div>
      <div class="tbody-wrapper">
        <div v-for="(row, index) in data" :key="index" class="row">
          <span v-for="(value, key) in row" :key="key" class="cell">
            <template v-if="key === 'date'">
              {{ (new Date(value)).toLocaleDateString() }} {{ (new Date(value)).toLocaleTimeString() }}
            </template>
            <template v-else>
              {{ value }}
            </template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.tbody-wrapper {
  max-height: 320px;
  overflow-y: auto;

  @media screen and (max-width: 767px) {
    overflow:unset;
  }

  &::-webkit-scrollbar {
    width: .12rem;
    height: 90%
  }

  &::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #754FE0;
  }

  ::-webkit-scrollbar-track {
    height: 90%;
  }

  .cell {
    background: #141415;
  }
}

.table {
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  margin-bottom: 1rem;

  background: #141415;
  border: 1px solid #323232;
  border-radius: 5px;

  &-container {
    @media screen and (max-width: 767px) {
      overflow-x: auto;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    //border-bottom: 1px solid #ccc;

    &:hover {
      .cell {
        background-color: #754FE0;
        color: #fff;
        font-weight: bold;
      }

    }

    &.header {
      &:hover {
        .cell {
          background: #1F1F1F;
          color: #878787;
          font-weight: 400;
        }
      }
      .cell {
        display: flex;
        align-items: center;
        @media screen and (max-width: 767px) {
        background: #1F1F1F;
      }
      }
    }

    &:last-child {
      border-bottom: none;
    }

    .cell {
      padding: 5px 16px;
      text-align: left;
      vertical-align: top;
      border-right: 1px solid #323232;
      flex-grow: 1;
      flex-basis: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      font-weight: 300;
      font-size: 14px;
      line-height: 135%;
      /* identical to box height, or 19px */

      letter-spacing: 0.3px;

      color: #878787;

      min-width: 120px;

      &:last-child {
        border-right: none;
      }

      @media screen and (max-width: 767px){
        white-space: inherit;
        overflow: unset;
      }
    }
  }

  .header {
    font-weight: 400;
    font-size: 14px;
    line-height: 135%;
    /* identical to box height, or 19px */

    letter-spacing: 0.3px;

    color: #6D6D6D;
    background: #1F1F1F;
    border-radius: 5px 5px 0px 0px;
  }
}
</style>
