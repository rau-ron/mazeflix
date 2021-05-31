o<template>
  <div>
    <base-loading v-if="!show" />
    <base-error v-else-if="error.display" :error="error" />

    <main v-else>
      <section class="show">
        <section class="show-info">
          <h1 class="show-title">{{ show.title }}</h1>
          <div class="show-image-container">
            <div
              class="feature-image"
              :style="`background-image: url('${show.image.original}')`"
            />
          </div>

          <base-toggle
            :withLabel="true"
            class="favorite-span"
            :isFavorite="isFavorite"
            @toggle="toggleFavorite"
          />

          <span class="genres-language">
            <h4>Language: {{ show.language }}</h4>
            <span v-if="show.network">
              <h4>Premiered on: {{ show.premiered }}</h4>
              <h4>{{ show.network.name }} {{ show.network.country.name }}</h4>
              <h4>Status: {{ show.status }}</h4>
            </span>
            <h4>Genres: {{ genres }}</h4>
          </span>
          <summary v-html="show.summary"> </summary>
        </section>
      </section>
      <section v-if="show.seasons.length" class="seasons">
        <span class="list-header"
          ><h3>{{ show.seasons.length }} Seasons</h3></span
        >
        <ul class="seasons-list">
          <li v-for="season in show.seasons" :key="season.id" class="season">
            <div
              class="feature-image"
              :style="
                `background-image: url('${(season.image &&
                  season.image.medium) ||
                  require('../../assets/default-poster.png')}')`
              "
            />
            <h4 v-if="season.number">Season {{ season.number }}</h4>
            <p v-if="season.episodeOrder">{{ season.episodeOrder }} Episodes</p>
            <p>Premiered on: {{ season.premiereDate }}</p>
          </li>
        </ul>
      </section>
      <section v-if="show.cast.length" class="cast">
        <span class="list-header"><h3>Cast Members</h3></span>
        <ul class="cast-list">
m          ="member"
          ><li
            v-for="member in show.cast"
            :key="member.person.id"
            class
            <div
              class="feature-image"
              :style="
                `background-image: url('${(member.person.image &&
                  member.person.image.medium) ||
                  require('../../assets/default-profile.png')}')`
              "
            />
            <h4>{{ member.person.name }}</h4>
            <p>as {{ member.character.name }}</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onBeforeMount, computed, ref } from 'vue'
import { useStore } from 'vuex'

import BaseLoading from '../UI/BaseLoading.vue'
import BaseToggle from '../UI/BaseToggle.vue'
import BaseError from '../UI/BaseError.vue'

export default {
  components: { BaseToggle, BaseLoading, BaseError },
  setup() {
    const route = useRoute()
    const store = useStore()
    const favoriteToggle = ref(null)

    const isLoading = computed(() => {
      return store.getters['getLoadingState']
    })

    const error = computed(() => {
      return store.getters['getError']
    })

    const show = computed(() => {
      return store.getters['shows/getShow']
    })

    const genres = computed(() => {
      return show.value.genres && show.value.genres.length
        ? show.value.genres.join(', ')
        : 'N/A'
    })

    const isFavorite = computed(() => {
      return store.getters['favorites/getIsFavorite'](show.value.id)
    })

    function toggleFavorite() {
      if (isFavorite.value) {
        store.dispatch('favorites/removeFromFavorites', show.value.id)
      } else {
        store.dispatch('favorites/addToFavorites', show.value)
      }
    }

    function handleFavoriteToggle() {
      favoriteToggle.value.target.click()
    }

    onBeforeMount(() => {
      store.dispatch('shows/fetchShow', route.params.showId)
    })

    return {
      isLoading,
      error,
      show,
      genres,
      isFavorite,
      toggleFavorite,
      handleFavoriteToggle,
      favoriteToggle,
    }
  },
}
</script>

<style scoped>
main {
  width: 100vw;
}
.show {
  width: 90vw;
  max-width: var(--max-width);
}
.seasons,
.cast,
.show {
  margin: 3rem auto;
}

.seasons-list,
.cast-list {
  width: 100vw;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  justify-content: flex-start;
}

.season,
.member {
  text-align: center;
  padding: 0 1rem 0 0;
}

.season:first-child,
.member:first-child {
  margin-left: 5vw;
}

.list-header {
  display: block;
  margin-left: 5vw;
}

.feature-image {
  width: 210px;
  height: 295px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 1rem;
}

.show-info {
  text-align: center;
}

.member .feature-image {
  height: 210px;
  border-radius: 50%;
}

.show-image-container {
  width: 100%;
  padding-top: 140.47%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  position: relative;
  transition: var(--transition-fast);
}

.show-image-container .feature-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.favorite-span {
  height: 100%;
  width: 100%;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 2rem;
}

.show-info {
  width: 90vw;
  max-width: var(--max-width);
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 1rem;
}

@media screen and (min-width: 821px) {
  .show-info {
    grid-template-columns: 1.4fr 2fr;
    grid-template-rows: 1.5fr repeat(autofill, auto);
    column-gap: 4rem;
  }

  .show-info summary {
    height: 100%;
    align-self: top;
  }

  .show-title {
    grid-column: 1 / span 2;
    margin-bottom: 3rem;
  }

  .show-image-container {
    height: 100%;
    align-self: top;
    grid-row: 2 / span 2;
  }

  .favorite-span {
    grid-column: 1;
    grid-row: 4;
  }

  .seasons-list,
  .cast-list,
  .list-header {
    width: 100vw;
    padding-left: 5vw;
    max-width: var(--max-width);
  }

  .season:first-child,
  .member:first-child {
    margin-left: 0;
  }

  .list-header {
    margin: 0 auto;
  }
}

@media screen and (min-width: 1170px) {
  .seasons-list,
  .cast-list,
  .list-header {
    width: 90vw;
    padding-left: 0;
  }
}
</style>
