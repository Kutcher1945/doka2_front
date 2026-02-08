<template lang="pug">
.switcher
  v-select.switcher__select(
    :options="languages"
    :components="{ OpenIndicator }"
    :clearable="false"
    :searchable="false"
    v-model="selected"

    @option:selected="selectCode()"
  )
    template(v-slot:option="option")
      img(:src="'/images/' + option.icon" :alt="option.slug")
      | {{ option.text }}
    template(v-slot:selected-option="option")
      img(:src="'/images/' + option.icon" :alt="option.slug")
</template>

<script>
export default {
  transition: 'switcher-list',
  data () {
    return {
      selected: { slug: 'ru', icon: 'flag-ru.png', code: '+(7)', mask: '(###) ###-##-##', text: 'Россия' },
      languages: [
        // { slug: 'ua', icon: 'flag-ua.png', code: '+(380)', mask: '## ##-##-###', text: 'Украина' },
        { slug: 'ru', icon: 'flag-ru.png', code: '+(7)', mask: '(###) ###-##-##', text: 'Россия' },
        { slug: 'kz', icon: 'flag-kz.png', code: '+(7)', mask: '(###) ###-##-##', text: 'Казахстан' }
      ],
      OpenIndicator: {
        render: createElement => createElement('span', [
          createElement('svg-icon', {
            class: {
              'open-indicator': true
            },
            props: {
              name: 'arrow-3'
            }
          })
        ])
      }
    }
  },
  mounted () {
    this.$emit('codeChanged', this.selected)
  },
  methods: {
    selectCode () {
      this.$emit('codeChanged', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>

.switcher {
  display: flex;
  align-items: center;
}
.switcher__select {
  flex: 0 0 auto;

  width: 2.5rem;

  ::v-deep .vs {
    &__dropdown-toggle {
      border: none;
      background: none;
      // border-radius: 1.5rem;

      position: relative;

      height: 1.75rem;
      padding: 0;
    }
    &__selected {
      font-weight: 500;
      font-size: 2.4rem;
      line-height: 120%;
      color: #FFFFFF;

      margin: 0;
      padding: 0;
      border: 0;
      &-options {
        padding: 0;
      }

      img {
        width: 2.5rem;
        height: 1.75rem;
      }
    }
    &__search {
      font-weight: 500;
      font-size: 2.4rem;
      line-height: 120%;
      color: #FFFFFF;

      margin: 0;
      padding: 0;
      border: 0;

      // buggy search input fix
      // https://github.com/sagalbot/vue-select/issues/430
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
    }
    &__actions {
      flex: 0 0 auto;
      padding: 0;
      margin-left: 0;

      position: absolute;
      left: 50%;
      top: calc(100% + .4rem);
      transform: translateX(-50%);
    }

    &__open-indicator {
      //$koef: 1.25;
      //width: 1.4rem/$koef;
      //height: .8rem/$koef;
      width: 1.12rem;
      height: 0.64rem;

      display: flex;
      align-items: center;
      justify-content: center;

      .open-indicator {
        //width: 1.4rem/$koef;
        //height: .8rem/$koef;
        width: 1.12rem;
        height: 0.64rem;
      }
    }

    &__dropdown-menu {
      box-shadow: none;
      background: #676FA4;
      border-radius: .4rem;
      border: none;

      width: 14rem;
      min-width: 0;
      padding: 1.1rem 1.1rem;

      top: calc(100% + 1.75rem);
    }
    &__dropdown-option {
      background: none;
      padding: 0;

      font-weight: 500;
      font-size: 1.2rem;
      color: #FFFFFF;

      margin-bottom: .4rem;
      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background: none;
      }
      img {
        width: 1.8rem;
        height: 1.2rem;

        margin-right: 1.1rem;
      }
    }
    //&__clear {
    //  .deselect {
    //  }
    //}
  }
  ::v-deep &.vs--open {
    .vs {
      &__dropdown-toggle {
        border-radius: 1.5rem 1.5rem 0 0;
      }
    }
  }
  ::v-deep &.vs--single.vs--open .vs__selected {
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
