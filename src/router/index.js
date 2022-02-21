import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function createRouter() {
  const router = new VueRouter({
		mode: 'history',
		routes: [
			{ path: '/', component: () => import('../components/Foo.vue') },
			{ path: '/bar', component: () => import('../components/Bar.vue') },
		],
	})
	return router
}
