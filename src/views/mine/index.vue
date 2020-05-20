<!-- 我的 -->
<template>
  <div class="mine">
    <div class="info-wrap">
      <van-image :src="userInfo.avatar | formatAssets" width=".7rem" height=".7rem" round/>
      <div class="nickname">{{userInfo.nickname}}</div>
    </div>
    
    <!-- 菜单 -->
    <van-cell-group class="menu-wrap">
      <van-cell title="消息列表" is-link :to="{name: 'newsList'}">
        <template #default>
          <div class="info" v-if="noticeNewNum">{{noticeNewNum | noticeNewNumFormat}}</div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 心语 -->
    
  </div>
</template>

<script>
import { Image, Cell, CellGroup, Sticky } from 'vant'
export default {
  name: 'mine',
  data() {
    return {
      noticeNewNum: 0,
      userInfo: {},
    }
  },
  filters: {
    noticeNewNumFormat(val) {
      return val > 99 ? '99+' : val
    }
  },
  methods: {
    init() {
      this.getNoticeNewNum()
      this.getUserInfo()
    },
    // 获取未读消息通知数量
    getNoticeNewNum() {
      this.$api.notice.reqNoticeNew().then(res => {
        const { data: { count } } = res
        this.noticeNewNum = count
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.$api.user.reqUserInfo().then(res => {
        this.userInfo = res.data
      })
    }
  },
  mounted() {
    this.init()
  },
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Sticky.name]: Sticky,
  }
}

</script>
<style lang="scss" scoped>
.mine {
  .page-pd {
    padding: 0 10px;
  }
  .info-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    height: 200px;
    background-color: #ff455c;
    .nickname {
      margin-top: 10px;
      font-size: 20px;
      color: #fff;
    }
  }
  .menu-wrap {
    margin-top: 80px;
    .info {
      display: inline-block;
      min-width: 16px;
      padding: 0 3px;
      color: #fff;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      background-color: #ee0a24;
      border: 1px solid #fff;
      border-radius: 16px;
    }
  }
}
</style>
