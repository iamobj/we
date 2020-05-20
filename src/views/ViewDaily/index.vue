<!-- 查看时光 -->
<template>
  <div class="view-daily pd-main">
    <van-skeleton title avatar :row="6" :loading="loading">
      <template v-if="dailyDetail.authorId">
      <div class="top-wrap">
        <van-image class="avatar" :src="dailyDetail.authorId.avatar | formatAssets" width=".4rem" height=".4rem" round/>
        
        <div class="info">
          <div class="nickname">{{dailyDetail.authorId.nickname}}</div>
          <div class="time">{{dailyDetail.createdAt | formatDate()}}</div>
        </div>
      </div>
      <!-- 文本内容 -->
      <div class="txt van-hairline--bottom">{{dailyDetail.txt}}</div>

      <!-- 评论 -->
      <div class="comment-wrap" v-if="dailyDetail.comments.length">
        <div class="item" v-for="item in dailyDetail.comments" :key="item._id">
          <div class="l fs0">
            <van-image class="avatar" :src="item.authorId.avatar | formatAssets" width=".2rem" height=".2rem" round/>
          </div>
          <div class="r">
            <!-- 昵称 -->
            <div class="nickname">{{item.authorId.nickname}}</div>
            <!-- 时间 -->
            <div class="time">{{item.createdAt | formatDate()}}</div>
            <!-- 内容 -->
            <div class="txt">{{item.txt}}</div>
          </div>
        </div>
      </div>

      <!-- 评论输入框 -->
      <div class="field-wrap">
        <div class="box">
          <van-field v-model.trim="comment" placeholder="输入评论内容" clearable>
            <template #button>
              <van-button size="small" type="primary" @click="sendComment">发送</van-button>
            </template>
          </van-field>
        </div>
      </div>
      </template>
    </van-skeleton>
  </div>
</template>

<script>
import { Image, Field, Button, Skeleton } from 'vant'
export default {
  name: 'viewDaily',
  props: {
    dailyId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comment: '',
      dailyDetail: {},
      loading: true
    }
  },
  methods: {
    async init() {
      try {
        const res = await this.$api.daily.reqDailyDetail(this.dailyId)
        this.dailyDetail = res.data
        this.loading = false
      } catch (error) {
        console.log('init -> error', error)
      }
    },
    // 发送评论
    sendComment() {
      if (!this.comment) {
        this.$toast('评论内容不能为空')
        return
      }
      const params = {
        dailyId: this.dailyId,
        txt: this.comment
      }
      this.$api.daily.reqDailyComment(params).then(async res => {
        this.comment = ''
        this.init()
      })
    },
  },
  mounted() {
    this.init()
  },
  components: {
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
  }
}

</script>
<style lang="scss" scoped>
.view-daily {
  padding: 10px 16px 0;
  .top-wrap {
    display: flex;
    .info {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .nickname {
        font-size: 14px;
      }
      .time {
        font-size: 10px;
        color: #b2b2b2;
      }
    }
  }
  
  .txt {
    margin-top: 16px;
    padding-bottom: 10px;
    font-size: 14px;
    white-space: pre-line;
  }

  .comment-wrap {
    margin-top: 10px;
    .item {
      display: flex;
      &:not(:first-child) {
        margin-top: 10px;
      }
      .l {
        flex-shrink: 0;
      }
      .r {
        flex: 1;
        width: 0;
        margin-left: 10px;
        .nickname {
          font-size: 14px;
        }
        .time {
          font-size: 10px;
          color: #b2b2b2;
        }
        .txt {
          margin-top: 6px;
          font-size: 14px;
        }
      }
    }
  }

  .field-wrap {
    margin-top: 5px;
    height: 50px;
    .box {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 -1px 1px rgba(0,0,0,.08);
    }
  }
}
</style>
