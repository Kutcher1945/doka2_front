<template lang="pug">
.tabs
  ul.menu.tabs__menu
    li.menu-item.menu__item(
      v-for="(tab, index) in tabs"
      :key="tab.title"
      @click="selectTab(index, tab.slug)"
      :class="{ 'menu-item_selected': selectedIndex === index }"
    )
      svg-icon(:name="tab.icon").menu-item__icon
      | {{ tab.title }}
  .tabs__content
    slot
</template>

<script>
export default {
  data () {
    return {
      selectedIndex: 0,
      tabs: []
    }
  },
  watch: {
    $route (to, from) {
      const hash = to.hash.slice(1)
      this.selectTab(null, hash)
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    const hash = this.$route.hash.slice(1)
    if (!hash) {
      this.selectTab(0)
      return
    }

    this.selectTab(null, hash)
  },
  methods: {
    selectTab (i, hash) {
      this.selectedIndex = i

      this.tabs.forEach((tab, index) => {
        if ((index === i) || (tab.slug === hash)) {
          tab.isActive = true
          this.selectedIndex = index
        } else {
          tab.isActive = false
        }
      })

      if (hash) {
        this.$router.push({ hash: '#' + hash })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: grid;
  grid-template-columns: 20.5rem minmax(0, 1fr);
  grid-gap: 2.8rem;

  @media screen and (max-width: 767px) {
    grid-template-columns: auto;
  }
}
.tabs__menu {
  position: relative;

  &:after {
    content: '';

    width: .12rem;
    height: 100%;
    background: #323232;

    position: absolute;
    left: calc(100% + 1.4rem - .06rem);
    top: 0;
  }
}
/* Menu */
.menu {
  display: flex;
  flex-direction: column;
}
.menu__item {
  &:not(:last-child) {
    margin-bottom: .9rem;
  }
}
.menu-item {
  cursor: pointer;
  display: flex;
  align-items: flex-start;

  background: #1F1F1F;
  border-radius: .5rem;
  padding: .4rem .6rem;

  font-weight: 300;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #7D7D7D;

  &__icon {
    width: 1.6rem;
    height: 1.6rem;

    margin-right: .4rem;
  }

  &_selected {
    background: #754FE0;
    color: #FFFFFF;
  }
}
</style>
