// 公共格式化方法

/**
 * 时间格式化
 *
 * @export
 * @param {*} date
 * @param {string} [format="Y-m-d H:i:s"]
 * @returns {string}
 */
export const formatDate = (date, format = 'Y-m-d H:i:s') => {
  // 转为date对象
  const realDate = new Date(date)

  function zero(val) {
    return val.toString().padStart(2, '0')
  }
  
  const year = realDate.getFullYear()
  const month = realDate.getMonth() + 1
  const day = realDate.getDate()
  const hour = realDate.getHours()
  const minite = zero(realDate.getMinutes())
  const second = zero(realDate.getSeconds())

  return format.replace(/Y|m|d|H|i|s/ig, matches => {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches]
  })
}

/**
 * 格式化资源地址
 * @param {string} val 后台返回的资源路劲
 */
export const formatAssets = (val) => {
  return val ? `${process.env.VUE_APP_ASSETS_BASE_URL}${val}` : ''
}
