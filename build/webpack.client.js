const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
  entry: './src/client-entry.js',
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
    }
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: './templates/index.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'index.csr.html',
      template: './templates/index.html'
    })
  ]
});