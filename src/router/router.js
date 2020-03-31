import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  }
]

if (process.env.NODE_ENV !== 'production') {
  // 不是生产环境 需要的路由页面 比如demo页面，生产环境不需要
  const devRoutes = [
  ]
  routes = [...routes, ...devRoutes]
}

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) { // 路由跳转滚动条置顶
    return { x: 0, y: 0 }
  }
})

export default router