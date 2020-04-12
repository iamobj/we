export default {
  state: {
    svgIconMap: [], // svg文件数组，供svgList页面使用
    weInfo: null,
  },
  getters: {
    getSvgIconMap: state => state.svgIconMap,
    getWeInfo: state => state.weInfo
  },
  mutations: {
    setIconsMap(state, data) {
      state.svgIconMap = data
    },
    setWeInfo(state, data) {
      state.weInfo = data
    }
  }
}
