import createApp from './app'

/**
 * 服务端渲染打包需要返回一个函数
 * 这个函数会在访问服务器时被调用，是在服务端执行的
 * @param {*} context 调用renderToString时会传入信息，最终渲染实例  ---> res/req
 */
export default function (context) {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp() // 服务端需要拿到一个vue的实例，而且每个用户都是全新的

		router.push(context.url) // localhost:8080/bar是一个异步的路由，异步加载Bar组件

		// 等待路由加载完毕 再去通过实例来渲染
		router.onReady(() => {
			// 前端如果没有配置对应的路由 那应该返回的是404页面
			// 跳转完毕后获取匹配到的组件个数
			const matchComponents = router.getMatchedComponents()
			if (!matchComponents.length) {
				return reject({ code: 404 })
			}

			// 匹配到路由了
			Promise.all(
				matchComponents.map((component) => {
					console.log(component.asyncData)
					if (component.asyncData) {
						return component.asyncData(store)
					}
				})
			).then(() => {
				// 将状态放到上下文的状态中 此时就会将这个状态放到window.__INITIAL_STATE__
				context.state = store.state
				// 此方法可以返回一个promise，返回最终的实例
				resolve(app)
			})
		}, reject)
	})
}
