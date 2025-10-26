<template>
  <div class="card" :class="{ 'border-0': isMobile }">
    <div class="card-body" :class="{ 'p-5': !isMobile, 'pt-5 px-5': isMobile }">
      <h1 class="card-title fs-4 fw-bold mb-4" :class="{ 'text-center': isMobile }">
        Submit a Story
      </h1>
      <form @submit.prevent="submitStory" role="form" aria-label="Submit youth story form">
        <div class="mb-3">
          <label class="form-label" for="author"
            >What is your name?<span class="text-danger" aria-label="required">*</span></label
          >
          <input
            class="form-control"
            id="author"
            type="text"
            maxLength="20"
            @blur="() => validateAuthor(formData, formErrors, true)"
            @input="() => validateAuthor(false)"
            v-model="formData.author"
            :aria-describedby="formErrors.author ? 'author-error' : undefined"
            :aria-invalid="formErrors.author ? 'true' : 'false'"
            aria-required="true"
          />
          <div class="text-danger" v-if="formErrors.author" id="author-error" role="alert">
            {{ formErrors.author }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="email"
            >What is your email?<span class="text-danger" aria-label="required">*</span></label
          >
          <input
            class="form-control"
            id="email"
            type="email"
            @blur="() => validateEmail(formData, formErrors, true)"
            @input="() => validateEmail(formData, formErrors, false)"
            v-model="formData.email"
            :aria-describedby="formErrors.email ? 'email-error' : undefined"
            :aria-invalid="formErrors.email ? 'true' : 'false'"
            aria-required="true"
          />
          <div class="text-danger" v-if="formErrors.email" id="email-error" role="alert">
            {{ formErrors.email }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="storyType">
            Who are you?<span class="text-danger" aria-label="required">*</span>
          </label>
          <select
            class="form-select"
            id="storyType"
            @blur="() => validateStoryType(formData, formErrors, true)"
            @change="() => validateStoryType(formData, formErrors, false)"
            v-model="formData.storyType"
            :aria-describedby="formErrors.storyType ? 'storyType-error' : undefined"
            :aria-invalid="formErrors.storyType ? 'true' : 'false'"
            aria-required="true"
          >
            <option value="">Select story type</option>
            <option value="youth">Youth</option>
            <option value="parent-carer">Parent/Carer</option>
          </select>
          <div class="text-danger" v-if="formErrors.storyType" id="storyType-error" role="alert">
            {{ formErrors.storyType }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="title">Provide a Title<span class="text-danger" aria-label="required">*</span></label>
          <input
            class="form-control"
            id="title"
            type="text"
            @blur="() => validateTitle(formData, formErrors, true)"
            @input="() => validateTitle(formData, formErrors, false)"
            v-model="formData.title"
            :aria-describedby="formErrors.title ? 'title-error' : undefined"
            :aria-invalid="formErrors.title ? 'true' : 'false'"
            aria-required="true"
          />
          <div class="text-danger" v-if="formErrors.title" id="title-error" role="alert">
            {{ formErrors.title }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="summary"
            >Provide a One-line Summary<span class="text-danger" aria-label="required">*</span></label
          >
          <input
            class="form-control"
            id="summary"
            type="text"
            @blur="() => validateSummary(formData, formErrors, true)"
            @input="() => validateSummary(formData, formErrors, false)"
            v-model="formData.summary"
            :aria-describedby="formErrors.summary ? 'summary-error' : undefined"
            :aria-invalid="formErrors.summary ? 'true' : 'false'"
            aria-required="true"
          />
          <div class="text-danger" v-if="formErrors.summary" id="summary-error" role="alert">
            {{ formErrors.summary }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="content"
            >What is your Story?<span class="text-danger" aria-label="required">*</span></label
          >
          <textarea
            class="form-control"
            id="content"
            rows="8"
            type="text"
            @blur="() => validateContent(formData, formErrors, true)"
            @input="() => validateContent(formData, formErrors, false)"
            v-model="formData.content"
            :aria-describedby="formErrors.content ? 'content-error' : undefined"
            :aria-invalid="formErrors.content ? 'true' : 'false'"
            aria-required="true"
          ></textarea>
          <div class="text-danger" v-if="formErrors.content" id="content-error" role="alert">
            {{ formErrors.content }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="attachment">
            Attach Relating Image (Optional)
          </label>
          <input
            class="form-control"
            id="attachment"
            type="file"
            accept=".png,.jpg,.jpeg"
            @change="handleFileChange"
            aria-describedby="attachment-help"
            :aria-invalid="formErrors.attachment ? 'true' : 'false'"
          />
          <div class="form-text" id="attachment-help">
            PNG, JPG, or JPEG files only. Maximum file size: 5MB
          </div>
          <div v-if="submittedFile" class="mt-2">
            <div class="d-flex align-items-center p-2 border rounded bg-light">
              <span class="badge bg-primary me-2">IMG</span>
              <span class="me-2">{{ submittedFile.name }}</span>
              <small class="text-muted me-2">({{ formattedFileSize }})</small>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger ms-auto"
                @click="removeFile"
                :aria-label="`Remove file ${submittedFile.name}`"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="text-danger" v-if="formErrors.attachment" id="attachment-error" role="alert">
            {{ formErrors.attachment }}
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-dark ms-auto"
            :class="{ 'mt-3 mb-2 w-100': isMobile }"
            type="submit"
            aria-label="Submit your story"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// import { formatFileSize } from '@/utils/formatFileSize'
import { validateAuthor } from '@/utils/formValidation/storyForm/validateAuthor'
import { validateContent } from '@/utils/formValidation/storyForm/validateContent'
import { validateStoryType } from '@/utils/formValidation/storyForm/validateStoryType'
import { validateSummary } from '@/utils/formValidation/storyForm/validateSummary'
import { validateTitle } from '@/utils/formValidation/storyForm/validateTitle'
import { validateEmail } from '@/utils/formValidation/validateEmail'
import axios from 'axios'
import { ref } from 'vue'

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const formData = defineModel('form-data', {
  default: () => ({
    author: '',
    email: '',
    storyType: '',
    title: '',
    summary: '',
    content: '',
    attachment: null,
  }),
})

const formErrors = defineModel('form-errors', {
  default: () => ({
    author: null,
    email: null,
    storyType: null,
    title: null,
    summary: null,
    content: null,
    attachment: null,
  }),
})

const submittedFile = ref(null)
const formattedFileSize = ref(null)

const emit = defineEmits(['submit-story'])

const submitStory = () => {
  validateEmail(formData, formErrors, true)
  validateAuthor(formData, formErrors, true)
  validateStoryType(formData, formErrors, true)
  validateTitle(formData, formErrors, true)
  validateSummary(formData, formErrors, true)
  validateContent(formData, formErrors, true)

  if (
    !formErrors.value.email &&
    !formErrors.value.author &&
    !formErrors.value.storyType &&
    !formErrors.value.title &&
    !formErrors.value.summary &&
    !formErrors.value.content
  ) {
    emit('submit-story', formData.value)
  }
}

const formatFileSize = async (size) => {
  try {
    const response = await axios.get("https://formatfilesize-yxadv4kvuq-uc.a.run.app", {
      params: { bytes: size }
    })
    return response.data
  } catch (error) {
    console.error('Error formatting file size:', error)
    return size
  }
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  
  if (!file) {
    submittedFile.value = null
    formattedFileSize.value = null
    formData.value.attachment = null
    formErrors.value.attachment = null
    return
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
  if (!validTypes.includes(file.type)) {
    formErrors.value.attachment = 'Only PNG, JPG, and JPEG files are allowed'
    event.target.value = ''
    return
  }

  // Validate file size (5MB max), then Format Size
  const maxSize = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > maxSize) {
    formErrors.value.attachment = 'File size must be less than 5MB'
    event.target.value = ''
    return
  } else {
    formattedFileSize.value = await formatFileSize(file.size)
  }

  console.log(formattedFileSize.value)
  submittedFile.value = file
  formData.value.attachment = file
  formErrors.value.attachment = null
}

const removeFile = () => {
  submittedFile.value = null
  formData.value.attachment = null
  formErrors.value.attachment = null
  // Clear the file input
  const fileInput = document.getElementById('attachment')
  if (fileInput) fileInput.value = ''
}
</script>

<style scoped></style>
