// 定制vant组件js代码 注：在每个模块的main.js中引入
import { Image, Lazyload } from 'vant'
import Vue from 'vue'

Vue.use(Lazyload)

// Image
Image.props.fit.default = 'cover'
Image.props.lazyLoad = true
