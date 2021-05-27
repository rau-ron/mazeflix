<template>
  <article class="episode">
    <header class="episode-header">
      <h3>
        {{ episode.airdate }} {{ episode.airdate && episode.airtime && '•' }}
        {{ episode.airtime }}
      </h3>
    </header>
    <section class="episode-info">
      <router-link :to="`/shows/${episode.showId}`"
        ><h3>{{ episode.showName }}</h3></router-link
      >
      <h4 class="episode-title">“{{ episode.title }}”</h4>
      <h4>Season {{ episode.season }}, Episode {{ episode.number }}</h4>
    </section>
  </article>
</template>

<script>
export default {
  props: ['episode'],
  setup() {},
}
</script>

<style scoped>
.episode {
  margin: 3rem auto;
  width: 90vw;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
}
.episode-header {
  color: var(--clr-white);
  background: var(--clr-accent-1);
  border-radius: 12px 12px 0 0;
  padding: 0.5rem;
  margin: 0;
}
.episode-header > h3 {
  margin: 0;
}

.episode-info {
  padding: 1rem;
}

.episode-title {
  margin: 1rem 0;
  font-style: italic;
  font-weight: normal;
}
</style>
