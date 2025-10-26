<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="text-center mb-5">
          <h1 class="display-5 fw-bold text-dark mb-3">{{ title }}</h1>
          <p class="lead text-muted">{{ description }}</p>
        </div>

        <div class="row g-4">
            <AdminDashCards
              v-for="(card, index) in dashCards"
              :key="index"
              :routeName="card.routeName"
              :title="card.title"
              :description="card.description"
              :buttonLabel="card.buttonLabel"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminDashCards from '@/components/AdminDashCards.vue'

defineProps({
  title: {
    type: String,
    default: 'Untitled',
  },
  description: {
    type: String,
    default: 'No description available.',
  },
  dashCards: {
    type: Array,
    default: () => [],
  }
})
</script>

<style scoped></style>
