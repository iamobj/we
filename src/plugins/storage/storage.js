class Storage {
  default = {
    sign: ''
  }

  constructor() {
    // 单例模式，只允许new一个对象
    if (instance) {
      return instance
    } else {
      instance = this
    }
  }

  // 兼容vue 注入
  install(Vue) {
    Vue.prototype.$storage = storage
  }

  /**
   * localStorage set
   * @param {string} k key值
   * @param {any} v value值 默认空字符 保存的值不是字符串，会自动使用JSON.stringify转换为字符串
   */
  setL(k, v = '') {
    if (!k) {
      throw new Error('请传入key')
    }
    if (typeof v !== 'string') {
      v = JSON.stringify(v)
    }
    window.localStorage.setItem(this.default.sign + k, v)
  }

  /**
   * localStorage get
   * @param {string} k key值
   * @param {any} v 默认返回值，如果要取的这个值不存在，就返回v，没传v，默认返回null
   * @returns 返回的值能转换成对象，会返回JSON.parse已经转换成对象的值
   */
  getL(k, v = null) {
    if (!k) {
      throw new Error('请传入key')
    }
    let data
    const d = window.localStorage.getItem(this.default.sign + k)
    if (d) {
      try {
        data = JSON.parse(d)
      } catch {
        data = d
      }
      return data
    } else {
      return v
    }
  }

  /**
   * localStorage removeItem
   * @param {string} k key值
   */
  delL(k) {
    if (!k) {
      throw new Error('请传入key')
    }
    window.localStorage.removeItem(this.default.sign + k)
  }

  /**
   * sessionStorage setItem
   * @param {string} k key值
   * @param {any} v any value值 默认空字符 保存的值不是字符串，会自动使用JSON.stringify转换为字符串
   */
  setS(k, v = '') {
    if (!k) {
      throw new Error('请传入key')
    }
    if (typeof v !== 'string') {
      v = JSON.stringify(v)
    }
    window.sessionStorage.setItem(this.default.sign + k, v)
  }

  /**
   * sessionStorage get
   * @param {string} k key值
   * @param {any} v 默认返回值，如果要取的这个值不存在，就返回v，没传v，默认返回null
   * @returns 返回的值能转换成对象，会返回JSON.parse已经转换成对象的值
   */
  getS(k, v = null) {
    if (!k) {
      throw new Error('请传入key')
    }
    let data
    const d = window.sessionStorage.getItem(this.default.sign + k)
    if (d) {
      try {
        data = JSON.parse(d)
      } catch {
        data = d
      }
      return data
    } else {
      return v
    }
  }

  /**
   * sessionStorage removeItem
   * @param {string} k key值
   */
  delS(k) {
    if (!k) {
      throw new Error('请传入key')
    }
    window.sessionStorage.removeItem(this.default.sign + k)
  }
}

let instance
const storage = new Storage()

export default storage
