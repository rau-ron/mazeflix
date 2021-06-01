import useFetchData from '../../hooks/useFetchData.js'
import {
  filterEpisodesByAirtime,
  filterFutureEpisodes,
  compareEpisodeDate,
} from '../../functions/filterAndSortEpisodes.js'
import { createShowObject } from '../../functions/createDataObject.js'

export default {
  namespaced: true,
  state() {
    return {
      upcomingEpisodes: [],
      todayEpisodes: [],
      show: null,
    }
  },

  mutations: {
    SET_UPCOMING_EPISODES(state, payload) {
      state.upcomingEpisodes = payload
    },
    CLEAR_UPCOMING_EPISODES(state) {
      state.upcomingEpisodes = []
    },
    SET_TODAY_EPISODES(state, payload) {
      state.todayEpisodes = payload
    },
    CLEAR_EPISODES_TODAY(state) {
      state.todayEpisodes = []
    },
    SET_SHOW(state, payload) {
      state.show = payload
    },
    CLEAR_SHOW(state) {
      state.show = null
    },
  },

  actions: {
    async fetchTodayEpisodes(context, payload) {
      context.dispatch(
        'setError',
        {
          display: false,
        },
        { root: true }
      )
      const today = new Date()
      context.dispatch('setLoadingState', true, { root: true })
      const { status, data: allEpisodesToday, err } = await useFetchData(
        'shows-airing-today',
        {
          country: payload,
          date: today.toISOString().slice(0, 10),
        }
      )
      if (status === 'OK') {
        context.commit(
          'SET_TODAY_EPISODES',
          filterEpisodesByAirtime(allEpisodesToday)
        )
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
    },

    async fetchUpcomingEpisodes(context, payload) {
      const favoriteShows = payload
      const futureEpisodes = []
      context.dispatch(
        'setError',
        {
          display: false,
        },
        { root: true }
      )
      if (favoriteShows.length) {
        context.dispatch('setLoadingState', true, { root: true })

        for (const show of favoriteShows) {
          const { status, data, err } = await useFetchData(
            'upcoming-episodes-by-id',
            {
              showId: show.id,
            }
          )

          if (status === 'OK') {
            const filteredEpisodes = filterFutureEpisodes(data)
            filteredEpisodes.forEach((episode) => futureEpisodes.push(episode))
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
        }
        context.commit(
          'SET_UPCOMING_EPISODES',
          futureEpisodes.sort((episodeA, episodeB) => {
            return compareEpisodeDate(episodeA, episodeB)
          })
        )
        context.dispatch('setLoadingState', false, { root: true })
      }
    },

    async fetchShow(context, payload) {
      context.dispatch(
        'setError',
        {
          display: false,
        },
        { root: true }
      )
      context.dispatch('setLoadingState', true, { root: true })
      const { status, data, err } = await useFetchData('show-by-id', {
        showId: payload,
      })
      if (status === 'OK') {
        context.commit('SET_SHOW', createShowObject('show-page', data))
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
    },
  },

  getters: {
    getTodayEpisodes(state) {
      return state.todayEpisodes
    },
    getUpcomingEpisodes(state) {
      return state.upcomingEpisodes
    },
    getShow(state) {
      return state.show
    },
  },
}
