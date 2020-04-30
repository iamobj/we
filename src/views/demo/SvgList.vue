<!-- svg列表页，方便浏览查看 -->
<template>
  <div class="xmg-svgList">
    <div class="xmg-title" v-text="title"></div>
    <div class="xmg-svg-wrapper">
      <div class="xmg-item-box"  v-for="(item,index) in iconsMap" :key="index" @click.stop="itemClick(item)">
        <svg-icon :iconClass="item" class="xmg-svgI" />
        <div class="xmg-name">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'svgList',
  data() {
    return {
      title: '点击可复制当前svg组件代码，如：<svg-icon iconClass="tip" />'
    }
  },
  computed: {
    iconsMap: function() {
      const _iconsMap = this.$store.getters.getSvgIconMap.map(i => {
        return i.default.id.split('icon-')[1]
      })
      return _iconsMap
    }
  },
  methods: {
    itemClick(name) {
      document.oncopy = function(e) {
        e.clipboardData.setData('text', `<svg-icon iconClass="${name}" />`)
        e.preventDefault()
        document.oncopy = null
      }
      document.execCommand('Copy')
      this.$toast({ message: '已复制', duration: 600 })
    },
  }
}

</script>
<style  lang="scss" scoped>
.xmg-svgList {
  font-size: 0;
  .xmg-title {
    font-size: 16px;
    text-align: center;
    color: #F7525A;
    margin: 10px 0 20px;
  }
  .xmg-svg-wrapper {
    display: flex;
    flex-wrap: wrap;
    .xmg-item-box {
      margin: 6px 6px 6px 0;
      text-align: center;
      width: 145px;
      cursor: pointer;
      .xmg-svgI {
        width: 32px;
        height: 32px;
      }
      .xmg-name {
        font-size: 14px;
        margin-top: 6px;
      }
    }
  }
}
</style>
