<template>
  <div class="finances">
    <ul class="finances__list">
      <li class="finances-bonus">
        <BonusSwitcher v-model="isSwitchOn" />
        <div class="finances-item">
          <span class="finances-item__value">{{
            $currencyFormatter(
              $auth.user.user_wallet.bonus_balance
                ? $auth.user.user_wallet.bonus_balance
                : 0,
              $auth.user.user_wallet.currency &&
                $auth.user.user_wallet.currency,
              2
            )
          }}
          </span>
          <span class="finances-item__label">Бонусный счет</span>
        </div>
      </li>
      <li class="finances-item finances-personal">
        <span class="finances-item__value">{{
          $currencyFormatter(
            $auth.user.user_wallet.balance
              ? $auth.user.user_wallet.balance
              : 0,
            $auth.user.user_wallet.currency &&
              $auth.user.user_wallet.currency,
            2
          )
        }}</span>
        <span class="finances-item__label">Личный счет</span>
      </li>
      <li class="finances-item finances-block">
        <span class="finances-item__value">{{
          $currencyFormatter(
            $auth.user.user_wallet.blocked_balance
              ? $auth.user.user_wallet.blocked_balance
              : 0,
            $auth.user.user_wallet.currency &&
              $auth.user.user_wallet.currency,
            2
          )
        }}</span>
        <span class="finances-item__label">В блоке</span>
      </li>
    </ul>
  </div>
</template>

<script>
import BonusSwitcher from '@/components/Wallet/BonusSwitcher.vue'
export default {
  components: {
    BonusSwitcher
  },
  data () {
    return {
      // wallet: null
      isSwitchOn: false
    }
  }
}
</script>

<style lang="scss" scoped>
/** Finances */

.finances {
  background: #1f1f1f;
  border-radius: 0.5rem;
  padding: 1rem 0;

  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    margin-bottom: 1.2rem;
  }
}

.finances__list {
  display: flex;
  align-items: center;
  column-gap: 42px;
  padding: 0 20px;

  @media screen and (max-width: 767px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    gap: 1rem;
    width: 100%;
    justify-content: space-around;
  }
}

.finances-bonus {
  display: flex;
  column-gap: 20px;
  align-items: center;

  @media screen and (max-width: 767px) {
    border-top: 1px solid #515151;
    padding-top: 1.2rem;
    grid-column: 1/3;
    grid-row: 2/3;
    justify-content: space-around;
  }

  .finances-item {
    position: relative;

    &:after {
      content: '';

      height: 1.3rem;
      width: 0.1rem;
      background: #515151;

      position: absolute;
      left: calc(100% + 20px);
      top: 50%;
      transform: translateY(-50%);
      @media screen and (max-width: 767px) {
        content: none;
      }
    }
  }
}

.finances-personal {
  @media screen and (max-width: 767px) {
    grid-column: 1/2;
    grid-row: 1/2;
  }
}
.finances-block {
  @media screen and (max-width: 767px) {
    grid-column: 2/3;
    grid-row: 1/2;
  }
}

.finances-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding: 0 2.4rem;

  position: relative;

  &:not(:last-child):after {
    content: '';

    height: 1.3rem;
    width: 0.1rem;
    background: #515151;

    position: absolute;
    left: calc(100% + 20px);
    top: 50%;
    transform: translateY(-50%);
    @media screen and (max-width: 767px) {
    content: none;
  }
  }

  &__value {
    //font-weight: 400;
    font-variation-settings: 'wght' 400;
    font-size: 1.9rem;
    line-height: 121%;
    color: #ffffff;
  }

  &__label {
    //font-weight: 300;
    font-variation-settings: 'wght' 300, 'wdth' 87.5;
    font-size: 1rem;
    line-height: 72.02%;
    color: #606060;
  }

}
</style>
