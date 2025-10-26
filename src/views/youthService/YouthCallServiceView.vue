<template>
  <main class="container" role="main">
    <div>
      <button 
        class="btn btn-danger" 
        data-bs-toggle="modal" 
        :data-bs-target="`#${modalId}`"
        aria-label="End call and provide feedback"
      >
        End Call
      </button>
    </div>
    <CallFeedbackModal :modalId="modalId" @submit-feedback="submitFeedback" />
  </main>
</template>

<script setup>
import settings from '@/assets/json/settings.json'
import CallFeedbackModal from '@/components/Feedback/CallFeedbackModal.vue'
import { userSession } from '@/composables/useAuth'
import { addDocumentToCollection } from '@/services/service'
import { serverTimestamp } from 'firebase/firestore'

const modalId = 'callFeedbackModal'

const submitFeedback = async (feedbackData) => {
  try {
    console.log('Submitting Feedback')
    const currentUserId = userSession.value.uid
    const data = {
      clientId: currentUserId,
      overall: feedbackData.overall,
      aspects: {
        callQuality: feedbackData.callQuality,
        helpfulness: feedbackData.helpfulness,
        empathy: feedbackData.empathy,
        responseTime: feedbackData.responseTime,
        problemResolution: feedbackData.problemResolution,
      },
      comments: feedbackData.comments,
      submittedAt: serverTimestamp(),
    }
    await addDocumentToCollection(settings.firestore.ratings.youth.calls, data)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Error submitting feedback:', errorCode, errorMessage)
  }
}
</script>
