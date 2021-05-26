<template>
  <div v-if="error.display">{{ error.message }}</div>
  <main v-else>
    <header>
      <h1>Upcoming Episodes</h1>
    </header>
    <base-loading v-if="isLoading" />
    <section v-else-if="noEpisodes" class="sub-header">
      <h3>No upcoming episodes</h3>
    </section>
    <section v-else>
      <base-episode-card
        v-for="episode in futureEpisodes"
        :key="episode.id"
        :episode="episode"
      ></base-episode-card>
    </section>
  </main>
</template>

<script>
import { onMounted, ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import BaseLoading from '../UI/BaseLoading.vue'
import BaseEpisodeCard from '../UI/BaseEpisodeCard.vue'
import useFetchData from '../../hooks/useFetchData.js'
import {
  filterFutureEpisodes,
  compareEpisodeDate,
} from '../../functions/filterAndSortEpisodes.js'

export default {
  components: { BaseLoading, BaseEpisodeCard },
  setup() {
    const store = useStore()
    const futureEpisodes = ref(null)
    const isLoading = ref(false)
    const error = reactive({ display: false, message: 'An error has occurred' })
    const noEpisodes = computed(() => {
      return !futureEpisodes.value || !futureEpisodes.value.length
    })

    onMounted(async () => {
      if (localStorage.favoriteShows) {
        store.dispatch('favorites/loadFavoritesFromLocalStorage')
      }

      const favoriteShows = store.getters['favorites/getFavoriteShows']
      futureEpisodes.value = []

      if (favoriteShows.length) {
        isLoading.value = true

        for (const show of favoriteShows) {
          const {
            status,
            data,
            err,
          } = await useFetchData('upcoming-episodes-by-id', { showId: show.id })

          if (status === 'OK') {
            const filteredEpisodes = filterFutureEpisodes(data)
            filteredEpisodes.forEach((episode) =>
              futureEpisodes.value.push(episode)
            )
            error.display = false
          } else if (err) {
            error.display = true
          }
        }

        futureEpisodes.value.sort((episodeA, episodeB) => {
          return compareEpisodeDate(episodeA, episodeB)
        })

        isLoading.value = false
      }
    })

    return { futureEpisodes, error, isLoading, noEpisodes }
  },
}
</script>
