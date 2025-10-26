<template>
  <main class="container" role="main">
    <h1>Unauthorized</h1>
    <p>You do not have permission to view this page.</p>
    <router-link :to="{ name: routeNames.home }" class="text-secondary" aria-label="Return to home page">Return Home</router-link>
  </main>
</template>
<script setup>
import { routeNames } from '@/router'
</script>
<style scoped></style>
