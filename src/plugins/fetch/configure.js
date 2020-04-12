import fetch from 'axios'
import { Toast } from 'vant'
import Qs from 'qs'
import $storage from '@/plugins/storage'
import { stringify } from '@/utils/utils'
import router from '@/router'

// 默认配置
fetch.default.timeout = 50000
fetch.defaults.baseURL = process.env.VUE_APP_BASE_API
fetch.defaults.crossDomain = true
fetch.defaults.withCredentials = true
fetch.defaults.headers['Content-Type'] = 'application/json'

/**
 * `transformRequest` 允许在向服务器发送前，修改请求数据
 * 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
 * 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
 */
fetch.defaults.transformRequest = [function(data, headers) {
  let req = ''
  if (headers['Content-Type'] === 'application/x-www-form-urlencoded' && typeof data === 'object' && Object.prototype.toString.call(data) !== '[object FormData]') {
    req = Qs.stringify(data)
  } else if (headers['Content-Type'] === 'application/x-www-form-urlencoded' && typeof data === 'string') {
    try {
      const obj = JSON.parse(data)
      req = stringify(obj)
    } catch (error) {
      req = data
    }
  } else if (typeof data === 'object' && Object.prototype.toString.call(data) !== '[object FormData]') {
    req = JSON.stringify(data)
  } else {
    req = data
  }
  return req
}]

/**
 * `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject
 * 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
 * 默认是 return status >= 200 && status < 300
 * 这里设置返回 status即为返回 `true` 方便在响应请求拦截resolve中统一对状态码做处理
 */
fetch.defaults.validateStatus = function(status) {
  return status
}

let toast; let num = 0
// 特殊标识 不显示loading、响应拦截返回数据status不为1不显示后台返回的错误提示、需要登录的接口不跳登录页、需要登录的接口跳登录页的方法(push/replace,默认replace)、不走响应拦截、不走请求拦截，执行顺序是按照数组顺序执行，不走请求拦截要放在最后面，否则不走请求拦截后面的不会执行
const flagArr = ['_noLoading', '_noErrToastTip', '_noToLogin', '_toLoginType', '_noResponse', '_noRequest']

// 请求前拦截器
fetch.interceptors.request.use(config => {
  const params = config.data || config.params || {}
  for (const item of flagArr) {
    switch (item) {
      case '_noLoading':
        if (params._noLoading) {
          config._noLoading = true
        } else {
          openLoading()
        }
        break
      case '_noErrToastTip':
        if (params._noErrToastTip) {
          config._noErrToastTip = true
        }
        break
      case '_noToLogin':
        if (params._noToLogin) {
          config._noToLogin = true
        }
        break
      case '_toLoginType':
        if (params._toLoginType) {
          config._toLoginType = params._toLoginType
        }
        break
      case '_noResponse':
        if (params._noResponse) {
          config._noResponse = true
        }
        break
      case '_noRequest':
        if (params._noRequest) {
          // 清理掉参数对象这些值 避免请求带上这些参数
          config.params && delete config.params[item]
          config.data && delete config.data[item]
          return config
        }
        break
      default:
        break
    }

    // 清理掉参数对象这些值 避免请求带上这些参数
    config.params && delete config.params[item]
    config.data && delete config.data[item]
  }

  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
  const token = $storage.getL('token')
  token && (config.headers.Authorization = `Bearer ${$storage.getL('token')}`)

  return config
}, error => {
  // 请求错误处理
  console.error(error)
  return Promise.reject(error)
})

// 请求响应拦截
fetch.interceptors.response.use(data => {
  if (data.config._noResponse) {
    return data
  }
  data.config._noLoading || clearLoading()

  if (data.status !== 200) {
    let error = ''
    switch (data.status) {
      case 502:
        error = '服务器重启中'
        break
      case 500:
        error = '服务器内部错误'
        break
      case 404:
        error = '未找到远程服务器'
        break
      case 400:
        error = '请求发送数据异常'
        break
      default:
        error = data.statusText
    }
    Toast.fail(error)
    return Promise.reject(new Error(`${error},请求code:${data.status}`))
  }

  if (data.data && typeof data.data === 'object') {
    if ([1996].includes(data.data.code) && !data.config._noToLogin) {
      // 无token或token异常
      $storage.delL('token')
      data.config._noErrToastTip || (data.data.msg && Toast(data.data.msg))

      const currentUrl = window.location.href
      console.log('currentUrl', currentUrl)
      if (!currentUrl.includes('/login')) {
        // 当前页不是登录页才跳，避免前一个页面有多个需要登录的接口导致多次跳登录页，只要第一个跳过来，之后的接口就不需要跳
        const enterTyep = data.config._toLoginType || 'replace'
        router[enterTyep]({
          name: 'login',
          query: {
            backUrl: currentUrl,
            enterType: enterTyep
          }
        })
      }

      return Promise.reject(data.data)
    }
    
    if (data.data.code !== 1) {
      // status 不为1 说明返回数据有误,弹提示
      data.config._noErrToastTip || (data.data.msg && Toast(data.data.msg))

      return Promise.reject(data.data)
    }

    return data.data
  }
}, error => {
  // 错误处理
  console.error(error)

  if (error.message) {
    // 断网处理或者请求超时
    if (error.message.includes('timeout')) {
      // 超时
      Toast.fail('网络请求超时，请检查网络是否正常')
    } else {
      // 断网
      !navigator.onLine && Toast.fail('请检查网络是否已连接')
    }
    return Promise.reject(error)
  }

  return Promise.reject(error)
})

// 请求拦截开启loading逻辑
function openLoading() {
  // 每发一个请求 num记录下来 响应后再减去表示一个请求已经完毕，响应时间在500ms内，就不显示loading
  num++
  setTimeout(() => {
    if (num > 0) {
      toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中',
      })
    }
  }, 500)
}
// 响应拦截清除loading逻辑
function clearLoading() {
  num--
  if (num === 0 && toast) toast.clear()
}
