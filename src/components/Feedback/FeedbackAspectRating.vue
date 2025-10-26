<template>
  <div class="row mb-3">
    <div class="col-12 col-sm-6 mb-2 mb-sm-0">
      <label class="form-label fw-medium">{{ label }}</label>
    </div>
    <div class="col-12 col-sm-6">
      <div class="d-flex justify-content-start justify-content-sm-end">
        <div 
          class="btn-group" 
          role="radiogroup" 
          :aria-labelledby="`rating-${label.replace(/\s+/g, '-').toLowerCase()}`"
          :aria-describedby="`rating-desc-${label.replace(/\s+/g, '-').toLowerCase()}`"
        >
          <button
            v-for="star in 5"
            :key="`${label}-${star}`"
            type="button"
            @click="updateRating(star)"
            class="btn btn-sm"
            :class="star <= rating ? 'btn-warning' : 'btn-outline-secondary'"
            :aria-label="`${star} star${star !== 1 ? 's' : ''} for ${label}`"
            :aria-pressed="star <= rating"
            role="radio"
            :aria-checked="star === rating"
          >
            <i class="bi bi-star-fill" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:rating'])

const updateRating = (newRating) => {
  emit('update:rating', newRating)
}
</script>

<style scoped></style>
