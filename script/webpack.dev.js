const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: process.env.PORT,
    host: '0.0.0.0',
    open: `http://localhost:${process.env.PORT}`,
    stats: {
      hash: false,
      builtAt: false,
      version: false,
      modules: false,
      children: false, ////解决类似Entrypoint undefined = index.html和Entrypoint mini-css-extract-plugin = *的警告
      entrypoints: false,
      colors: {
        green: '\u001b[32m',
        yellow: '\u001b[32m',
      }
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      }
    },
    inline: true,
    compress: false,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ]
})
