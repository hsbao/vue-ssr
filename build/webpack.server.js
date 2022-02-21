const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlguin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const base = require('./webpack.base.js')

module.exports = merge(base, {
	mode: 'development',
	entry: {
		server: path.resolve(__dirname, '../src/server-entry.js'),
	},
	target: 'node', // 打包的目标是给node来使用的
	output: {
		libraryTarget: 'commonjs2',
	},
	plugins: [
		new HtmlWebpackPlguin({
			filename: 'index.ssr.html',
			template: path.resolve(__dirname, '../public/index.ssr.html'),
			minify: false,
			excludeChunks: ['server'], // 排除掉自动引用服务端打包的包
		}),
		new VueSSRServerPlugin(),
	],
})
