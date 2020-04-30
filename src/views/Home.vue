<template>
  <div class="home">
    <div class="meet_timing">我们已经相识{{meetTiming}}</div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      weInfo: this.$store.getters.getWeInfo,
      meetTiming: ''
    }
  },
  methods: {
    init() {
      console.log(new Date(this.weInfo.acquaintanceAt))
      this.meetTimingInit()
    },
    // 初始化相识计时
    meetTimingInit() {
      const now = new Date()
      const startTime = new Date(this.weInfo.acquaintanceAt)

      function zero(val) {
        return val.toString().padStart(2, '0')
      }

      setInterval(() => {
        now.setTime(now.getTime() + 250)
        const days = (now - startTime) / 1000 / 60 / 60 / 24
        const dnum = Math.floor(days)
        const hours = (now - startTime) / 1000 / 60 / 60 - (24 * dnum)
        const hnum = zero(Math.floor(hours))
        const minutes = zero((now - startTime) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum))
        const mnum = zero(Math.floor(minutes))
        const seconds = (now - startTime) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum)
        const snum = zero(Math.round(seconds))

        this.meetTiming = `${dnum}天${hnum}时${mnum}分${snum}秒`
      }, 250)
    }
  },
  mounted() {
    this.init()
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.home {
  font-size: 20px;
  text-align: center;
  height: calc(100vh - .5rem);
  background-image: url('~@/assets/img/home/bg.jpg');
  background-size: cover;
  .meet_timing {
    color: #fff;
  }
}
</style>
