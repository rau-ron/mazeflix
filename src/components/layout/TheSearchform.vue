<template>
  <form @submit.prevent>
    <div class="search-box">
      <input
        type="text"
        @input="handleInputFieldSearch"
        @keyup.enter="handleSubmit"
        v-model="queryInput"
      />
      <div class="search-button">
        <fa icon="search" @click="handleSubmit" class="search-icon" />
      </div>
    </div>
  </form>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const queryInput = ref('')
    const previousPage = ref('/')
    let timeoutRef = null

    function handleInputFieldSearch() {
      timeoutRef && clearTimeout(timeoutRef)
      if (!queryInput.value) {
        router.push(previousPage.value)
      } else {
        timeoutRef = setTimeout(() => {
          handleSearch()
        }, 400)
      }
    }

    function handleSearch() {
      if (route.name !== 'search-results') {
        previousPage.value = route.fullPath
      }
      store.dispatch('search/setSearch', queryInput.value)
      router.push({
        path: '/search-results',
        query: { q: queryInput.value },
      })
    }

    function handleSubmit() {
      timeoutRef && clearTimeout(timeoutRef)
      handleSearch()
    }

    return {
      queryInput,
      handleInputFieldSearch,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.search-box {
  width: 300px;
  margin: 38px auto;
  position: relative;
  height: 60px;
}

.search-box input {
  position: absolute;
  background-color: var(--clr-neutral-3);
  padding-left: 20px;
  border: 0;
  outline: none;
  color: var(--clr-neutral-2);
  width: 100%;
  height: 100%;
  font-size: 18px;
  padding-right: 70px;
  border-radius: 50px;
}

.search-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  background-color: var(--clr-neutral-3);
  z-index: 1;
  cursor: pointer;
  border-radius: 50%;
}

.search-button:hover {
  background-color: var(--clr-neutral-3);
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--clr-neutral-2);
  font-size: 20px;
}

@media screen and (max-width: 480px) {
  .search-box {
    width: 100%;
  }
}
</style>
