const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const resolve = (filePath) => {
  return path.resolve(__dirname,'../' , filePath);
}
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const cdn = [
  "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
  "https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js",
  "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
  "https://cdn.bootcss.com/element-ui/2.4.11/index.js",
  "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
  "https://cdn.bootcss.com/vue-i18n/5.0.3/vue-i18n.min.js",
  "https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js"
]

const portfinder = require('portfinder')
portfinder.basePort = process.env.PORT && process.env.PORT || 7777;

portfinder.getPort((err, port) => {
  if (err) {
    reject(err)
  } else {
      // 在进程中存储下当前最新端口 
      process.env.PORT = port;
      // 把 module.exports 中逻辑放在里面来
      
  }
})
console.log(resolve('./public'))
module.exports = {
	entry: {
    main: resolve('./src/main.js')
	},
	output: {
		path: resolve('./public'),
    filename: isEnvProduction
		? 'static/js/[name].[contenthash:8].js'
		: isEnvDevelopment && 'static/js/bundle.js',
	},
  module: {
		rules:[
			{
				test: /\.(css)$/,
				use: [
					isEnvProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
         {
            loader: 'css-loader'
					}
				]
			},
			{
				test: /\.(less)$/,
				exclude: /node_modules/,
				use: [
					isEnvProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
					{
						loader: 'css-loader'
					},
					{
            loader: 'less-loader',
					}
				]
			},
			{
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
		  {
				test: /\.(vue)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'vue-loader'
					}
				]
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						loader: 'url-loader',
						options: {
							esModule: false, 
							name: "images/[name]-[hash:8].[ext]",
							outputPath: '/images/',
							pulicPath: './'
					  }
					},
				],
	  	}
		]
	},
	resolve: {
    alias: {
			'src': resolve('./src'),
			'assets': resolve('./src/views/images')
		},
		extensions: ['.js', '.vue', '.less'],
	},
	externals: {
		'vuex': 'Vuex',
		'vue-router': 'VueRouter',
		'vue-i18n': 'VueI18n',
		'echarts': 'echarts',
		"Vue": 'Vue',
		"element-ui": 'element',
		"axios": 'axios'
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
		new HtmlWebpackPlugin({
			title: 'qq-music-app',
			filename: 'index.html',
			template: 'public/index.html',
			inject: true,
			cdn
		}),
	 new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
	],
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
}