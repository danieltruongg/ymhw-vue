<template>
  <main class="container-fluid py-4" role="main">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-10">
        <header class="text-center mb-4 mb-md-5">
          <h1 class="h2 h1-md fw-bold text-dark mb-2 mb-md-3">Youth Stories</h1>
        </header>
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-dark" role="status" aria-label="Loading stories">
            <span class="visually-hidden">Loading stories...</span>
          </div>
          <p class="mt-3 text-muted">Loading stories...</p>
        </div>
        <div v-else-if="error" class="alert alert-danger" role="alert" aria-live="assertive">
          {{ error }}
        </div>
        <div v-else-if="stories.length === 0" class="text-center py-5">
          <h2 class="h4 text-muted">No Stories Available</h2>
        </div>
        <section v-else aria-label="Youth stories collection">
          <div class="row g-3 g-md-4">
            <article v-for="story in stories" :key="story.id" class="col-12 col-sm-6 col-lg-4">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-body d-flex flex-column">
                  <h3 class="card-title fw-bold text-dark mb-2 mb-md-3 h5">
                    {{ story.title }}
                  </h3>
                  <p class="card-text text-muted flex-grow-1 mb-3">
                    {{ truncateSummary(story.summary) }}
                  </p>
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="d-flex align-items-center">
                      <small class="text-muted fw-semibold" aria-label="Author">{{ story.author }}</small>
                    </div>
                  </div>
                  <button
                    @click="openStoryModal(story)"
                    class="btn btn-dark w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#storyModal"
                    :aria-label="`Read full story: ${story.title} by ${story.author}`"
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <div class="modal fade" id="storyModal" tabindex="-1" aria-labelledby="storyModalLabel" aria-hidden="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title fw-bold" id="storyModalLabel">{{ selectedStory?.title }}</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close story modal"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedStory">
              <div
                class="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom"
              >
                <div class="d-flex align-items-center">
                  <div>
                    <div class="fw-semibold" aria-label="Story author">{{ selectedStory.author }}</div>
                  </div>
                </div>
              </div>
              <section class="mb-4">
                <h6 class="fw-bold text-dark mb-2">Summary</h6>
                <p class="text-muted">{{ selectedStory.summary }}</p>
              </section>
              <section>
                <h6 class="fw-bold text-dark mb-3">Full Story</h6>
                <div class="story-content">
                  <p
                    v-for="(paragraph, index) in formatStoryContent(selectedStory.content)"
                    :key="index"
                    class="mb-3 lh-lg"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </section>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import settings from '@/assets/json/settings.json'
import { getCollectionList } from '@/services/service'
import { ref, onMounted } from 'vue'

const loading = ref(true)
const error = ref(null)
const stories = ref([])
const selectedStory = ref(null)

// Shortens summary if character count exceeds for card display
const truncateSummary = (summary, maxLength = 120) => {
  if (summary.length <= maxLength) return summary
  return summary.substring(0, maxLength) + '...'
}

// Cleans the content to be in neat paragraphs
const formatStoryContent = (content) => {
  return content.split('\n\n').filter((paragraph) => paragraph.trim().length > 0)
}

// Stores the story to display in modal
const openStoryModal = (story) => {
  selectedStory.value = story
}

// Loads stories from Firestore
const loadStories = async () => {
  try {
    loading.value = true
    error.value = null

    stories.value = await getCollectionList(settings.firestore.stories.youth)
  } catch (err) {
    console.error('Error loading stories:', err)
    error.value = 'Failed to load stories. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStories()
})
</script>

<style scoped></style>
