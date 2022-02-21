const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const Koa = require('koa')
const fs = require('fs')
const Router = require('@koa/router')
let app = new Koa() // 创建一个服务实例
let router = new Router() // 创建路由实例

const template = fs.readFileSync('./dist/index.ssr.html', 'utf8')

// webpack使用VueSSRServerPlugin打包后的文件，这个manifest存着client-entry端打包的信息
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')

const static = require('koa-static')
const path = require('path')
let render = VueServerRenderer.createBundleRenderer(serverBundle, {
	template,
	clientManifest, // 会动态把client-entry打包的资源注入index.ssr.html
})

//  如果访问不到就跳转到首页,加载首页时会重新调用前端路由 （客户端渲染）
// history api 404问题的解决
router.get('*', async (ctx) => {
	try {
		ctx.body = await new Promise((resolve, reject) => {
			render.renderToString({ url: ctx.url }, (err, html) => {
				if (err) {
					console.log(err)
				}
				if (err && err.code == 404) {
					resolve('Page Not Found')
				}
				resolve(html)
			})
		})
	} catch (e) {
		console.log(e)
	}
})
// 静态服务中间件
app.use(static(path.resolve(__dirname, 'dist')))
app.use(router.routes())
app.listen(8001)
