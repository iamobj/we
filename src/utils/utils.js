/**
 * 特殊的对象格式化url 参数形式 将数组转换成
 *  x[]=123&x[]=456
 * @param {*} param
 * @param {*} key
 * @param {*} encode
 */

export function stringify(param, key, encode) {
  if (param == null) return ''
  var paramStr = ''
  var t = typeof param
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr +=
      '&' +
      key +
      '=' +
      (encode == null || encode ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? '[' + ']' : '.' + i)
      paramStr += stringify(param[i], k, encode)
    }
  }
  return paramStr
}

/**
 * 提取对象
 * @param {object} obj 对象
 * @param {string[]} keys 需要提取得key字符串集合
 * @param {boolean} delKey 是否要删除原对象提取的key
 * @returns {object} 返回提取的对象
 * @example
 * extractObj({
 *  obj: {a: 1, b: 2},
 *  keys: ['a']
 * }) => {a: 1}
 */
export function extractObj({ obj = {}, keys, delKey = false }) {
  const ob = {}
  keys.map(key => {
    if (key in obj) {
      ob[key] = obj[key]
      delKey && delete obj[key]
    }
  })
  return ob
}
