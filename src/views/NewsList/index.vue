<!-- 消息列表 -->
<template>
  <div class="news-list">
    <van-skeleton avatar :row="3" :loading="loading">
      <template v-if="notice.count">
        <van-list
          v-model="listLoading"
          :finished="listFinished"
          :error.sync="listError"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="loadMore">
          <van-swipe-cell v-for="(item, index) in notice.list" :key="item._id" ref="cell">
            <div class="item fs0" @click="clickNoticeItem(item)">
              <div class="l">
                <van-image class="avatar" :src="item.authorId.avatar | formatAssets" width=".4rem" height=".4rem" round/>
                <div class="dto" v-if="!item.read"></div>
              </div>

              <div class="r van-hairline--bottom">
                <div class="row1">
                  <span class="nickname">{{item.authorId.nickname}}</span>
                  <span class="time">{{item.createdAt | formatDate()}}</span>
                </div>

                <template v-if="item.type === NOTICE.TYPE.COMMENT">
                  <div class="comment">评论：{{item.content}}</div>
                  <div class="quote"><span class="van-multi-ellipsis--l3">{{item.quoteDailyId.txt}}</span></div>
                </template>
              </div>
            </div>

            <template #right>
              <van-button square type="primary" @click.native.stop="clickReadBtn(index, item)" text="已读" class="btn--read" />
            </template>
          </van-swipe-cell>
        </van-list>
      </template>
      <!-- 暂无数据 -->
      <template v-else>
        <van-empty description="暂无消息" />
      </template>
    </van-skeleton>
  </div>
</template>

<script>
import { SwipeCell, List, Image, Button, Empty, Skeleton } from 'vant'
import { reqNoticeList, reqNoticeUpdate } from '@/services/notice.js'
import { NOTICE } from '@/constant'
export default {
  name: 'newsList',
  data() {
    return {
      listLoading: false,
      listFinished: false,
      listError: false,
      pageNo: 1,
      pageSize: 10,
      notice: {},
      loading: true,
      NOTICE: NOTICE,
    }
  },
  methods: {
    async init() {
      await this.getNoticeList()
      this.loading = false
    },
    // 加载更多
    loadMore() {
      this.pageNo++
      this.getNoticeList()
    },
    // 获取消息数据
    async getNoticeList() {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      this.listLoading = true
      try {
        const { data } = await reqNoticeList(params)
        this.listFinished = data.list.length < this.pageSize
        data.list = this.pageNo === 1 ? data.list : [...this.notice.list, ...data.list]
        this.notice = data
      } catch (error) {
        this.listError = true
        this.pageNo--
        console.log('getNoticeList -> error', error)
      }
      this.listLoading = false
    },
    // 消息变为已读
    async getNoticeRead(noticeId) {
      const params = {
        id: noticeId,
        read: true
      }
      try {
        await reqNoticeUpdate(params)
      } catch (error) {
        console.log('getNoticeRead -> error', error)
      }
    },
    // 点击消息列表
    clickNoticeItem(item) {
      this.getNoticeRead(item._id).then(() => {
        item.read = true
      })
      this.$router.push({ name: 'viewDaily', params: { dailyId: item.quoteDailyId._id } })
    },
    // 点击已读按钮
    clickReadBtn(index, item) {
      this.getNoticeRead(item._id).then(() => {
        item.read = true
        this.$refs.cell[index].close()
      })
    },
  },
  mounted() {
    this.init()
  },
  components: {
    [SwipeCell.name]: SwipeCell,
    [List.name]: List,
    [Image.name]: Image,
    [Button.name]: Button,
    [Empty.name]: Empty,
    [Skeleton.name]: Skeleton,
  }
}

</script>
<style lang="scss" scoped>
.news-list {
  .item {
    display: flex;
    align-items: flex-start;
    padding: 8px 10px 0;
    .l {
      position: relative;
      flex-shrink: 0;
      .dto {
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 8px;
        background-color: #ee0a24;
        border-radius: 100%;
      }
    }
    .r {
      margin-left: 10px;
      padding-bottom: 10px;
      flex: 1;
      width: 0;
      .row1 {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
      .nickname {
        font-size: 14px;
      }
      .time {
        font-size: 10px;
        color: #b2b2b2;
      }
    }
    .comment {
      margin-top: 10px;
      font-size: 14px;
    }
    .quote {
      margin-top: 5px;
      font-size: 12px;
      background-color: #f6f6f6;
      padding: 5px;
    }
  }
  .btn--read {
    height: 100%;
    vertical-align: top;
  }
}
</style>
