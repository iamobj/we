<!-- 时光机 -->
<template>
  <div class="time-meachine">
    <div class="cover-wrap fs0">
      <!-- 封面背景 -->
      <van-image
        width="100vw"
        height="2rem" />

      <div class="con pd-main">
        <van-image class="avatar" :src="require('@/assets/img/boy_avatar.png')" width=".5rem" round/>
        <van-image class="avatar avatar--girl" :src="require('@/assets/img/girl_avatar.png')" width=".5rem" round/>
        <div class="tip">共记录<div>99个时刻</div></div>
      </div>
    </div>

    <van-sticky>
      <div class="time-wrap pd-main">
        <span class="time">2020/4/1</span>
        <!-- 这里套一层是为了隐藏在ios上的滚动条 -->
        <div class="txt-wrap">
          <div class="txt">生活不止眼前的苟且，还有诗和远方的田野。</div>
        </div>
        <svg-icon iconClass="time-line" class="svg--item-line" />
      </div>
    </van-sticky>

    <!-- 内容区 -->
    <main class="con-wrap pd-main">
      <section class="item" v-for="(item,index) in [1,2,3,4,1,1,1]" :key="index">
        <div class="item__l">4月<br/><span>1</span></div>
        
        <div class="item__r-wrap">
          <div class="list-box" v-for="(item2,index2) in [1,2,3]" :key="index2">
            <div class="list__l">
              <van-image class="avatar" :src="require('@/assets/img/boy_avatar.png')" width=".2rem" round/>
              <div class="hours">12:45</div>
              <div class="line"></div>
            </div>

            <div class="list__r">
              <p>绿卡就是的浪费空间拉斯达克激烈反抗拉萨看得见flak涉及到了开发加拉撒旦解放了喀什角动量看附近了喀什角动量看附近了喀什角动量看附近了喀什角动量看附近了喀什角动量看附近</p>

              <div class="operat-wrap">
                <svg-icon iconClass="love" class="svg--like" />
                <!-- <svg-icon iconClass="love" class="svg--like svg--like--1" /> -->
                <!-- <svg-icon iconClass="love-letter0" class="svg--comment" /> -->
                <svg-icon iconClass="love-letter1" class="svg--comment" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
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
      .avatar {
        border: 5px solid #fff;
        &.avatar--girl {
          margin-left: -10px;
        }
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
      font-size: 14px;
      font-weight: bold;
    }
    .txt-wrap {
      flex: 1;
      width: 0;
      margin: 0 15px;
      overflow: hidden;
      .txt {
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        word-wrap: normal;
        margin-bottom: -10px;
        padding-bottom: 10px;
        font-size: 10px;
        text-align: center;
        color: #999999;
        -webkit-overflow-scrolling: touch;
      }
    }
    .svg--item-line {
      width: 18px;
      height: 18px;
      color: #ff0000;
    }
  }
  .con-wrap {
    margin-top: 45px;
    .item {
      display: flex;
      &:not(:first-child) {
        margin-top: 5px;
      }
      &__l {
        font-size: 14px;
        font-weight: bold;
        text-align: right;
        flex-shrink: 0;
        > span {
          font-size: 12px;
          // color: #999;
        }
      }
      &__r-wrap {
        .list-box {
          display: flex;
          &:not(:first-child) {
            margin-top: 5px;
          }
          .list__l {
            margin-left: 10px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            .avatar {
            }
            .hours {
              margin: 5px 0;
              font-size: 10px;
              color: #999;
            }
            .line {
              margin-bottom: 5px;
              width: 1px;
              flex: 1;
              background-color: #999;
            }
          }
          .list__r {
            margin-left: 15px;
            padding-bottom: 15px;
            font-size: 14px;
            .operat-wrap {
              margin-top: 10px;
              display: flex;
              align-items: center;
              .svg--like {
                margin-left: auto;
                width: 24px;
                height: 24px;
                color: #999;
                &--1 {
                  color: #FF3B50;
                }
              }
              .svg--comment {
                margin-left: 20px;
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
      
    }
  }
}
</style>
