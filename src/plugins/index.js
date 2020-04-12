import Vue from 'vue'
import fetch from './fetch'
import storage from './storage'
import { formatDate } from '@/utils/format'

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

export {
  fetch,
  storage
}
