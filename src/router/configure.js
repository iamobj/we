// 路由相关处理 全局守卫等
import router from './router'
import { Toast } from 'vant'
import $store from '@/store'
import { api as $api } from '@/services'
import { storage as $storage } from '@/plugins'
import { mergeBeforeEachHook } from '@/plugins/VKeepAlive'

// 路由全局前置守卫
router.beforeEach(mergeBeforeEachHook((to, from, next) => {
  // 进每个页面前都清掉toast,避免上个页面请求遗留的toast，切换页面还显示的bug
  Toast.clear()

  if (to.meta.weId) {
    // 需要有weId才能进的页面判断
    if ($store.getters.getWeInfo) {
      next()
    } else {
      if ($storage.getL('token')) {
        // 有token就请求那we信息
        $api.we.reqWeInfo().then(res => {
          const { data } = res
          if (data) {
            // 有we信息,把数据保存到vuex
            $store.commit('setWeInfo', data)
            next()
          } else {
            // 没有we信息说明还没绑定，跳去新建/绑定we

          }
        }).catch(() => {
          // 出错（如token过期）也前往登录页，重新登录
          next({ name: 'login' })
        })
      } else {
        // 没有we信息且没有token就去登录页
        next({ name: 'login' })
      }
    }
  } else {
    next()
  }
}))

// 路由全局后置守卫
router.afterEach((to, from) => {
  // 设置每个页面的标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'we'
  }
})
