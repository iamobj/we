export default {
  state: {
    svgIconMap: [], // svg文件数组，供svgList页面使用
  },
  getters: {
    getSvgIconMap: state => state.svgIconMap,
  },
  mutations: {
    setIconsMap(state, data) {
      state.svgIconMap = data
    },
  }
}
