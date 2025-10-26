<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center h-100">
      <div class="col-xxl-6 col-xl-7 col-lg-7 col-md-9 col-sm-11">
        <div class="d-none d-md-block">
          <AddYouthStoryForm
            :isMobile="false"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-story="submitStory"
          />
        </div>
        <div class="d-md-none">
          <AddYouthStoryForm
            :isMobile="true"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-story="submitStory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import settings from '@/assets/json/settings.json'
import AddYouthStoryForm from '@/components/AddYouthStoryForm.vue'
import { routeNames } from '@/router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addDocumentToCollection } from '@/services/service'

const router = useRouter()

const data = ref({
  author: '',
  title: '',
  summary: '',
  content: '',
})

const errors = ref({
  author: null,
  title: null,
  summary: null,
  content: null,
})

const submitStory = async (formData) => {
  try {
    await addDocumentToCollection(settings.firestore.stories.youth, formData)
    router.push({ name: routeNames.home })
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Error creating youth story:', errorCode, errorMessage)
  }
}
</script>

<style scoped></style>
