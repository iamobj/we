<!-- 发布日常 -->
<template>
  <div class="release-daily">
    <div class="textarea-wrap">
      <van-field
        v-model.trim="txt"
        type="textarea"
        autofocus
        :maxlength="1314"
        show-word-limit
        placeholder="快记录下今天的小时光吧~"
      />
    </div>
    <van-divider class="pd-main line" />

    <van-button @click="releaseDaily" class="release-btn" type="primary" round block>发布</van-button>
  </div>
</template>

<script>
import { Field, Divider, Button } from 'vant'
export default {
  name: 'releaseDaily',
  data() {
    return {
      txt: '',
      weId: this.$store.getters.getWeInfo._id
    }
  },
  methods: {
    releaseDaily() {
      if (!this.txt) {
        this.$toast('内容不能为空')
        return
      }
      const params = {
        weId: this.weId,
        txt: this.txt
      }
      this.$api.daily.reqReleaseDaily(params).then(res => {
        this.$toast('发布成功✌,启程返航')
        setTimeout(() => {
          if (history.length) {
            this.$router.back()
          } else {
            this.$router.push({ name: 'timeMeachine' })
          }
        }, 1314)
      })
    }
  },
  components: {
    [Field.name]: Field,
    [Divider.name]: Divider,
    [Button.name]: Button,
  }
}
</script>
<style lang="scss" scoped>
.release-daily {
  .pd-main {
    padding: 0 16px;
  }
  .textarea-wrap {
    .van-field ::v-deep {
      textarea {
        min-height: 100px;
      }
    }
  }
  .line {
    margin-top: 0;
  }
  .release-btn {
    margin: 20px auto 0;
    width: 240px;
  }
}
</style>
