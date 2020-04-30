// 全局mixin

// 解决页面在苹果手机上 输入法点完成后 页面没有复原 底部留有空隙或导致页面错乱
const mixinIosInput = {
  updated() {
    setTimeout(() => {
      var m = navigator.userAgent
      var isIos = !!m.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      // 解决页面在苹果手机上 输入法点完成后 页面没有复原 底部留有空隙或导致页面错乱
      if (isIos) {
        const $inputs = Array.from(document.getElementsByTagName('input'))
        const body = document.body
        $inputs.forEach(item => { // 定时器是处理多个input间快速切换闪屏问题
          item.onblur = function() { // onblur是核心方法
            clearTimeout(body.timer)
            body.timer = setTimeout(() => {
              document.body.scrollTop = document.documentElement.scrollTop = 0
            }, 150)
          }
          item.onfocus = function() {
            clearTimeout(body.timer)
          }
        })
      }
    }, 20)
  }
}

export default [
  mixinIosInput
]
