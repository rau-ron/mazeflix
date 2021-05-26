<template>
  <main>
    <header>
      <h1>Favorites</h1>
    </header>
    <section v-if="noFavorites" class="sub-header">
      <h3>No Saved Shows</h3>
    </section>
    <section v-else class="shows">
      <section class="shows-center">
        <base-show-card
          v-for="show in favoriteShows"
          :key="show.id"
          :show="show"
        />
      </section>
    </section>
  </main>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import BaseShowCard from '../UI/BaseShowCard.vue'

export default {
  components: { BaseShowCard },
  setup() {
    const store = useStore()

    const favoriteShows = computed(() => {
      return store.getters['favorites/getFavoriteShows']
    })

    const noFavorites = computed(() => {
      return (
        !favoriteShows.value ||
        (favoriteShows.value && favoriteShows.value.length === 0)
      )
    })

    onMounted(() => {
      localStorage.favoriteShows &&
        store.dispatch('favorites/loadFavoritesFromLocalStorage')
    })
    return { noFavorites, favoriteShows }
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
