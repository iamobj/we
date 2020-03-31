<!-- 时光机 -->
<template>
  <div class="time-meachine">
    <div class="cover-wrap fs0">
      <!-- 封面背景 -->
      <van-image
        width="100vw"
        height="2rem" />

      <div class="con pd-main">
        <van-image :src="require('@/assets/img/boy_avatar.png')" width=".5rem" round/>
        <van-image class="avatar--girl" :src="require('@/assets/img/girl_avatar.png')" width=".5rem" round/>
        <div class="tip">共记录<div>99个时刻</div></div>
      </div>
    </div>

    <van-sticky>
      <div class="time-wrap pd-main">
        <span class="time">2020/3</span>
      </div>
    </van-sticky>
  </div>
</template>

<script>
import { Image, Sticky } from 'vant'
export default {
  name: 'timeMeachine',
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    [Image.name]: Image,
    [Sticky.name]: Sticky,
  }
}

</script>
<style lang="scss" scoped>
.time-meachine {
  .pd-main {
    padding: 0 20px;
  }
  .cover-wrap {
    position: relative;
    .con {
      position: absolute;
      bottom: 18px;
      display: flex;
      align-items: center;
      width: 100%;
      .avatar--girl {
        margin-left: -10px;
      }
      .tip {
        margin-left: auto;
        font-size: 12px;
        text-align: right;
        > div {
          font-size: 15px;
        }
      }
    }
  }
  .time-wrap {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #fff;
    .time {
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>
