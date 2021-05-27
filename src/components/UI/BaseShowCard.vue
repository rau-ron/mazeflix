<template>
  <article class="show-card">
    <router-link :to="`/shows/${show.id}`">
      <div
        class="show-card-image"
        :style="`background-image: url('${show.image.original}')`"
      />
    </router-link>
    <section class="show-info">
      <slot>
        <div class="show-info-grid">
          <span class="show-title"
            ><h4>{{ show.title }}</h4></span
          >
          <span v-if="genres" class="show-genres"
            ><p>{{ genres }}</p></span
          >
          <base-toggle
            :withLabel="false"
            :isFavorite="isFavorite"
            @toggle="toggleFavorite"
            class="toggle"
          />
        </div>
      </slot>
    </section>
  </article>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import BaseToggle from './BaseToggle.vue'

export default {
  props: ['show'],

  components: { BaseToggle },

  setup(props) {
    const show = ref(props.show)
    const store = useStore()

    const genres = computed(() => {
      return show.value.genres && show.value.genres.length
        ? show.value.genres[0]
        : ''
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

    return { genres, isFavorite, toggleFavorite }
  },
}
</script>

<style scoped>
.show-card {
  width: 100%;
  padding-top: 140.47%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  position: relative;
  transition: var(--transition-fast);
}
.show-card-image {
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

.show-info {
  color: var(--clr-white);
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(33, 33, 33, 0.9);
  transform: translateY(100%);
  transition: var(--transition);
}

.show-info-grid {
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1.5fr 0.8fr;
  justify-content: center;
  align-items: center;
  row-gap: 0.5rem;
}
.show-title {
  width: 100%;
  grid-column: span 2;
  justify-self: start;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.show-title h4 {
  margin-bottom: 0;
}

.show-genres {
  align-self: end;
}

.show-genres > p {
  display: inline-block;
  border: 1px solid var(--clr-white);
  border-radius: 12px;
  font-size: 0.75rem;
  line-height: 1;
  padding: 0.15rem 0.5rem 0.25rem;
}

.toggle {
  grid-column: 2;
  grid-row: 2;
  font-size: 1.3rem;
  justify-self: right;
  align-self: end;
}

.show-card:hover .show-info {
  transform: translateY(0);
}

.show-card:hover {
  transform: scale(1.02);
}

@media screen and (max-width: 479px) {
  .show-card .show-info {
    transform: translateY(0);
  }
  .show-info {
    height: 25%;
  }
}
</style>
