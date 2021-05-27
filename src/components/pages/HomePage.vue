<template>
  <div>
    <base-error v-if="error.display" :error="error" />
    <main v-else>
      <header>
        <h1>Airing Today</h1>
        <section class="sub-header">
          <label for="countrySelector">Country: </label>
          <select
            name="countreySelector"
            id="countrySelector"
            v-model="countrySelected"
          >
            <option value="US">US</option>
            <option value="GB">UK</option>
          </select>
        </section>
      </header>

      <base-loading v-if="isLoading" />
      <section
        v-else-if="episodesAiringToday && !episodesAiringToday.length"
        class="sub-header"
      >
        <h3>No shows found</h3>
      </section>
      <section v-else class="episodes">
        <base-show-card
          v-for="episode in episodesAiringToday"
          :key="episode.id"
          :show="episode.show"
        >
          <section class="episode-info">
            <span class="episode-info-title">
              <h4>{{ episode.show.title }}</h4>
            </span>
            <p>
              S{{ episode.season }}E{{ episode.number }} –
              {{ episode.airtime }}
            </p>
            <p>{{ episode.show.network }}</p>
          </section>
        </base-show-card>
      </section>
    </main>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import BaseShowCard from '../UI/BaseShowCard.vue'
import BaseLoading from '../UI/BaseLoading.vue'
import BaseError from '../UI/BaseError.vue'

export default {
  components: { BaseShowCard, BaseLoading, BaseError },
  setup() {
    const store = useStore()
    const countrySelected = ref('US')

    const isLoading = computed(() => {
      return store.getters['getLoadingState']
    })

    const error = computed(() => {
      return store.getters['getError']
    })

    const episodesAiringToday = computed(() => {
      return store.getters['shows/getTodayEpisodes']
    })

    watch(countrySelected, async () => {
      store.dispatch('shows/fetchTodayEpisodes', countrySelected.value)
    })

    onMounted(() => {
      store.dispatch('shows/fetchTodayEpisodes', countrySelected.value)
    })

    return { episodesAiringToday, countrySelected, isLoading, error }
  },
}
</script>

<style scoped>
.episodes {
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  justify-content: center;
  justify-items: center;
}
.episode-info {
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.episode-info-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
</style>
