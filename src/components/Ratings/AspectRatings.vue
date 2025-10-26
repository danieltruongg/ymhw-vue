<template>
  <div class="col-12 col-sm-6 col-lg-4">
    <div class="text-center p-2 p-md-3">
      <h6 class="fw-semibold mb-2 mb-md-3">{{ aspectLabel }}</h6>
      <div class="mb-2">
        <StarRating :rating="averageRating" />
      </div>
      <h5 class="fw-bold mb-0">{{ averageRating }}</h5>
    </div>
  </div>
</template>

<script setup>
import StarRating from './StarRating.vue'

defineProps({
  aspectLabel: {
    type: String,
    required: true,
  },
  averageRating: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>
