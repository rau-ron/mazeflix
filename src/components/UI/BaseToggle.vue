<template>
  <div>
    <fa
      class="favorite-toggle"
      @click="handleToggle"
      :icon="isFavorite ? ['fas', 'star'] : ['far', 'star']"
    />
    <span v-if="withLabel" @click="handleToggle" class="favorite-toggle-label">
      {{ `${isFavorite ? 'Remove from' : 'Add to'} favorites` }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['isFavorite', 'withLabel'],
  emits: ['toggle'],
  setup(props, context) {
    function handleToggle() {
      context.emit('toggle')
    }

    return { handleToggle }
  },
}
</script>

<style scoped>
.favorite-toggle,
.favorite-toggle-label {
  cursor: pointer;
}

.favorite-toggle-label {
  font-size: 1rem;
  margin-left: 0.2rem;
}
@media screen and (min-width: 820px) {
  .favorite-toggle-label {
    margin-left: 0;
  }
}
</style>
