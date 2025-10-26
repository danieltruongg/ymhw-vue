<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center h-100">
      <div class="col-xxl-6 col-xl-7 col-lg-7 col-md-9 col-sm-11">
        <div class="d-none d-md-block">
          <SubmitStoryForm
            :isMobile="false"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-story="submitStory"
          />
        </div>
        <div class="d-md-none">
          <SubmitStoryForm
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
import SubmitStoryForm from '@/components/SubmitStoryForm.vue'
import { fileToBase64 } from '@/utils/convertFiletoBase64.js'
import { routeNames } from '@/router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const data = ref({
    author: '',
    email: '',
    storyType: '',
    title: '',
    summary: '',
    content: '',
    attachment: null,
  })

const errors = ref({
    author: null,
    email: null,
    storyType: null,
    title: null,
    summary: null,
    content: null,
    attachment: null,
})

const submitStory = async (formData) => {
  try {
    let attachmentData;
    if (formData.attachment) {
        const attachContent = await fileToBase64(formData.attachment)
        attachmentData = {
            name: formData.attachment.name,
            type: formData.attachment.type,
        size: formData.attachment.size,
        content: attachContent
        }
    } else {
        attachmentData = null;
    }
    
    await axios.post('https://submitstory-yxadv4kvuq-uc.a.run.app', {
            name: formData.author, 
            email: formData.email, 
            type: formData.storyType, 
            summary: formData.summary, 
            story: formData.content, 
            attachment: attachmentData
    })
    alert('Thank you for your submission! We will review your story and get back to you via email if necessary.')
    router.push({ name: routeNames.home })
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Error submitting story:', errorCode, errorMessage)
  }
}
</script>

<style scoped></style>
