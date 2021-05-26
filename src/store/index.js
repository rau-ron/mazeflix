import { createStore } from 'vuex'
import favoritesModule from './modules/favorites.js'
import searchModule from './modules/search.js'

export default createStore({
  modules: {
    favorites: favoritesModule,
    search: searchModule,
  },
  state() {},
  mutations: {},
  actions: {},
  getters: {},
})
