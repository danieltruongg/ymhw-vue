import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'primeicons/primeicons.css'
import { router } from './router'
import '@/firebase/firebase'
import { initializeAuth } from './composables/useAuth'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'

initializeAuth().then(() => {
  console.log('Auth Initialized')
  const app = createApp(App)
  app.use(router)
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {darkModeSelector: false}
    }
  })
  app.mount('#app')
})
