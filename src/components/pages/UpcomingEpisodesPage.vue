<template>
  <div>
    <base-error v-if="error.display" :error="error" />
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
          v-for="episode in upcomingEpisodes"
          :key="episode.id"
          :episode="episode"
        ></base-episode-card>
      </section>
    </main>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import BaseLoading from '../UI/BaseLoading.vue'
import BaseEpisodeCard from '../UI/BaseEpisodeCard.vue'
import BaseError from '../UI/BaseError.vue'

export default {
  components: { BaseLoading, BaseEpisodeCard, BaseError },
  setup() {
    const store = useStore()
    const favoriteShows = ref(null)

    const isLoading = computed(() => {
      return store.getters['getLoadingState']
    })

    const error = computed(() => {
      return store.getters['getError']
    })

    const upcomingEpisodes = computed(() => {
      return store.getters['shows/getUpcomingEpisodes']
    })

    const noEpisodes = computed(() => {
      return !upcomingEpisodes.value || !upcomingEpisodes.value.length
    })

    onMounted(() => {
      if (localStorage.favoriteShows) {
        store.dispatch('favorites/loadFavoritesFromLocalStorage')
      }
      favoriteShows.value = store.getters['favorites/getFavoriteShows']
      store.dispatch('shows/fetchUpcomingEpisodes', favoriteShows.value)
    })

    return { upcomingEpisodes, error, isLoading, noEpisodes }
  },
}
</script>
