// const TerserPlugin = require("terser-webpack-plugin")
// const HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
  publicPath: './',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: (config) => { // 使用erser去除console，debugger，注释，优化性能
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress = {
          drop_console: true,
          drop_debugger: true
        }
        args[0].terserOptions.format = {
          comments: false,
        }
        return args
      })
    }
  }
}
// if (process.env.NODE_ENV === 'production') {
//   module.exports = {
//     configureWebpack: {
//       plugins: [
//         new HtmlWebpackPlugin({
//           template: './public/index.html',
//           // 指纹
//           hash: true,
//           // 优化
//           minify: {
//             collapseWhitespace: true,
//             removeComments: false, // 删除注释
//             removeRedundantAttributes: true,
//             removeScriptTypeAttributes: true,
//             removeStyleLinkTypeAttributes: true,
//             useShortDoctype: true
//           }
//         })
//       ] 
//     }
//   }
// }
  