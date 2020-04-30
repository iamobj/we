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
      title: '首页',
      weId: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    },
    props: router => ({
      enterType: router.query.enterType,
      backUrl: router.query.backUrl
    })
  },
  {
    path: '/timeMeachine',
    name: 'timeMeachine',
    component: () => import('@/views/TimeMachine'),
    meta: {
      title: '时光机',
      weId: true, // 需要有weId才能进
      cacheTo: ['viewDaily']
    }
  },
  {
    path: '/releaseDaily',
    name: 'releaseDaily',
    component: () => import('@/views/ReleaseDaily'),
    meta: {
      title: '新增时光',
      weId: true, // 需要有weId才能进
    }
  },
  {
    path: '/viewDaily/:dailyId',
    name: 'viewDaily',
    component: () => import('@/views/ViewDaily'),
    meta: {
      title: '查看时光',
      weId: true, // 需要有weId才能进
    },
    props: true
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine'),
    meta: {
      title: '我的',
      weId: true, // 需要有weId才能进
    }
  },
  {
    path: '/newsList',
    name: 'newsList',
    component: () => import('@/views/NewsList'),
    meta: {
      title: '消息列表',
      weId: true, // 需要有weId才能进
      cacheTo: ['viewDaily']
    }
  },
]

if (process.env.NODE_ENV !== 'production') {
  // 不是生产环境 需要的路由页面 比如demo页面，生产环境不需要
  const devRoutes = [
    {
      path: '/svgList',
      name: 'svgList',
      component: () => import('@/views/demo/SvgList.vue'),
      meta: {
        title: 'svg图标展厅'
      }
    }
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
