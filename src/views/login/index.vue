<!-- 登陆页 -->
<template>
  <div class="login">
    <div class="main">
      <van-field
        v-model.trim="tel"
        maxlength="11"
        clearable
        type="tel"
        placeholder="手机号"
      />
      <van-field
        v-model.trim="password"
        clearable
        type="password"
        placeholder="密码"
      />
      <van-button
        @click="clickLogin"
        :disabled="loginBtnDisabled"
        class="btn--login"
        type="primary"
        block
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { Field, Button } from 'vant'
import { isMobile } from '@/utils/validate.js'
export default {
  name: 'login',
  props: {
    enterType: {
      type: String
    },
    backUrl: {
      type: String
    }
  },
  data() {
    return {
      tel: '',
      password: '',
    }
  },
  computed: {
    loginBtnDisabled: function() {
      if (this.tel && this.password) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // 点击登录
    async clickLogin() {
      if (!isMobile(this.tel)) {
        this.$toast('请输入正确手机号')
        return
      }
      if (this.password.length < 6) {
        this.$toast('密码最少有6位')
        return
      }
      const params = {
        mobileNum: this.tel,
        password: this.password
      }
      try {
        const { data } = await this.$api.user.reqUserLogin(params)
        // 登录成功
        this.$toast('登录成功')
        this.$storage.setL('token', data.token)
        if (data.we._id) {
          // 有weId,把weId保存到vuex
          this.$store.commit('setWeInfo', data.we)
          
          if (this.enterType === 'replace' && this.backUrl) {
          // replace进来的且有回跳地址就replace过去
            location.replace(this.backUrl)
          } else {
            if (history.length) {
            // 不是replace进来的有历史栈就back
              this.$router.back()
            } else {
            // 没有回跳地址且没有历史栈就replace回全站首页
              this.$router.replace({ name: 'home' })
            }
          }
        } else {
          // 没有weId，让创建或者绑定现有的

        }
      } catch (error) {
        console.log('clickLogin -> error', error)
      }
    },
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  }
}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #ff455c;
  .main {
    margin: -20px auto 0;
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 8px 1px #fb9eaa;
    .btn--login {
      margin-top: 20px;
    }
  }
}
</style>
