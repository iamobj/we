<template>
  <div id="app">
    <router-view />

    <van-tabbar route placeholder v-if="showTabbar" active-color="#ff455c">
      <van-tabbar-item
        v-for="item in tabbars"
        :key="item.id"
        :to="item.to"
        :icon="item.icon"
      >
        {{item.label}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
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
          icon: 'smile'
        }
      ]
    }
  },
  computed: {
    showTabbar: function() {
      const routeNames = []
      this.tabbars.forEach(item => {
        routeNames.push(item.to.name)
      })
      return routeNames.includes(this.$route.name)
    }
  },
  mounted() {
    console.log(this.$route)
  },
  components: {
    [TabbarItem.name]: TabbarItem,
    [Tabbar.name]: Tabbar
  }
}
</script>
