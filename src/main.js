import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faStar as fasStar,
  faHome as fasHome,
} from '@fortawesome/free-solid-svg-icons'
import {
  faStar as farStar,
  faCalendarAlt as farCalendarAlt,
} from '@fortawesome/free-regular-svg-icons'
library.add(faSearch, fasStar, farStar, farCalendarAlt, fasHome)

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app')
