const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ?
    false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(gif|jpe?g|png|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '..', 'public'),
      '@': path.resolve(__dirname, '..', 'src')
    },
    extensions: ['.vue', '.wasm', '.mjs', '.js', '.json']
  }
}