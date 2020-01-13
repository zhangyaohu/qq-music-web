const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
//合并base，dev配置
module.exports = webpackMerge(webpackBase, {
  mode: 'development',//打包模式指定开发环境
  devtool: 'eval-source-map',//打包的devtool是否是源码
  devServer: {//webpack-dev-server配置
    port: process.env.PORT ? process.env.PORT : 7777,//端口
    host: '0.0.0.0',//主机
    open: `http://localhost:${process.env.PORT ? process.env.PORT : 7777}`,//浏览器打开的路径
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
    proxy: {//请求代理设置
      '/api': {//代理请求前缀
        target: 'http://localhost:3000',//代理服务端路径
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}//请求到服务端后是否重写路径
      }
    },
    inline: true,//
    compress: false,//是否压缩代码
    disableHostCheck: true,//是否开启热模块更新
    historyApiFallback: true,//是否处理找不到index.html时的404情况
  },
  plugins: [
    //热模块更新插件
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
  
    ]),
    //定义生产环境参数插件
    new webpack.DefinePlugin({ 
      'QQ_THEME': JSON.stringify(process.env.QQ_THEME || 'dark'),
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
  ]
})
