import Vue from 'vue'
import fetch from './fetch'
import storage from './storage'
import { formatDate, formatAssets } from '@/utils/format'
import mixins from './mixins'
import { VKeepAliveChain } from './VKeepAlive'

// 自动注册全局插件/组件
const plugins = [
  storage,
  fetch,
  VKeepAliveChain
]
plugins.forEach(item => {
  Vue.use(item)
})

// 自动注册全局filter
const filter = [
  {
    name: 'formatDate',
    fn: formatDate
  },
  {
    name: 'formatAssets',
    fn: formatAssets
  },
]
filter.forEach(item => {
  Vue.filter(item.name, item.fn)
})

// 自动注册全局mixin
mixins.forEach(item => {
  Vue.mixin(item)
})

export {
  fetch,
  storage,
}
