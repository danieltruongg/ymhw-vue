<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="callFeedbackModalLabel"
    aria-describedby="callFeedbackModalDescription"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="callFeedbackModalLabel">Call Session Feedback</h5>
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            data-bs-dismiss="modal"
            aria-label="Close feedback form"
          ></button>
        </div>

        <div class="modal-body p-4">
          <div class="text-center mb-4">
            <p class="text-muted mb-0" id="callFeedbackModalDescription">
              How was your call session? Your feedback helps us improve our support services.
            </p>
          </div>

          <form @submit.prevent="submitFeedback" aria-label="Call session feedback form">
            <fieldset class="mb-4">
              <legend class="fw-bold mb-3 h6">Overall Experience</legend>

              <div
                class="d-flex justify-content-between align-items-center text-center bg-light rounded p-3"
                role="radiogroup"
                aria-labelledby="overallExperienceLabel"
              >
                <span id="overallExperienceLabel" class="visually-hidden">Rate your overall experience</span>
                <button
                  v-for="emoji in overallExperience"
                  :key="emoji.value"
                  type="button"
                  @click="feedback.overall = emoji.value"
                  class="btn btn-lg me-2 mb-2"
                  :class="feedback.overall === emoji.value ? 'btn-dark' : 'btn-outline-secondary'"
                  :aria-pressed="feedback.overall === emoji.value"
                  :aria-label="`Rate overall experience as ${emoji.label}, ${emoji.value} out of 5`"
                  role="radio"
                  :aria-checked="feedback.overall === emoji.value"
                >
                  <div class="d-flex flex-column align-items-center">
                    <span style="font-size: 2rem" aria-hidden="true">{{ emoji.emoji }}</span>
                    <small class="mt-1">{{ emoji.label }}</small>
                  </div>
                </button>
              </div>
            </fieldset>

            <fieldset class="mb-4">
              <legend class="fw-bold mb-3 h6">Rate Specific Aspects</legend>
              <FeedbackAspectRating
                label="Call Quality & Clarity"
                v-model:rating="feedback.callQuality"
              />
              <FeedbackAspectRating
                label="Counselor Helpfulness"
                v-model:rating="feedback.helpfulness"
              />
              <FeedbackAspectRating
                label="Understanding & Empathy"
                v-model:rating="feedback.empathy"
              />
              <FeedbackAspectRating label="Response Time" v-model:rating="feedback.responseTime" />
              <FeedbackAspectRating
                label="Problem Resolution"
                v-model:rating="feedback.problemResolution"
              />
            </fieldset>

            <div class="mb-4">
              <label for="additionalComments" class="form-label fw-bold">Additional Comments (Optional)</label>
              <textarea
                id="additionalComments"
                v-model="feedback.comments"
                class="form-control"
                rows="4"
                placeholder="Share any additional thoughts about your call session to help us improve our services..."
                maxlength="500"
                aria-describedby="commentCharCount"
              ></textarea>
              <div class="form-text text-end" id="commentCharCount" aria-live="polite">
                {{ feedback.comments?.length || 0 }}/500 characters
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer bg-light">
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <button 
              type="button" 
              class="btn btn-secondary flex-fill" 
              data-bs-dismiss="modal"
              aria-label="Skip providing feedback and close form"
            >
              Skip Feedback
            </button>
            <button
              type="button"
              @click="submitFeedback"
              class="btn btn-dark flex-fill"
              :disabled="!isFormValid"
              data-bs-dismiss="modal"
              :aria-label="isFormValid ? 'Submit your feedback' : 'Complete all required ratings to submit feedback'"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FeedbackAspectRating from './FeedbackAspectRating.vue'

const overallExperience = [
  { value: 1, emoji: '😞', label: 'Poor' },
  { value: 2, emoji: '😐', label: 'Fair' },
  { value: 3, emoji: '🙂', label: 'Good' },
  { value: 4, emoji: '😊', label: 'Great' },
  { value: 5, emoji: '😍', label: 'Excellent' },
]

defineProps({
  modalId: {
    type: String,
    required: true,
  },
})

const feedback = ref({
  overall: null,
  callQuality: 0,
  helpfulness: 0,
  empathy: 0,
  responseTime: 0,
  problemResolution: 0,
  comments: '',
})

const isFormValid = computed(() => {
  return (
    feedback.value.overall !== null &&
    feedback.value.callQuality > 0 &&
    feedback.value.helpfulness > 0 &&
    feedback.value.empathy > 0 &&
    feedback.value.responseTime > 0 &&
    feedback.value.problemResolution > 0
  )
})

const emit = defineEmits(['submit-feedback'])

const submitFeedback = () => {
  if (isFormValid.value) {
    emit('submit-feedback', feedback.value)
    resetForm()
  }
}

const resetForm = () => {
  feedback.value = {
    overall: null,
    callQuality: 0,
    helpfulness: 0,
    empathy: 0,
    responseTime: 0,
    problemResolution: 0,
    comments: '',
  }
}
</script>

<style scoped></style>
