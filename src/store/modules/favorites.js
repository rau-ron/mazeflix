export default {
  namespaced: true,
  state() {
    return {
      favoriteShows: [],
    }
  },
  mutations: {
    ADD_TO_FAVORITES(state, payload) {
      const newShow = payload
      const isSaved = state.favoriteShows.some((show) => {
        return show.id === newShow.id
      })
      if (!isSaved) {
        state.favoriteShows.push(newShow)
        localStorage.favoriteShows = JSON.stringify(state.favoriteShows)
      }
    },

    REMOVE_FROM_FAVORITES(state, payload) {
      const showId = payload
      const index = state.favoriteShows.findIndex((show) => show.id === showId)
      if (index >= 0) {
        state.favoriteShows.splice(index, 1)
        localStorage.favoriteShows = JSON.stringify(state.favoriteShows)
      }
    },

    LOAD_LOCAL_STORAGE(state) {
      if (localStorage.favoriteShows) {
        state.favoriteShows = JSON.parse(localStorage.favoriteShows)
      }
    },
  },

  actions: {
    addToFavorites(context, payload) {
      const newShow = {
        id: payload.id,
        title: payload.title,
        genres: payload.genres,
        image: payload.image,
      }
      context.commit('ADD_TO_FAVORITES', newShow)
    },

    removeFromFavorites(context, payload) {
      const showId = payload
      context.commit('REMOVE_FROM_FAVORITES', showId)
    },
    loadFavoritesFromLocalStorage(context) {
      context.commit('LOAD_LOCAL_STORAGE')
    },
  },

  getters: {
    getFavoriteShows(state) {
      return state.favoriteShows
    },

    getIsFavorite(state) {
      return function(showId) {
        if (state.favoriteShows.length > 0) {
          return state.favoriteShows.some((show) => {
            return show.id === showId
          })
        } else {
          return false
        }
      }
    },
  },
}
