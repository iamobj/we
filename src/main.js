import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
import '@/assets/js/vantCustom'
import '@/icons'
import '@/plugins'
import services from '@/services'
Vue.use(services)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
