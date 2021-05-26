<template>
  <main>
    <h2 v-if="error.display">{{ error.message }}</h2>
    <header>
      <h1>Search</h1>
    </header>
    <section v-if="searchInput" class="sub-header">
      <h4>“{{ searchInput }}”</h4>
    </section>
    <base-loading v-if="isLoading" />
    <section v-else-if="noMatches" class="sub-header">
      <h3>No Results</h3>
    </section>
    <section v-else class="shows">
      <section class="shows-center">
        <base-show-card v-for="show in shows" :key="show.id" :show="show" />
      </section>
    </section>
  </main>
</template>
<script>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import BaseLoading from '../UI/BaseLoading.vue'
import BaseShowCard from '../UI/BaseShowCard.vue'
import useFetchData from '../../hooks/useFetchData.js'
import { createShowObject } from '../../functions/createDataObject.js'

export default {
  components: { BaseShowCard, BaseLoading },
  setup() {
    const store = useStore()
    const route = useRoute()

    const isLoading = computed(() => {
      return store.getters['search/getLoadingState']
    })

    const error = computed(() => {
      return store.getters['search/getSearchError']
    })

    const noMatches = computed(() => {
      return store.getters['search/getNoMatches']
    })

    const searchInput = computed(() => {
      return store.getters['search/getSearchInput']
    })

    const shows = computed(() => {
      return store.getters['search/getShowsResults']
    })

    watch(searchInput, async () => {
      await search(searchInput.value)
    })

    async function search(query) {
      if (query) {
        store.dispatch('search/setSearchLoading', true)
        store.dispatch('search/clearShowsResults')
        const { status, data, err } = await useFetchData('shows-query', {
          inputText: query,
        })
        if (status === 'OK') {
          store.dispatch('search/setShowsResults', createShowsArray(data))
        } else {
          err &&
            store.dispatch('search/setSearchError', {
              display: true,
              message: 'An error has occurred',
            })
        }
        store.dispatch('search/setSearchLoading', false)
      }
    }

    function createShowsArray(data) {
      const showsArray = []
      data.forEach((item) => {
        showsArray.push(createShowObject('show-card', item.show))
      })
      return showsArray
    }

    onMounted(async () => {
      if (route.query && route.query.q) {
        store.dispatch('search/setSearchInput', route.query.q)
        await search(route.query.q)
      }
    })

    return {
      isLoading,
      error,
      noMatches,
      shows,
      searchInput,
    }
  },
}
</script>

<style scoped>
.shows-center {
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  justify-content: center;
  justify-items: center;
}
</style>
