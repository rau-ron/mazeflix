<template>
  <nav class="menu-top">
    <div class="nav-center">
      <div class="nav-logo">
        <router-link to="/">
          <img
            :src="require('../../assets/mazeflix-logo.png')"
            alt="mazeflix"
          />
        </router-link>
      </div>
      <ul class="nav-links">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/favorites">Favorites</router-link>
        </li>
        <li>
          <router-link to="/upcoming-episodes">Upcoming</router-link>
        </li>
      </ul>
      <div class="search-center">
        <the-searchform />
      </div>
    </div>
  </nav>
  <nav class="menu-bottom">
    <ul>
      <li class="menu-home-link">
        <router-link to="/">
          <div class="menu-item">
            <fa :icon="['fas', 'home']" class="menu-item-icon" />
            <span class="menu-item-label">Home</span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/favorites">
          <div class="menu-item">
            <fa :icon="['fas', 'star']" class="menu-item-icon" />
            <span class="menu-item-label">Favorites</span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/upcoming-episodes">
          <div class="menu-item">
            <fa :icon="['far', 'calendar-alt']" class="menu-item-icon" />
            <span class="menu-item-label">Upcoming</span>
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import TheSearchform from './TheSearchform.vue'
export default {
  components: { TheSearchform },
}
</script>

<style scoped>
.menu-top {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--clr-accent-1);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
}

.nav-center {
  width: 95vw;
  margin: 0 auto;
  max-width: var(--max-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo img {
  width: 140px;
  margin-top: 5px;
}

.nav-links {
  display: flex;
  justify-content: center;
}
.nav-links li {
  margin: 0 0.5rem;
}
.nav-links a {
  color: var(--clr-neutral-3);
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: var(--spacing);
  padding: 0.5rem;
}

.nav-links a:hover {
  border-bottom: 2px solid var(--clr-neutral-3);
}

.nav-links .active-route {
  border-bottom: 2px solid var(--clr-neutral-3);
}

.search-center {
  display: block;
}

.menu-bottom {
  display: none;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--clr-white);
  height: 5rem;
  z-index: 101;
}

.menu-bottom ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.menu-bottom .menu-item {
  color: var(--clr-neutral-1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.active-route .menu-item {
  color: var(--clr-accent-1);
}

.menu-item-icon {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

@media screen and (max-width: 480px) {
  .nav-logo {
    display: none;
  }
  .search-center {
    margin: 0 auto;
  }
}

@media screen and (max-width: 820px) {
  .menu-top .nav-links {
    display: none;
  }
  .menu-bottom {
    display: block;
  }
}
</style>
