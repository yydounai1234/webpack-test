const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { NODE_ENV } = process.env
module.exports = {
  mode: NODE_ENV,
  entry: {
    pageOne: path.resolve(__dirname, '../src/page1.js'),
    pageTwo: path.resolve(__dirname, '../src/page2.js'),
    pageThree: path.resolve(__dirname, '../src/page3.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: "umd",
    library: "someLibName",
    auxiliaryComment: "Test Comment3213213",
    chunkFilename: '[name].js',
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all', // 全部分割
      minSize: 30000, // 最小分割大小
      maxSize: 500000, // 最大分割大小
      minChunks: 1, // 最小公用块
      maxAsyncRequests: 5, // 最大异步请求
      maxInitialRequests: 3, // 最大initial请求
      automaticNameDelimiter: '.', // 连接符号
      name(module, chunks, cacheGroupKey) {
        console.log(module)
        return `${cacheGroupKey}`;
      },
      cacheGroups: {
        // 缓存组
        vendors: {
          // 默认组
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          // 默认组
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        utils: {
          minSize: 0, // 最小分割大小
          priority: 10, // 权重
          minChunks: 2, // 最小chunks数量
          reuseExistingChunk: true // 复用已存在的chunk，需要精准匹配对应模块才会生效
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html'
    })
  ]
}
