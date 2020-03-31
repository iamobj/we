// 路由相关处理 全局守卫等
import router from './router'
import { Toast } from 'vant'

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 进每个页面前都清掉toast,避免上个页面请求遗留的toast，切换页面还显示的bug
  Toast.clear()

  next()
})

router.afterEach((to, from) => {
  // 设置每个页面的标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'we'
  }
})
