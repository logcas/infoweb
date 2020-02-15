const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: './src/csr-entry.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'csr'),
    publicPath: ''
  },
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index_csr.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ]
});