<template>
  <div class="d-inline-flex">
    <i v-for="star in 5" :key="star" class="bi bi-star-fill me-1" :class="getStarClass(star)"></i>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rating: {
    type: [Number, String],
    default: 0,
  },
})

const numericRating = computed(() => parseFloat(props.rating) || 0)

const getStarClass = (starIndex) => {
  return starIndex <= Math.round(numericRating.value) ? 'text-warning' : 'text-muted'
}
</script>

<style scoped></style>
