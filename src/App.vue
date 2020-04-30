<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <VKeepAliveChain>
      <router-view v-if="!$route.meta.keepAlive"/>
    </VKeepAliveChain>

    <van-tabbar route placeholder v-if="showTabbar" active-color="#ff455c">
      <van-tabbar-item
        v-for="item in tabbars"
        :key="item.id"
        :to="item.to"
        :icon="item.icon"
        :dot="item.dot"
      >
        {{item.label}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import { reqNoticeNew } from '@/services/notice.js'
export default {
  data() {
    return {
      tabbars: [
        {
          id: 1,
          to: { name: 'home' },
          label: '首页',
          icon: 'like'
        },
        {
          id: 2,
          to: { name: 'timeMeachine' },
          label: '时光机',
          icon: 'clock'
        },
        {
          id: 3,
          to: { name: 'mine' },
          label: '我的',
          icon: 'smile',
          dot: false
        }
      ],
      showTabbar: false
    }
  },
  watch: {
    '$route.name': function(nV, oV) {
      if (this.showTabbarRouteNames.includes(nV)) {
        this.showTabbar = true
        this.$storage.getL('token') && this.getNoticeNewNum()
      } else {
        this.showTabbar = false
      }
    },
  },
  methods: {
    // 获取未读消息通知数量
    getNoticeNewNum() {
      reqNoticeNew({ _noToLogin: 1 }).then(res => {
        const { data: { count } } = res
        const obj = this.tabbars.find(item => {
          return item.id === 3
        })
        obj.dot = !!count
      })
    }
  },
  created() {
    this.showTabbarRouteNames = []
    this.tabbars.forEach(item => {
      this.showTabbarRouteNames.push(item.to.name)
    })
  },
  mounted() {
  },
  components: {
    [TabbarItem.name]: TabbarItem,
    [Tabbar.name]: Tabbar
  }
}
</script>
