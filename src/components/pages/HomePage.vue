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
import { onMounted, ref, watch, reactive } from 'vue'
import useFetchData from '../../hooks/useFetchData.js'
import BaseShowCard from '../UI/BaseShowCard.vue'
import BaseLoading from '../UI/BaseLoading.vue'
import BaseError from '../UI/BaseError.vue'
import { filterEpisodesByAirtime } from '../../functions/filterAndSortEpisodes.js'

export default {
  components: { BaseShowCard, BaseLoading, BaseError },
  setup() {
    const countrySelected = ref('US')
    const episodesAiringToday = ref(null)
    const isLoading = ref('false')
    const error = reactive({ display: false, message: 'An error has occurred' })

    async function getEpisodesForToday() {
      const today = new Date()
      isLoading.value = true
      const { status, data: allEpisodesToday, err } = await useFetchData(
        'shows-airing-today',
        {
          country: countrySelected.value,
          date: today.toISOString().slice(0, 10),
        }
      )
      isLoading.value = false
      if (status === 'OK') {
        episodesAiringToday.value = filterEpisodesByAirtime(allEpisodesToday)
        error.display = false
      } else {
        if (err) error.display = true
      }
    }

    watch(countrySelected, async () => {
      getEpisodesForToday()
    })

    onMounted(async () => {
      await getEpisodesForToday()
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
