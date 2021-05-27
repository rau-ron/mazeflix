import { createStore } from 'vuex'
import favoritesModule from './modules/favorites.js'
import searchModule from './modules/search.js'
import shows from './modules/shows.js'

export default createStore({
  modules: {
    favorites: favoritesModule,
    search: searchModule,
    shows: shows,
  },
  state() {
    return {
      isLoading: false,
      error: {
        display: false,
        message: '',
      },
    }
  },
  mutations: {
    SET_LOADING_STATE(state, payload) {
      state.isLoading = payload
    },
    SET_ERROR(state, payload) {
      state.error.display = payload.dislay
      state.error.message = payload.message
    },
  },
  actions: {
    setLoadingState(context, payload) {
      context.commit('SET_LOADING_STATE', payload)
    },
    setError(context, payload) {
      context.commit('SET_ERROR', payload)
    },
  },
  getters: {
    getLoadingState(state) {
      return state.isLoading
    },
    getError(state) {
      return state.error
    },
  },
})
