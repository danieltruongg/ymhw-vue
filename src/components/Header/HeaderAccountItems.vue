<template>
  <div v-if="isLoggedIn">
    <HeaderAccountDropdown />
  </div>
  <div v-else>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: login.route_name }" class="nav-link px-3 text-dark" role="button">
          {{ login.label }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: signup.route_name }" class="btn btn-dark mx-3">
          {{ signup.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { login, signup } from '../nav/navItems'
import { isLoggedIn } from '@/composables/useAuth'
import HeaderAccountDropdown from './HeaderAccountDropdown.vue'
</script>

<style scoped></style>
