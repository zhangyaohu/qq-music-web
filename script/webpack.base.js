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
console.log(path.resolve(__dirname, 'src/views/images'));
const portfinder = require('portfinder')
portfinder.basePort = process.env.PORT && process.env.PORT || 7777;
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
module.exports = {
	entry: {
    main: resolve('./src/main.js')
	},
	output: {
    publicPath: publicPath,
		path: resolve('./dist'),
    filename: isEnvProduction
		? 'js/[name].[contenthash:8].js'
		: isEnvDevelopment && 'js/bundle.js',
    chunkFilename: isEnvProduction ? 'js/[name].js' : 'js/[name].js'
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
				test: /\.(less)$/g,
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
			{
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use:[
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              name: 'font/[name].[hash:8].[ext]',
            }
          }
				]
      },
		  {
				test: /\.(vue)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'vue-loader',
					}
				]
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					}
				]
			},
			{
        test: /\.(bmp|png|jpg|jpeg|ico|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							esModule: false,
              name: 'img/[name].[hash:8].[ext]',
              options: {
								name: '[name].[hash:8].[ext]',
              }
					  }
					},
				],
	  	}
		]
	},
	resolve: {
    alias: {
			'src': resolve('./src'),
			'~': path.resolve('./'+__dirname, 'src/views/images')
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
		new HtmlWebpackPlugin({
			title: 'qq-music-app',
			filename: 'index.html',
			template: 'public/index.html',
			inject: true,
			cdn,
      chunksSortMode: 'dependency',
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
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
	]
}
