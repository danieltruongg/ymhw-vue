<template>
  <div class="d-flex col-12 col-sm-auto flex-column align-items-center">
    <p class="mb-0 me-3">© 2025-2025</p>
  </div>
  <div class="d-flex col-12 col-sm flex-column align-items-center">
    <ul class="nav d-flex flex-row align-items-center">
      <li v-for="(item, index) in legalityItems" :key="index" class="nav-item">
        <p v-if="item.spacer" class="px-2 mb-0">-</p>
        <router-link
          v-else
          :to="{ name: item.item.route_name }"
          class="nav-link px-0 text-dark"
          role="button"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { legalityItems } from '../nav/navItems'
</script>

<style scoped></style>
