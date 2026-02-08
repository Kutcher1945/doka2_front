export default {
  data () {
    return {
      screenWidth: null
    }
  },
  mounted () {
    this.screenWidth = window.innerWidth
    window.addEventListener('resize', this.setScreenWidth)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setScreenWidth)
  },
  methods: {
    setScreenWidth () {
      this.screenWidth = window.innerWidth
    }
  }
}
