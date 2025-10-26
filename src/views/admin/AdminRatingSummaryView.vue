<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-10">
        <div class="text-center mb-4 mb-md-5">
          <h1 class="h2 h1-md fw-bold text-dark mb-2 mb-md-3">Youth Call Service Ratings</h1>
        </div>
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading ratings...</p>
        </div>
        <div v-else-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <div v-else>
          <div class="row g-3 g-md-4 mb-4 mb-md-5">
            <!-- Upper Row -->
            <div class="col-6 col-md-3">
              <div class="card h-100 text-center border-0 shadow-sm">
                <div class="card-body py-3 py-md-4">
                  <h3 class="h4 h3-md fw-bold mb-1">{{ totalRatings }}</h3>
                  <p class="small text-muted mb-0">Total Ratings</p>
                </div>
              </div>
            </div>

            <div class="col-6 col-md-3">
              <div class="card h-100 text-center border-0 shadow-sm">
                <div class="card-body py-3 py-md-4">
                  <h3 class="h4 h3-md fw-bold mb-1">{{ averageOverall }}/5</h3>
                  <p class="small text-muted mb-0">Avg Experience</p>
                </div>
              </div>
            </div>

            <div class="col-6 col-md-3">
              <div class="card h-100 text-center border-0 shadow-sm">
                <div class="card-body py-3 py-md-4">
                  <h3 class="h4 h3-md fw-bold mb-1">{{ totalComments }}</h3>
                  <p class="small text-muted mb-0">Comments</p>
                </div>
              </div>
            </div>

            <div class="col-6 col-md-3">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-body d-flex flex-column justify-content-center py-1 py-md-2">
                  <button
                    class="btn btn-dark w-100"
                    :disabled="totalComments === 0"
                    data-bs-toggle="modal"
                    data-bs-target="#commentsModal"
                    :aria-label="totalComments === 0 ? 'No comments available to view' : `View ${totalComments} user comments`"
                  >
                    <i class="bi bi-eye me-1" aria-hidden="true"></i>
                    <span class="d-none d-sm-inline">View </span>Comments
                  </button>
                  <button
                    class="btn btn-dark w-100 mt-1"
                    :disabled="totalComments === 0"
                    data-bs-toggle="modal"
                    data-bs-target="#aiSummaryModal"
                    :aria-label="totalComments === 0 ? 'No comments available for AI analysis' : `Generate AI summary of ${totalComments} user comments`"
                  >
                    <i class="bi bi-robot me-1" aria-hidden="true"></i>
                    <span class="d-none d-sm-inline">View </span>AI Summary
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Lower Row -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-light border-0 py-3">
              <h4 class="h5 h4-md mb-0 fw-bold">Rating Breakdown</h4>
            </div>
            <div class="card-body p-3 p-md-4">
              <div class="row g-3 g-md-4">
                <AspectRatings
                  :aspectLabel="'Call Quality'"
                  :averageRating="averageRatings.callQuality"
                />
                <AspectRatings
                  :aspectLabel="'Helpfulness'"
                  :averageRating="averageRatings.helpfulness"
                />
                <AspectRatings :aspectLabel="'Empathy'" :averageRating="averageRatings.empathy" />
                <AspectRatings
                  :aspectLabel="'Response Time'"
                  :averageRating="averageRatings.responseTime"
                />
                <AspectRatings
                  :aspectLabel="'Resolution'"
                  :averageRating="averageRatings.problemResolution"
                />
                <AspectRatings :aspectLabel="'Overall'" :averageRating="averageOverall" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Modal -->
    <div class="modal fade" id="commentsModal" tabindex="-1" aria-labelledby="commentsModalLabel" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="commentsModalLabel">User Comments</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close comments modal"
            ></button>
          </div>
          <div class="modal-body p-0">
            <div v-if="allComments.length === 0" class="text-center py-5">
              <p class="text-muted">No comments available</p>
            </div>
            <div v-else class="list-group list-group-flush">
              <div 
                v-for="(comment, index) in allComments" 
                :key="index" 
                class="list-group-item"
                role="article"
                :aria-label="`Comment ${index + 1} of ${allComments.length}`"
              >
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge bg-dark" :aria-label="`Rating: ${comment.overall} out of 5 stars`">{{ comment.overall }}/5</span>
                  <small class="text-muted">{{ comment.formattedDate }}</small>
                </div>
                <p class="mb-0">{{ comment.comment }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- AI Summary Modal -->
  <div class="modal fade" id="aiSummaryModal" tabindex="-1" aria-labelledby="aiSummaryModalLabel" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="aiSummaryModalLabel">AI User Comment Summary</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close AI summary modal"
          ></button>
        </div>
        <div class="modal-body p-0">
          <div v-if="allComments.length === 0" class="text-center py-5">
            <p class="text-muted">No comments available</p>
          </div>
          <div v-else class="list-group list-group-flush">
            <!-- AI Comment Summary Content -->
            <div id="aiCommentSummaryContent" class="list-group-item" role="region" aria-label="AI generated summary">
              <!-- Header Section -->
              <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-4">
                <div class="mb-2 mb-sm-0">
                  <small class="text-muted">Based on {{ allComments.length }} user comments</small>
                </div>
                <button
                  class="btn btn-dark btn-sm"
                  @click="generateAISummary"
                  :disabled="isGeneratingAI || allComments.length === 0"
                  :aria-label="isGeneratingAI ? 'Generating AI summary, please wait' : 'Generate AI summary of user comments'"
                >
                  <span v-if="isGeneratingAI" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
                  {{ isGeneratingAI ? 'Generating...' : 'Generate Summary' }}
                </button>
              </div>

              <!-- Loading State -->
              <div v-if="isGeneratingAI" class="text-center py-5">
                <div class="spinner-border text-dark mb-3"></div>
                <p class="text-muted mb-1">Analyzing comments...</p>
                <small class="text-muted">Please wait</small>
              </div>

              <!-- AI Summary Content -->
              <div v-else-if="aiSummaryData" class="mb-3">
                <!-- Stats Summary -->
                <div class="row g-3 mb-4">
                  <div class="col-6 col-md-3">
                    <div class="border rounded p-3 text-center">
                      <div class="h5 fw-bold text-dark mb-1">{{ aiSummaryData.sentiment?.positive || 0 }}%</div>
                      <small class="text-muted">Positive</small>
                    </div>
                  </div>
                  <div class="col-6 col-md-3">
                    <div class="border rounded p-3 text-center">
                      <div class="h5 fw-bold text-dark mb-1">{{ aiSummaryData.sentiment?.neutral || 0 }}%</div>
                      <small class="text-muted">Neutral</small>
                    </div>
                  </div>
                  <div class="col-6 col-md-3">
                    <div class="border rounded p-3 text-center">
                      <div class="h5 fw-bold text-dark mb-1">{{ aiSummaryData.sentiment?.negative || 0 }}%</div>
                      <small class="text-muted">Negative</small>
                    </div>
                  </div>
                  <div class="col-6 col-md-3">
                    <div class="border rounded p-3 text-center">
                      <div class="h5 fw-bold text-dark mb-1">{{ aiSummaryData.themes?.length || 0 }}</div>
                      <small class="text-muted">Themes</small>
                    </div>
                  </div>
                </div>

                <!-- Main Summary -->
                <div class="mb-4">
                  <h6 class="fw-bold text-dark mb-3">Summary</h6>
                  <div class="bg-light border rounded p-3">
                    <p class="mb-0 text-dark">{{ aiSummaryData.summary || 'AI analysis summary will appear here...' }}</p>
                  </div>
                </div>

                <!-- Common Themes -->
                <div v-if="aiSummaryData.themes && aiSummaryData.themes.length > 0" class="mb-4">
                  <h6 class="fw-bold text-dark mb-3">Key Themes</h6>
                  <div class="d-flex flex-wrap gap-2">
                    <span
                      v-for="(theme, index) in aiSummaryData.themes"
                      :key="index"
                      class="badge bg-secondary"
                    >
                      {{ theme }}
                    </span>
                  </div>
                </div>

                <!-- Recommendations -->
                <div v-if="aiSummaryData.recommendations && aiSummaryData.recommendations.length > 0" class="mb-4">
                  <h6 class="fw-bold text-dark mb-3">Recommendations</h6>
                  <div class="bg-light border rounded p-3">
                    <div
                      v-for="(recommendation, index) in aiSummaryData.recommendations"
                      :key="index"
                      class="mb-2"
                      :class="{ 'mb-0': index === aiSummaryData.recommendations.length - 1 }"
                    >
                      <div class="d-flex align-items-start">
                        <span class="text-muted me-2">•</span>
                        <span class="text-dark">{{ recommendation }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Priority Actions -->
                <div v-if="aiSummaryData.actions && aiSummaryData.actions.length > 0" class="mb-4">
                  <h6 class="fw-bold text-dark mb-3">Action Items</h6>
                  <div class="bg-light border rounded p-3">
                    <div
                      v-for="(action, index) in aiSummaryData.actions"
                      :key="index"
                      class="mb-2"
                      :class="{ 'mb-0': index === aiSummaryData.actions.length - 1 }"
                    >
                      <div class="d-flex align-items-start">
                        <span class="badge bg-dark me-2 mt-1">{{ action.priority }}</span>
                        <span class="text-dark">{{ action.text }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-5">
                <h6 class="text-dark mb-2">Ready to Analyze</h6>
                <p class="text-muted mb-0">Generate an AI summary of {{ allComments.length }} user comments</p>
              </div>

              <!-- Error State -->
              <div v-if="aiSummaryError" class="alert alert-light border">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <i class="bi bi-exclamation-triangle me-2 text-muted"></i>
                    <span class="text-dark">{{ aiSummaryError }}</span>
                  </div>
                  <button
                    class="btn btn-sm btn-dark"
                    @click="generateAISummary"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import settings from '@/assets/json/settings.json'
import AspectRatings from '@/components/Ratings/AspectRatings.vue'
import { getCollectionList } from '@/services/service'
// import { formatFirestoreTimestamp } from '@/utils/formatDate'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

const loading = ref(true)
const error = ref(null)
const ratings = ref([])

const isGeneratingAI = ref(false)
const aiSummaryData = ref(null)
const aiSummaryError = ref(null)

// Finds the total number of ratings
const totalRatings = computed(() => ratings.value.length)

// Finds the total number of comments
const totalComments = computed(
  () =>
    ratings.value.filter((rating) => rating.comments && rating.comments.trim().length > 0).length,
)

// Generates list of all comments
const allComments = computed(() =>
  ratings.value
    .filter((rating) => rating.comments && rating.comments.trim().length > 0)
    .map((rating) => ({
      comment: rating.comments,
      date: rating.submittedAt,
      formattedDate: rating.formattedDate, // Use pre-formatted date
      overall: rating.overall,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)),
)

// Calculates the average overall score
const averageOverall = computed(() => {
  if (ratings.value.length === 0) return '0.0'
  const sum = ratings.value.reduce((acc, rating) => acc + rating.overall, 0)
  return (sum / ratings.value.length).toFixed(1)
})

// Generates an object of average ratings for each aspect
const averageRatings = computed(() => {
  if (ratings.value.length === 0) {
    return {
      callQuality: '0.0',
      helpfulness: '0.0',
      empathy: '0.0',
      responseTime: '0.0',
      problemResolution: '0.0',
    }
  }

  const aspects = Object.keys(ratings.value[0].aspects)
  const averages = {}

  aspects.forEach((aspect) => {
    const sum = ratings.value.reduce((acc, rating) => acc + rating.aspects[aspect], 0)
    averages[aspect] = (sum / ratings.value.length).toFixed(1)
  })

  return averages
})

// Formats Firestore timestamp to readable date
const formattedDate = async (timestamp) => {
  try {
    const response = await axios.get("https://formatfirestoretimestamp-yxadv4kvuq-uc.a.run.app", {
      params: { seconds: timestamp.seconds, nanoseconds: timestamp.nanoseconds }
    });
    return response.data;
  } catch (error) {
    console.error('Error formatting Firestore timestamp:', error);
    throw error;
  }
}

// Initialises the ratings list from firestore
const loadRatings = async () => {
  try {
    loading.value = true
    error.value = null

    const rawRatings = await getCollectionList(settings.firestore.ratings.youth.calls)
    
    ratings.value = await Promise.all(
      rawRatings.map(async (rating) => ({
        ...rating,
        formattedDate: await formattedDate(rating.submittedAt)
      }))
    )
  } catch (err) {
    console.error('Error loading ratings:', err)
    error.value = 'Failed to load ratings. Please try again.'
  } finally {
    loading.value = false
  }
}

// Generates AI summary of user comments
const generateAISummary = async () => {
  if (allComments.value.length === 0) return
  isGeneratingAI.value = true
  aiSummaryError.value = null
  aiSummaryData.value = null

  try {
    // Prepare comment data for AI analysis
    const commentsText = allComments.value.map((comment, index) => 
      `Comment ${index + 1} (Rating: ${comment.overall}/5): ${comment.comment}`
    ).join('\n\n')

    const prompt = 
    `Analyze the following user comments for a youth mental health call service 
    and provide a comprehensive summary in JSON format: ${commentsText}
    Please analyze and provide the following structure:
    {
      "summary": "A brief 2-3 sentence overview of the key insights",
      "sentiment": {
        "positive": percentage_number,
        "neutral": percentage_number,
        "negative": percentage_number
      },
      "themes": ["theme1", "theme2", "theme3"],
      "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
      "actions": [
        {"priority": "High/Medium/Low", "text": "action description"},
        {"priority": "High/Medium/Low", "text": "action description"}
      ]
    }
    Focus on mental health service quality, user experience, and actionable improvements.`

    const response = await axios.post(
      'https://generateaicontent-yxadv4kvuq-uc.a.run.app',
      {
        prompt: prompt,
        temperature: 0.3,
        maxTokens: 1500,
      }
    )
    const cleanedAiSummaryRes = response.data.content.replace("```json\n", "").replace("```", "")
    aiSummaryData.value = JSON.parse(cleanedAiSummaryRes)
  } catch (err) {
    console.error('Error generating AI summary:', err)
    aiSummaryError.value = err.response?.data?.message || err.message || 'Failed to generate AI summary'
  } finally {
    isGeneratingAI.value = false
  }
}

onMounted(() => {
  loadRatings()
})
</script>

<style scoped></style>
