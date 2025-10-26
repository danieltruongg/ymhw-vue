<template>
  <div class="card" :class="{ 'border-0': isMobile }">
    <div class="card-body" :class="{ 'p-5': !isMobile, 'pt-5 px-5': isMobile }">
      <h1 class="card-title fs-4 fw-bold mb-4" :class="{ 'text-center': isMobile }">
        Add a Youth Story
      </h1>
      <form @submit.prevent="submitStory">
        <div class="mb-3">
          <label class="form-label" for="author"
            >Name of the Author<span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            id="author"
            type="text"
            maxLength="20"
            @blur="() => validateAuthor(formData, formErrors, true)"
            @input="() => validateAuthor(formData, formErrors, false)"
            v-model="formData.author"
          />
          <div class="text-danger" v-if="formErrors.author">
            {{ formErrors.author }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="title">Title<span class="text-danger">*</span></label>
          <input
            class="form-control"
            id="title"
            type="title"
            @blur="() => validateTitle(formData, formErrors, true)"
            @input="() => validateTitle(formData, formErrors, false)"
            v-model="formData.title"
          />
          <div class="text-danger" v-if="formErrors.title">
            {{ formErrors.title }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="summary"
            >One-line Summary<span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            id="summary"
            type="summary"
            @blur="() => validateSummary(formData, formErrors, true)"
            @input="() => validateSummary(formData, formErrors, false)"
            v-model="formData.summary"
          />
          <div class="text-danger" v-if="formErrors.summary">
            {{ formErrors.summary }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="content"
            >Story Content<span class="text-danger">*</span></label
          >
          <textarea
            class="form-control"
            id="content"
            rows="8"
            type="content"
            @blur="() => validateContent(formData, formErrors, true)"
            @input="() => validateContent(formData, formErrors, false)"
            v-model="formData.content"
          />
          <div class="text-danger" v-if="formErrors.content">
            {{ formErrors.content }}
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-dark ms-auto"
            :class="{ 'mt-3 mb-2 w-100': isMobile }"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { validateAuthor } from '@/utils/formValidation/storyForm/validateAuthor'
import { validateContent } from '@/utils/formValidation/storyForm/validateContent'
import { validateSummary } from '@/utils/formValidation/storyForm/validateSummary'
import { validateTitle } from '@/utils/formValidation/storyForm/validateTitle'

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const formData = defineModel('form-data', {
  default: () => ({
    author: '',
    title: '',
    summary: '',
    content: '',
  }),
})

const formErrors = defineModel('form-errors', {
  default: () => ({
    author: null,
    title: null,
    summary: null,
    content: null,
  }),
})

const emit = defineEmits(['submit-story'])

const submitStory = () => {
  validateAuthor(formData, formErrors, true)
  validateTitle(formData, formErrors, true)
  validateSummary(formData, formErrors, true)
  validateContent(formData, formErrors, true)

  if (
    !formErrors.value.author &&
    !formErrors.value.title &&
    !formErrors.value.summary &&
    !formErrors.value.content
  ) {
    emit('submit-story', formData.value)
  }
}
</script>

<style scoped></style>
