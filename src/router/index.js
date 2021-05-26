import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/HomePage.vue'
import Favorites from '../components/pages/FavoritesPage.vue'
import UpcomingEpisodes from '../components/pages/UpcomingEpisodesPage.vue'
import SearchResults from '../components/pages/SearchResultsPage.vue'
import Show from '../components/pages/ShowPage.vue'
import NotFoundPage from '../components/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },
  {
    path: '/upcoming-episodes',
    name: 'UpcomingEpisodes',
    component: UpcomingEpisodes,
  },
  {
    path: '/search-results',
    name: 'search-results',
    component: SearchResults,
  },
  {
    path: '/shows/:showId',
    name: 'show-details',
    component: Show,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active-route',
  routes,
})

export default router
