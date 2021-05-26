<template>
  <fa
    class="favorite-toggle"
    @click="handleToggle"
    :icon="isFavorite ? ['fas', 'star'] : ['far', 'star']"
  />
</template>

<script>
export default {
  props: ['isFavorite'],
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
.favorite-toggle {
  cursor: pointer;
}
</style>
