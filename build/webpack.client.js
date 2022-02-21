const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlguin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const base = require('./webpack.base.js')

module.exports = merge(base, {
	mode: 'development',
	entry: {
		client: path.resolve(__dirname, '../src/client-entry.js'),
	},
	plugins: [
		new HtmlWebpackPlguin({
			template: path.resolve(__dirname, '../public/index.client.html'),
			filename: 'index.client.html',
			minify: false,
		}),
		new VueSSRClientPlugin(),
	],
})
