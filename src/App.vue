<template>
  <the-navbar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar.vue'

export default {
  components: { TheNavbar },
}
</script>

<style>
/* Variables */
:root {
  --clr-white: #fff;
  --clr-grey-1: hsl(209, 61%, 16%);
  --clr-grey-3: hsl(209, 34%, 30%);
  --clr-grey-8: hsl(210, 31%, 80%);
  --clr-grey-10: hsl(210, 36%, 96%);
  --clr-primary-7: hsl(22, 31%, 67%);

  --clr-neutral-1: #414141;
  --clr-neutral-2: #a9a9a9;
  --clr-neutral-3: #eaeaea;
  --clr-accent-1: #f76c6c;

  --spacing: 0.1rem;
  --max-width: 1170px;
  --transition: all 0.3s linear;
  --transition-fast: all 0.1s linear;
  --transition-opacity: opacity 0.125s linear;
}

/* Gobal style */
*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: #efefef;
  color: var(--clr-grey-1);
  font-size: 0.875rem;
  padding: 6rem 0;
}

main {
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
}

header {
  text-align: center;
  margin: 1.5rem auto;
}

.sub-header {
  margin: 2rem auto;
  text-align: center;
}

ul {
  list-style-type: none;
}

a,
a:visited {
  text-decoration: none;
  color: var(--clr-accent-1);
}

hr {
  border: none;
  border-top: 1px solid var(--clr-grey-8);
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

select {
  font-size: inherit;
}

@media screen and (min-width: 481px) {
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  body {
    font-size: 1rem;
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: 1;
    margin-bottom: 0.5rem;
  }
}

.fade-enter-active {
  transition: var(--transition-opacity);
}
.fade-leave-active {
  transition: var(--transition-opacity);
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
