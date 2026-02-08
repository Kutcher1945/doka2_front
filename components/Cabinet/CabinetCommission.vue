<template>
  <div class="commission sidebar__commission">
    <div class="commission__counter">
      <div class="commission__counter-title">
        {{ commissionValue.percent }}%
      </div>

      <p class="commission__text commission__subtitle">
        Комиссия
      </p>

      <div class="commission__counter-bottom" />
    </div>

    <ul v-show="commissionValue.gamesToReduce > 0" class="commission__stages">
      <li class="commission__stages-item" :class="commissionValue.gamesToReduce === 3 ? 'active' : ''">
        {{ commissionValue.count }} игры
      </li>
      <li class="commission__stages-item" :class="commissionValue.gamesToReduce === 2 ? 'active' : ''">
        {{ commissionValue.count }} игры
      </li>
      <li class="commission__stages-item" :class="commissionValue.gamesToReduce === 1 ? 'active' : ''">
        {{ commissionValue.count }} игра
      </li>
    </ul>
    <p class="commission__text commission__description">
      Чем больше играешь не выводя средства, тем меньше комиссия.
    </p>
  </div>
</template>

<script>
export default {
  name: 'CabinetCommission',
  data () {
    return {
      commissionValue: {
        percent: 0,
        count: 0,
        gamesToReduce: 0
      }
    }
  },
  beforeMount () {
    this.getCurrentCommission()
  },
  methods: {
    async getCurrentCommission () {
      try {
        // const testID = 32 // this.$auth.user.id
        const currentCommission = await this.$axios.$get(`/dota/get_user_game_current_commission/?user_id=${this.$auth.user.id}`)
        this.commissionValue.percent = currentCommission.commission
        this.commissionValue.count = currentCommission.game_count
        this.commissionValue.gamesToReduce = currentCommission.games_to_reduce
        // console.log('currentCommission', currentCommission)
      } catch (e) {
        console.log('error get current user commission ', e)
      }
    }
  }
}
</script>

<style lang="scss">
.sidebar__commission {
  background: radial-gradient(157.92% 76.15% at 50% 0%, rgba(80, 33, 128, 0.58) 0%, rgba(20, 20, 21, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #1F1F1F;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;
  position: relative;
}

.commission {
  &__counter {
    &-title {
      font-family: 'Bahnschrift';
      font-style: normal;
      font-weight: 700;
      font-size: 62px;
      line-height: 134.7%;
      /* or 84px */

      text-align: center;
      letter-spacing: 0.3px;

      color: #F6EDFF;

      text-shadow: 0px -2px 70px #BD7AFF, 0px -2px 41px #BD7AFF;
    }
    &-bottom {
      background: rgb(2,0,36);
      background: linear-gradient(90deg, rgba(53,53,53,1) 0%, rgba(108,90,157,1) 50%, rgba(53,53,53,1) 100%);
      height: 1.2px;
      width: 100%;
      min-width: 140px;
      margin-bottom: 2px;
    }
  }

  &__subtitle {
    font-style: normal;
    font-weight: 350;
    font-size: 14px;
    line-height: 116.7%;
    /* or 16px */

    text-align: center;
    letter-spacing: 0.3px;

    color: #878787;
    margin: 2px auto 8px;
  }

  &__stages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 6px;
    margin: 22px auto 0;
    width: 100%;
    max-width: 134px;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 17px;

      background: #272727;
      box-shadow: 0px 0px 69px rgba(0, 0, 0, 0.55);
      border-radius: 5px;
      padding: 2px 12px;

      font-style: normal;
      font-weight: 700;
      font-size: 13px;
      line-height: 92.2%;
      /* identical to box height, or 12px */

      text-align: center;
      letter-spacing: 0.3px;
      color: #878787;

      &.active {
        color: #FFFFFF;
        text-shadow: 0px 0px 17px #BD7AFF, 0px 0px 11px #BD7AFF;
      }
      &:first-child {
        width: 100%;
      }
      &:nth-child(2){
        width: 75%;
      }
      &:nth-child(3){
        width: 50%;
      }
    }
  }

  &__description {
    width: 100%;
    max-width: 158px;
    margin-top: 32px;
    font-family: 'Bahnschrift';
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 101.2%;
    /* or 13px */

    text-align: center;
    letter-spacing: 0.3px;

    color: #FFFFFF;
  }
}

</style>
