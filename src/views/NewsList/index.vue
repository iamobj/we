<!-- 消息列表 -->
<template>
  <div class="news-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了">
      <van-swipe-cell v-for="(item,index) in [1,2,3]" :key="index">
        <div class="item fs0">
          <div class="l">
            <van-image class="avatar" :src="require('@/assets/img/boy_avatar.png')" width=".4rem" round/>
            <div class="dto"></div>
          </div>

          <div class="r van-hairline--bottom">
            <div class="row1">
              <span class="nickname">小熊猫</span>
              <span class="time">2020年</span>
            </div>

            <div class="comment">评论你：哈哈哈笑死人</div>
            <div class="quote"><span class="van-multi-ellipsis--l3">我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话我讲个笑话</span></div>
          </div>
        </div>

        <template #right>
          <van-button square type="primary" text="已读" class="btn--read" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { SwipeCell, List, Image, Button } from 'vant'
export default {
  name: 'newsList',
  data() {
    return {
      loading: false,
      finished: true
    }
  },
  methods: {
    
  },
  components: {
    [SwipeCell.name]: SwipeCell,
    [List.name]: List,
    [Image.name]: Image,
    [Button.name]: Button,
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
