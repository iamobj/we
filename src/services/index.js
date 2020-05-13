/**
 * 挂载api接口
 */
const apiContext = require.context('./modules/', true, /\.js$/)
const api = {}
apiContext.keys().map(key => {
  const apiName = key.split('/').pop().replace(/\.\w+$/, '')
  api[apiName] = apiContext(key)
})

export default {
  install(Vue) {
    Vue.prototype.$api = api
  }
}

export {
  api
}
