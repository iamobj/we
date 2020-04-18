<!-- 我的 -->
<template>
  <div class="mine">
    <div class="info-wrap">
      <van-image :src="require('@/assets/img/boy_avatar.png')" width=".7rem" round/>
      <div class="nickname">小熊猫</div>
    </div>
    
    <!-- 菜单 -->
    <van-cell-group class="menu-wrap">
      <van-cell title="消息列表" is-link :to="{name: 'newsList'}">
        <template #default>
          <div class="info">9</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Image, Cell, CellGroup } from 'vant'
export default {
  name: 'mine',
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
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
