import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

export default function createApp() {
	let router = createRouter()
	let store = createStore()
	let app = new Vue({
		store,
		router,
		render: (h) => h(App),
	})
	return { app, router, store }
}
