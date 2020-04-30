import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue' // svg组件
import store from '@/store'

// 注册到全局
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)

store.commit('setIconsMap', iconMap)
