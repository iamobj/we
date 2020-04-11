import Vue from 'vue'
import fetch from './fetch'
import storage from './storage'

// 自动注册全局插件/组件
const plugins = [
  storage,
  fetch
]
plugins.forEach(item => {
  Vue.use(item)
})

export {
  fetch,
  storage
}
