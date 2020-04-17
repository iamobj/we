import Vue from 'vue'
import fetch from './fetch'
import storage from './storage'
import { formatDate } from '@/utils/format'
import mixins from './mixins'

// 自动注册全局插件/组件
const plugins = [
  storage,
  fetch
]
plugins.forEach(item => {
  Vue.use(item)
})

// 自动注册全局filter
const filter = [
  formatDate
]
filter.forEach(item => {
  Vue.filter(item.name, item)
})

// 自动注册全局mixin
mixins.forEach(item => {
  Vue.mixin(item)
})

export {
  fetch,
  storage
}
