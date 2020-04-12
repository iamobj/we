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
        <div class="tip">共记录<div>{{dailys.count}}个时刻</div></div>
      </div>
    </div>

    <template v-if="dailys.list">
      <van-sticky>
        <div class="time-wrap pd-main">
          <span class="time">{{dailys.list[0].originalDate | formatDate('Y/m/d')}}</span>
          <!-- 这里套一层是为了隐藏在ios上的滚动条 -->
          <div class="txt-wrap">
            <!-- <div class="txt">生活不止眼前的苟且，还有诗和远方的田野。</div> -->
          </div>
          <svg-icon iconClass="time-line" class="svg--item-line" />
        </div>
      </van-sticky>

      <!-- 内容区 -->
      <main class="con-wrap pd-main">
        <section class="item" v-for="(item) in dailys.list" :key="item.originalDate" ref="listItem">
          <div class="item__l">{{item.originalDate | formatDate('m')}}月<br/><span>{{item.originalDate | formatDate('d')}}</span></div>
          
          <div class="item__r-wrap">
            <div class="list-box" v-for="(child) in item.child" :key="child._id">
              <div class="list__l">
                <!-- 头像 -->
                <van-image class="avatar" :src="require('@/assets/img/boy_avatar.png')" width=".2rem" round/>
                <div class="hours">{{child.time}}</div>
                <div class="line"></div>
              </div>

              <div class="list__r">
                <!-- 文本 -->
                <p>{{child.txt}}</p>

                <div class="operat-wrap">
                  <!-- 点赞 -->
                  <svg-icon iconClass="love" class="svg--like" :class="{'svg--like--1' : child.likes.length}" />
                  <!-- 评论 -->
                  <svg-icon :iconClass="child.comments.length ? 'love-letter1':'love-letter0' " class="svg--comment" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </template>
  </div>
</template>

<script>
import { Image, Sticky } from 'vant'
import { reqDailyList } from '@/services/daily.js'
import { formatDate } from '@/utils/format.js'
export default {
  name: 'timeMeachine',
  data() {
    return {
      dailys: {},
      pageNo: 1,
      pageSize: 20,
      weInfo: this.$store.getters.getWeInfo,
      listTop: [],
    }
  },
  methods: {
    async init() {
      await this.getDailyList()
      this.$nextTick(() => {
        this.$refs.listItem.forEach(item => {
          const top = item.offsetTop
          this.listTop.push(top)
        })
      })

      // 监听页面滚动
      document.addEventListener('scroll', this.pageScroll)
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('scroll', this.pageScroll)
      })
    },
    // 获取日常数据
    async getDailyList() {
      const params = {
        weId: this.weInfo._id,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      try {
        const { data } = await reqDailyList(params)
        data.list = this.handleDailyList(data.list)
        this.dailys = data
      } catch (error) {
        
      }
    },
    // 处理DailyLis数据，按天分组，同一天放在一个数组里
    handleDailyList(arr) {
      const newList = []
      arr.forEach(item => {
        const str = formatDate(item.createdAt, 'Y-m-d&H:i')
        const dateArr = str.split('&')
        item.date = dateArr[0]
        item.time = dateArr[1]

        let newListIndex = -1
        const isHas = newList.some((newItem, newIndex) => {
          if (item.date === newItem.date) {
            newListIndex = newIndex
            return true
          }
        })
        if (isHas) {
          newList[newListIndex].child.push(item)
        } else {
          newList.push({
            date: item.date,
            originalDate: item.createdAt,
            child: [item]
          })
        }
      })
      return newList
    },
    // 页面滚动事件
    pageScroll(e) {
      const scrollTop = e.target.documentElement.scrollTop
      console.log('pageScroll -> scrollTop', scrollTop)
      this.pageScrollTop = scrollTop
    }
  },
  mounted() {
    this.init()
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
        flex: 1;
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
            flex: 1;
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
