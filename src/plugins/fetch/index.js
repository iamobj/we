import fetch from 'axios'
import './configure'
fetch.install = Vue => {
  Vue.prototype.$fetch = fetch
}
export default fetch
