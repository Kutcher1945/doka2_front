<template lang="pug">
.member
  .member__card
    .member__avatar
      img(:src="'/images/' + avatar" :alt="name").member__avatar-image
    .member__card-content
      .member__name {{ id }}{{ name }}
      .member__panel
        .member__rank
          svg-icon(name="logo").member__rank-icon
          | {{ rank }}
        button.member__report(
          v-if="isRateActive"
        ) Жалоба
  .member__rate(v-if="isRateActive")
    .member__rate-title Поставить оценку
      //@changeValue="(value) => { $emit('changeRate', value) }"
    Stars(
      :value="rate"
      :functional="true"
      @changeValue="(value) => { $emit('changeRate', value) }"
    ).member__stars
</template>

<script>
import Stars from '@/components/Cabinet/Stars.vue'

export default {
  components: {
    Stars
  },
  props: {
    id: Number,
    avatar: {
      type: String,
      default: 'tanjiro.png'
    },
    name: {
      type: String,
      default: ''
    },
    rank: {
      type: String,
      default: 'Master'
    },
    isRateActive: {
      type: Boolean,
      default: false
    },
    rate: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.member {
  display: flex;
  align-items: center;
}
.member__card {
  width: 21.5rem;
  padding: 1.6rem 1.5rem 1.2rem;

  background: #464E79;
  border-radius: .5rem;

  display: flex;
  align-items: center;
}
.member__avatar {
  flex: 0 0 auto;

  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;

  margin-right: 1.9rem;

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.member__card-content {

}
.member__name {
  font-weight: 500;
  font-size: 1.1rem;
  color: #FFFFFF;

  margin-bottom: .5rem;
}
.member__panel {
  display: flex;
  align-items: center;
}
.member__rank {
  background: #1C1F32;
  border-radius: .6rem;
  padding: .6rem .5rem;

  font-weight: 500;
  font-size: 1.1rem;
  color: #FFFFFF;

  display: flex;
  align-items: center;

  margin-right: .6rem;

  &-icon {
    width: 1.3rem;
    height: 1rem;

    margin-right: .3rem;
  }
}
.member__report {
  background: #FF5E5E;
  border-radius: .6rem;
  padding: .6rem .5rem;

  font-weight: 500;
  font-size: 1.1rem;
  color: #FFFFFF;
}
.member__rate {
  margin-left: 2rem;
  &-title {
    font-weight: 400;
    font-size: 1.1rem;
    color: #FFFFFF;

    margin-bottom: .8rem;
  }
}
.member__stars {
  ::v-deep &.stars {
    font-size: 1.5rem;
  }
  //::v-deep .stars__item {
  //  width: 2.1rem;
  //  height: 1.95rem;
  //}
}
</style>
