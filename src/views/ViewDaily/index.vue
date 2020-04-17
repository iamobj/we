<!-- 查看时光 -->
<template>
  <div class="view-daily pd-main">
    <div class="top-wrap">
      <van-image class="avatar" :src="require('@/assets/img/boy_avatar.png')" width=".4rem" round/>
      
      <div class="info">
        <div class="nickname">小熊猫</div>
        <div class="time">2020年04月17号</div>
      </div>
    </div>
    
    <div class="txt">拉开就flak精神的理拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就拉开就flak精神的理拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊解拉斯达克警方立刻啊拉开就flak精神的理拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊解拉斯达克警方立刻啊flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊拉开就flak精神的理解拉斯达克警方立刻啊解拉斯达克警方立刻啊</div>

    <!-- 评论 -->
    <div class="comment-wrap">
      <div class="item">
        <div class="l fs0">
          <van-image class="avatar" :src="require('@/assets/img/boy_avatar.png')" width=".2rem" round/>
        </div>
        <div class="r">
          <!-- 昵称 -->
          <div class="nickname">大熊猫</div>
          <!-- 时间 -->
          <div class="time">2020年4月18日</div>
          <!-- 内容 -->
          <div class="txt">哈哈哈笑死</div>
        </div>
      </div>
    </div>

    <!-- 评论输入框 -->
    <div class="field-wrap">
      <div class="box">
        <van-field v-model.trim="comment" placeholder="输入评论内容" clearable>
          <template #button>
            <van-button size="small" type="primary">发送</van-button>
          </template>
        </van-field>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Field, Button } from 'vant'
export default {
  name: 'viewDaily',
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    
  },
  components: {
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
  }
}

</script>
<style lang="scss" scoped>
.view-daily {
  padding: 0 16px;
  .top-wrap {
    margin-top: 10px;
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
    font-size: 14px;
  }

  .comment-wrap {
    margin-top: 12px;
    .item {
      display: flex;
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
