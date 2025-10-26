<template>
  <div class="container">
    <input v-model="msg" />
    <p>{{ msg }}</p>
    <p>This is a temporary component for testing purposes.</p>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const msg = ref('')
</script>
<style scoped></style>
