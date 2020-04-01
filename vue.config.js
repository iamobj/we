// 查阅文档https://cli.vuejs.org/zh/config/#vue-config-js

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const vueConfig = {
  productionSourceMap: false, // 生产环境的source map，设置为 false 加速生产环境构建，如果需要用到source map再打开
  publicPath: IS_PROD ? './' : '/', // 部署应用包时的基本 URL
  outputDir: 'we', // 生成生产环境构建文件的目录
  assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)

  // 修改webpack配置（链式操作 (高级)）
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))

    if (IS_PROD) {
      // 图片压缩 开发环境不压缩，影响开发时候编译速度
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 75 },
          optipng: { enabled: false },
          pngquant: { quality: [0.75, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
          // webp: { quality: 75 } // webp选项将启用WEBP 没有用到webp 就不启用
        })
    }

    /* svg loader 配置 Start */
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })

    // 修改images-loader 排除对svg文件的处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    imagesRule
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    /* svg loader 配置 End */
  },

  // 修改webpack配置 与chainWebpack不同，表现最明显的不同是这两个的config对象不同
  configureWebpack: config => {
    if (IS_PROD) {
      // 移除console.log 只对NODE_ENV为production模式生效
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
  },

  css: {
    loaderOptions: {
      scss: {
        // 向全局scss样式传入共享的全局变量
        prependData: `
          @import "@/assets/css/_mixins.scss";
        `
      },
      less: {
        modifyVars: {
          // 定制vant组件主题
          hack: `true; @import "${resolve('src')}/assets/css/_vant-theme.less";`
        }
      },
      postcss: {
        plugins: [
          pxtorem({
            // 配置px转换rem插件 https://github.com/cuth/postcss-pxtorem
            rootValue: 100,
            propList: ['*'],
            // selectorBlackList: [/^(?![\.|#]van-).*$/], // 忽略不是'.van-','#van-'开头的选择器，目的是只转换vant ui库里的，页面里的不需要
            selectorBlackList: [/^\.xmg-.*$/], // 忽略'.xmg-'开头的选择器
            minPixelValue: 2 // 最小像素值（小于这个像素不会被转换）
          }),
          autoprefixer() // 启用自动添加CSS浏览器兼容前缀，兼容浏览器列表在.browserslistrc文件
        ]
      }
    }
  },

  devServer: {
    hot: true, // 热加载
    host: '0.0.0.0', // ip地址
    port: 9697, // 端口
    disableHostCheck: true, // 内网穿透映射到外网需要添加这一行，不然会报Invalid Host header错误
    https: false, // false关闭https，true为开启
    open: false // 自动打开浏览器
  }
}

module.exports = vueConfig
