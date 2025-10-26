<template>
  <div class="flex-shrink-0 dropdown ms-3">
    <button
      type="button"
      class="btn d-block link-body-emphasis text-decoration-none dropdown-toggle border-0 bg-transparent"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      aria-haspopup="true"
      aria-label="User account menu"
      id="accountDropdown"
      ><span class="pi pi-user" style="font-size: 2rem" aria-hidden="true"></span
    ></button>

    <ul v-if="isLoading" class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
      <li class="nav-item">
        <span class="nav-link px-3 text-muted" role="status" aria-live="polite">Loading...</span>
      </li>
    </ul>
    <ul v-else-if="isLoggedIn" class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
      <li class="nav-item">
        <router-link
          :to="{ name: profile.route_name }"
          class="nav-link px-3 text-dark"
          tabindex="0"
        >
          {{ profile.label }}
        </router-link>
      </li>
      <li v-if="isAdmin" class="nav-item">
        <router-link :to="{ name: adminDashboard.route_name }" class="nav-link px-3 text-dark" tabindex="0">
          {{ adminDashboard.label }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: settingsUpdateUsername.route_name }" class="nav-link px-3 text-dark" tabindex="0">
          {{ settingsUpdateUsername.label }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: settings.route_name }" class="nav-link px-3 text-dark" tabindex="0">
          {{ settings.label }}
        </router-link>
      </li>
      <li class="nav-item">
        <hr class="dropdown-divider" />
      </li>
      <li class="nav-item">
        <button 
          type="button" 
          class="nav-link px-3 text-dark border-0 bg-transparent w-100 text-start" 
          @click="handleSignOut(router)"
          tabindex="0"
        > 
          Sign Out 
        </button>
      </li>
    </ul>
    <ul v-else class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
      <li class="nav-item">
        <router-link :to="{ name: login.route_name }" class="nav-link px-3 text-dark" tabindex="0">
          {{ login.label }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: signup.route_name }" class="nav-link px-3 text-dark" tabindex="0">
          {{ signup.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { login, signup, profile, settings, settingsUpdateUsername, adminDashboard } from '../nav/navItems'
import { handleSignOut, isLoggedIn, isAdmin, isLoading } from '@/composables/useAuth'

const router = useRouter()
</script>

<style scoped>
.dropdown-menu {
  min-width: unset;
  width: auto;
  white-space: nowrap;
}
</style>
