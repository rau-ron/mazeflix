<template>
  <div>
    <base-error v-if="error.display" :error="error" />
    <main v-else>
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
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import BaseLoading from '../UI/BaseLoading.vue'
import BaseShowCard from '../UI/BaseShowCard.vue'
import BaseError from '../UI/BaseError.vue'

export default {
  components: { BaseShowCard, BaseLoading, BaseError },
  setup() {
    const store = useStore()
    const route = useRoute()

    const isLoading = computed(() => {
      return store.getters['getLoadingState']
    })
    const error = computed(() => {
      return store.getters['getError']
    })
    const searchInput = computed(() => {
      return store.getters['search/getSearchInput']
    })
    const shows = computed(() => {
      return store.getters['search/getShowsResults']
    })
    const noMatches = computed(() => {
      return shows.value && shows.value.length === 0
    })

    onMounted(() => {
      if (route.query && route.query.q) {
        store.dispatch('search/setSearch', route.query.q)
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
