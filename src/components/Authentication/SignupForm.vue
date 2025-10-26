<template>
  <div class="card" :class="{ 'border-0': isMobile }">
    <div class="card-body" :class="{ 'p-5': !isMobile, 'pt-5 px-5': isMobile }">
      <h1 class="card-title fs-4 fw-bold mb-4" :class="{ 'text-center': isMobile }">
        Create an account
      </h1>
      <form @submit.prevent="submitSignup">
        <div class="mb-3">
          <label class="form-label" for="username"
            >Username<span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            id="username"
            type="text"
            maxLength="20"
            @blur="() => validateUsername(formData, formErrors, true)"
            @input="() => validateUsername(formData, formErrors, false)"
            v-model="formData.username"
          />
          <div class="text-danger" v-if="formErrors.username">
            {{ formErrors.username }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="email">Email<span class="text-danger">*</span></label>
          <input
            class="form-control"
            id="email"
            type="email"
            @blur="() => validateEmail(formData, formErrors, true)"
            @input="() => validateEmail(formData, formErrors, false)"
            v-model="formData.email"
          />
          <div class="text-danger" v-if="formErrors.email">
            {{ formErrors.email }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password"
            >Password<span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            id="password"
            type="password"
            @blur="() => validateSignupPassword(formData, formErrors, false)"
            @input="() => validateSignupPassword(formData, formErrors, true)"
            v-model="formData.password"
          />
          <div class="text-danger" v-if="formErrors.password">
            {{ formErrors.password }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="confPassword"
            >Confirm Password<span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            id="confPassword"
            type="password"
            @blur="() => validateSignupConfPassword(formData, formErrors, true)"
            @input="() => validateSignupConfPassword(formData, formErrors, false)"
            v-model="formData.confPassword"
          />
          <div class="text-danger" v-if="formErrors.confPassword">
            {{ formErrors.confPassword }}
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-dark ms-auto"
            :class="{ 'mt-3 mb-2 w-100': isMobile }"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="!hideFooter"
      class="card-footer"
      :class="{ 'py-3': !isMobile, 'border-0 bg-transparent': isMobile }"
    >
      <div class="text-center">
        Already have an account?
        <router-link :to="{ name: routeNames.login }" class="text-secondary">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { routeNames } from '@/router'
import { validateEmail } from '@/utils/formValidation/validateEmail'
import { validateSignupConfPassword, validateSignupPassword } from '@/utils/formValidation/validatePassword'
import { validateUsername } from '@/utils/formValidation/validateUsername'

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
  hideFooter: {
    type: Boolean,
    default: false,
  },
})

const formData = defineModel('form-data', {
  default: () => ({
    username: '',
    email: '',
    password: '',
    confPassword: '',
  }),
})

const formErrors = defineModel('form-errors', {
  default: () => ({
    username: null,
    email: null,
    password: null,
    confPassword: null,
  }),
})

const emit = defineEmits(['submit-signup'])

const submitSignup = () => {
  validateUsername(formData, formErrors, true)
  validateEmail(formData, formErrors, true)
  validateSignupPassword(formData, formErrors, true)
  validateSignupConfPassword(formData, formErrors, true)

  if (
    !formErrors.value.username &&
    !formErrors.value.email &&
    !formErrors.value.password &&
    !formErrors.value.confPassword
  ) {
    emit('submit-signup', formData.value)
  }
}
</script>

<style scoped></style>
