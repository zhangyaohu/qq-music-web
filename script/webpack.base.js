const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const resolve = (filePath) => {
  return path.resolve(__dirname,'../' , filePath);
}
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
//外部引入cdn三方库
const cdn = [
  "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
  "https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js",
  "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
  "https://cdn.bootcss.com/element-ui/2.4.11/index.js",
  "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
  "https://cdn.bootcss.com/vue-i18n/5.0.3/vue-i18n.min.js",
  "https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js"
]
const portfinder = require('portfinder');
//devserver端口
portfinder.port = process.env.PORT && process.env.PORT || 7777;
//webpack打包时的node_modules的路径
const publicPath = isEnvProduction
  ? '/'
  : isEnvDevelopment && '/';

portfinder.getPort((err, port) => {
  if (err) {
    reject(err)
  } else {
      // 在进程中存储下当前最新端口
      process.env.PORT = port;
      // 把 module.exports 中逻辑放在里面来

  }
})

		//分离css文件的插件
module.exports = {
	entry: {
		main: resolve('./src/main.js'),//入口文
	},
	output: {
    publicPath: publicPath,//打包后生成的路径中的公共路径
		path: resolve('./dist'),//打包之后生成的存储文件的文件夹
    filename: isEnvProduction
		? 'js/[name].[contenthash:8].js'
		: isEnvDevelopment && 'js/bundle.[name].js',//生成的文件名称
    chunkFilename: isEnvProduction ? 'js/chunk-[chunkhash].js' : 'js/[name].js'//生成的模块文件名称用于异步加载对应的chunk
	},
  module: {
		rules:[
			//打包.css文件
			{
				test: /\.(css)$/,//正则表达式盘匹配css层级样式文件
				use: [
					isEnvProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',//生产环境使用MiniCssExtractPlugin.loader分离css代码 
         {
            loader: 'css-loader'
					}
				]
			},
			//打包.less文件
			{
				test: /\.(less)$/,
				exclude: /node_modules/,
				use: [
					isEnvProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
					{
						loader: 'css-loader',
					},
					{
            loader: 'less-loader',
					}
				]
			},
			//匹配打包字体文件
			{
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use:[
          {
            loader: 'url-loader',
            options: {
							limit: 1000,
							name: 'font/[name].[hash:8].[ext]',
            }
					}
				]
			},
			//匹配打包vue文件
		  {
				test: /\.(vue)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'vue-loader'
					}
				]
			},
			//匹配打包vue文件
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			//匹配打包vue文件图片
			{
        test: /\.(bmp|png|jpg|jpeg|ico|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							  esModule: false,
							  limit: 1000,
								name: 'img/[name].[hash:8].[ext]',
					  }
					}
				],
	  	}
		]
	},
	resolve: {
		//别名简化引入路径
    alias: {
			'src': resolve('./src'),
			'images': resolve('./src/views/images')
		},
		//可省略的扩展名
		extensions: ['.js', '.vue', '.less'],
	},
	//外部引入三方库的引用名称
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
		//打包vue时的插件
		new VueLoaderPlugin(),
		//打包html的插件
		new HtmlWebpackPlugin({
			title: 'qq-music-app',//标题名称
			filename: 'index.html',//文件名称
			template: 'public/index.html',//模板路径
			inject: true,//将打包过后的js注入到index.html的后面
			cdn,
			chunksSortMode: 'dependency',
			chunks: ['main'],
			minify: isEnvProduction ?  {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          } : undefined,
		}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].css',//插件名
      chunkFilename: 'css/chunk-[chunkhash][name].css',//插件名
			ignoreOrder: false, // Enable to remove warnings about conflicting order
	}),
		//分离lodash库
		new LodashWebpackPlugin()
	]
}
