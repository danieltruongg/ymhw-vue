<template>
  <div class="col-12 col-sm-6">
    <article class="card h-100 shadow-sm border-0">
      <div class="card-body d-flex flex-column text-center p-4">
        <h4 class="card-title fw-semibold mb-3">{{ title }}</h4>
        <p class="card-text text-muted flex-grow-1 mb-4">
          {{ description }}
        </p>
        <router-link
          :to="{ name: routeName }"
          :class="`btn btn-${buttonColour} btn-lg w-100 mt-auto`"
          :aria-label="`Navigate to ${title} - ${description}`"
          role="button"
        >
          {{ buttonLabel }}
        </router-link>
      </div>
    </article>
  </div>
</template>

<script setup>
defineProps({
  routeName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
  buttonColour: {
    type: String,
    default: 'dark',
  },
})
</script>

<style scoped></style>
