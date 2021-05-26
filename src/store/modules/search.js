export default {
  namespaced: true,
  state() {
    return {
      searchInput: '',
      isSearchLoading: false,
      searchError: {
        display: false,
        message: '',
      },
      showsResult: [],
    }
  },
  mutations: {
    SET_SEARCH_LOADING(state, payload) {
      state.isSearchLoading = payload
    },
    SET_SEARCH_ERROR(state, payload) {
      state.searchError.display = payload.dislay
      state.searchError.message = payload.message
    },
    SET_SHOWS_RESULTS(state, payload) {
      state.showsResult = payload
    },
    CLEAR_SHOWS_RESULTS(state) {
      state.showsResult = []
    },
    SET_SEARCH_INPUT(state, payload) {
      state.searchInput = payload
    },
  },

  actions: {
    setSearchLoading(context, payload) {
      context.commit('SET_SEARCH_LOADING', payload)
    },
    setSearchError(context, payload) {
      context.commit('SET_SEARCH_ERROR', payload)
    },
    setShowsResults(context, payload) {
      context.commit('SET_SHOWS_RESULTS', payload)
    },
    clearShowsResults(context) {
      context.commit('CLEAR_SHOWS_RESULTS')
    },
    setSearchInput(context, payload) {
      context.commit('SET_SEARCH_INPUT', payload)
    },
  },

  getters: {
    getLoadingState(state) {
      return state.isSearchLoading
    },
    getSearchError(state) {
      return state.searchError
    },
    getShowsResults(state) {
      return state.showsResult
    },
    getNoMatches(state) {
      return state.showsResult.length === 0
    },
    getSearchInput(state) {
      return state.searchInput
    },
  },
}
