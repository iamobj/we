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
        <div class="tip">共记录<div>{{dailys.count}}个时光</div></div>
      </div>
    </div>

    <!-- <van-sticky>
      <div class="time-wrap pd-main">
        <span class="time">不知道放什么</span> -->
        <!-- 这里套一层是为了隐藏在ios上的滚动条 -->
        <!-- <div class="txt-wrap"> -->
          <!-- <div class="txt">生活不止眼前的苟且，还有诗和远方的田野。</div> -->
        <!-- </div>
        <svg-icon iconClass="time-line" class="svg--item-line" />
      </div>
    </van-sticky> -->

    <!-- 内容区 -->
    <van-skeleton style="margin-top: 20px" title avatar :row="3" :loading="!dailys.list">
      <main class="con-wrap pd-main">
        <section class="item van-hairline--bottom" v-for="item in dailys.list" :key="item._id" @click="toViewDailyDetail(item)">
          <div class="l fs0">
            <van-image class="avatar" :src="require('@/assets/img/boy_avatar.png')" width=".4rem" round  />
          </div>
          <div class="r">
            <!-- 昵称 -->
            <div class="nickname">{{item.authorId.nickname}}</div>
            <!-- 时间 -->
            <div class="time">{{item.createdAt | formatDate()}}</div>
            <!-- 文本 -->
            <div class="txt van-multi-ellipsis--l3">{{item.txt}}</div>

            <!-- 操作 -->
            <div class="operat-wrap">
              <!-- 点赞 -->
              <svg-icon iconClass="love" class="svg--like" :class="{'svg--like--1' : item.likes.length}" />
              <!-- 评论 -->
              <svg-icon :iconClass="item.comments.length ? 'love-letter1':'love-letter0' " class="svg--comment" />
            </div>
          </div>
        </section>
        
        <van-divider v-if="loadMore">正在加载更多...</van-divider>

        <van-divider v-if="loadFinish">已经到底啦</van-divider>
      </main>
    </van-skeleton>
    
    <!-- 暂无数据 -->
    <van-empty v-if="dailys.list && !dailys.list.length" description="暂无数据" />

    <!-- 发布按钮 -->
    <svg-icon iconClass="release" class="svg--release" @click.native="toReleasePage" />
  </div>
</template>

<script>
import { Image, Sticky, Skeleton, Empty, Divider } from 'vant'
import { reqDailyList } from '@/services/daily.js'
export default {
  name: 'timeMeachine',
  data() {
    return {
      dailys: {},
      pageNo: 1,
      pageSize: 10,
      weInfo: this.$store.getters.getWeInfo,
      loadMore: false,
      loadFinish: false,
    }
  },
  methods: {
    async init() {
      await this.getDailyList()
      this.$nextTick(() => {
        // 监听页面滚动
        document.addEventListener('scroll', this.pageScroll)
        this.$once('hook:beforeDestroy', () => {
          document.removeEventListener('scroll', this.pageScroll)
        })
      })
    },
    // 前往查看时光详情
    toViewDailyDetail(item) {
      this.$router.push({ name: 'viewDaily', params: { dailyId: item._id } })
    },
    // 前往发布页面
    toReleasePage() {
      this.$router.push({ name: 'releaseDaily' })
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
        this.loadFinish = data.list.length < this.pageSize
        data.list = this.pageNo === 1 ? data.list : [...this.dailys.list, ...data.list]

        this.dailys = data
      } catch (error) {
        
      }
    },
    // 页面滚动事件
    pageScroll(e) {
      const offset = 300 // 滚动条与底部距离小于 offset 时触发load事件

      // 兼容方式获取页面滚动top
      let scrollTop
      if (typeof window.pageYOffset !== 'undefined') {
        scrollTop = window.pageYOffset
      } else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
        scrollTop = document.documentElement.scrollTop
      } else if (typeof document.body !== 'undefined') {
        scrollTop = document.body.scrollTop
      }
      
      const scrollHeight = e.target.documentElement.scrollHeight
      const clientHeight = e.target.documentElement.clientHeight
      
      if ((scrollHeight - clientHeight - offset) <= scrollTop && !this.loadMore && !this.loadFinish) {
        this.loadMore = true
        this.pageNo++

        this.getDailyList().then(() => {
          this.loadMore = false
        })
      }
    }
  },
  mounted() {
    this.init()
  },
  components: {
    [Image.name]: Image,
    [Sticky.name]: Sticky,
    [Skeleton.name]: Skeleton,
    [Empty.name]: Empty,
    [Divider.name]: Divider,
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
    background-color: #fbfbfb;
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
    .item {
      display: flex;
      padding: 20px 0;
      .l {
        flex-shrink: 0;
      }
      .r {
        flex: 1;
        width: 0;
        margin-left: 16px;
        .nickname {
          font-size: 14px;
        }
        .time {
          font-size: 10px;
          color: #b2b2b2;
        }
        .txt {
          margin-top: 16px;
          font-size: 14px;
          white-space: pre-line;
        }
        .operat-wrap {
          margin-top: 16px;
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
  .svg--release {
    position: fixed;
    right: 20px;
    bottom: 70px;
    z-index: 99;
    width: 50px;
    height: 50px;
  }
}
</style>
