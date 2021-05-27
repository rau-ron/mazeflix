import useFetchData from '../../hooks/useFetchData.js'
import { createShowsArrayForResults } from '../../functions/createDataObject.js'
export default {
  namespaced: true,
  state() {
    return {
      searchInput: '',
      showsResult: [],
    }
  },
  mutations: {
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
    async setSearch(context, payload) {
      context.commit('SET_SEARCH_INPUT', payload)
      if (context.state.searchInput) {
        context.dispatch('setLoadingState', true, { root: true })
        context.commit('CLEAR_SHOWS_RESULTS')
        const { status, data, err } = await useFetchData('shows-query', {
          inputText: context.state.searchInput,
        })
        if (status === 'OK') {
          context.commit('SET_SHOWS_RESULTS', createShowsArrayForResults(data))
        } else if (err) {
          context.dispatch(
            'setError',
            {
              display: true,
              message: 'An error has occurred',
            },
            { root: true }
          )
        }
        context.dispatch('setLoadingState', false, { root: true })
      }
    },
    setShowsResults(context, payload) {
      context.commit('SET_SHOWS_RESULTS', payload)
    },
  },

  getters: {
    getShowsResults(state) {
      return state.showsResult
    },
    getSearchInput(state) {
      return state.searchInput
    },
  },
}
