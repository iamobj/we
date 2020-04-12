// 公共格式化方法

/**
 * 时间格式化
 *
 * @export
 * @param {*} date
 * @param {string} [format="Y-m-d H:i:s"]
 * @returns {string}
 */
export function formatDate(date, format = 'Y-m-d H:i:s') {
  // 转为date对象
  const realDate = new Date(date)

  const year = realDate.getFullYear()
  const month = realDate.getMonth() + 1
  const day = realDate.getDate()
  const hour = realDate.getHours()
  const minite = realDate.getMinutes()
  const second = realDate.getSeconds()

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
