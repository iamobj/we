// 公共校验方法

/**
 * 判断一个值是否为数字
 * val 值
 * falg 是否开启强转换判断 默认开启
 * 强转换判断：可转换为数值的字符串 也会返回true，比如'123'
 * 弱判断：不转换，比如123才会返回true 字符串'123'返回false
 */
export function isNumber(val, flag = true) {
  if (flag) {
    return /^\d+(\.\d+)?$/.test(val)
  } else {
    return typeof (val) === 'number'
  }
}

/**
 * 是否是正确得手机号，检测包括大陆、香港、台湾、澳门手机格式
 *
 * @export
 * @param {string} val
 * @returns {boolean}
 */
export function isMobile(val) {
  val = val.replace(/[^-|\d]/g, '')
  const dalu = /^[1][3-9]\d{9}$/
  const hongkong = /^([6|9])\d{7}$/
  const taiwan = /^[0][9]\d{8}$/
  const aomen = /^[6]([8|6])\d{5}$/
  return dalu.test(val) || hongkong.test(val) || taiwan.test(val) || aomen.test(val)
}
