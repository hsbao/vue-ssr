import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore() {
	let store = new Vuex.Store({
		state: {
			name: 'hongshibao',
			age: 26,
		},
		mutations: {
			changeName(state) {
				state.name = 'hhhhh'
			},
			changeAge(state) {
				state.age = 27
			},
		},
		actions: {
			changeAll({ commit }) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						commit('changeName')
						commit('changeAge')
						resolve()
					}, 3000)
				})
			},
		},
	})

  // 服务端渲染处理好数据后，会增加一个__INITIAL_STATE__保存最新的值
	if (typeof window != 'undefined' && window.__INITIAL_STATE__) {
		store.replaceState(window.__INITIAL_STATE__)
	}
	return store
}
