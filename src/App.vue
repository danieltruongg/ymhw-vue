<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    
    <TheHeader id="main-navigation" />

    <main id="main-content" class="flex-grow-1" role="main" tabindex="-1">
      <router-view />
    </main>

    <div v-if="!footerRouteExclusions.includes(router.currentRoute.value.name)">
      <TheFooter />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import TheFooter from './components/Footer/TheFooter.vue'
import TheHeader from './components/Header/TheHeader.vue'
import { checkAuthState } from './composables/useAuth'
import { useRouter } from 'vue-router'

onMounted(() => {
  checkAuthState()
})

const router = useRouter()

const footerRouteExclusions = ['Unauthorized']
</script>

<style scoped></style>
