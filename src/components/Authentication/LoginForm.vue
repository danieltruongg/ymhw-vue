<template>
  <div class="card" :class="{ 'border-0': isMobile }">
    <div class="card-body" :class="{ 'p-5': !isMobile, 'pt-5 px-5': isMobile }">
      <h1 class="card-title fs-4 fw-bold mb-4" :class="{ 'text-center': isMobile }">Login</h1>
      <form @submit.prevent="submitLogin" aria-label="User login form">
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <input
            class="form-control"
            id="email"
            type="email"
            @blur="validateEmail(formData, formErrors, true)"
            @input="validateEmail(formData, formErrors, false)"
            v-model="formData.email"
            aria-required="true"
            :aria-invalid="formErrors.email ? 'true' : 'false'"
            :aria-describedby="formErrors.email ? 'email-error' : undefined"
          />
          <div 
            v-if="formErrors.email" 
            class="text-danger" 
            id="email-error"
            role="alert"
            aria-live="polite"
          >
            {{ formErrors.email }}
          </div>
        </div>
        <div class="mb-3">
          <div class="d-flex d-none d-md-block mb-2 w-100">
            <a href="#" class="float-end text-secondary">Forgot password?</a>
          </div>
          <label class="form-label" for="password">
            Password
          </label>
          <input
            class="form-control"
            id="password"
            type="password"
            @blur="validateLoginPassword(formData, formErrors, true)"
            @input="validateLoginPassword(formData, formErrors, false)"
            v-model="formData.password"
            aria-required="true"
            :aria-invalid="formErrors.password ? 'true' : 'false'"
            :aria-describedby="formErrors.password ? 'password-error' : undefined"
          />
          <div 
            v-if="formErrors.password" 
            class="text-danger" 
            id="password-error"
            role="alert"
            aria-live="polite"
          >
            {{ formErrors.password }}
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-dark ms-auto"
            :class="{ 'mt-3 mb-2 w-100': isMobile }"
            type="submit"
          >
            Login
          </button>
        </div>
        <div class="d-flex d-md-none justify-content-center mb-2 w-100">
          <a href="#" class="float-end text-secondary">Forgot password?</a>
        </div>
      </form>
    </div>
    <div
      v-if="!hideFooter"
      class="card-footer"
      :class="{ 'py-3': !isMobile, 'border-0 bg-transparent': isMobile }"
    >
      <div class="text-center">
        Don't have an account?
        <router-link :to="{ name: routeNames.signup }" class="text-secondary">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { routeNames } from '@/router'
import { validateEmail } from '@/utils/formValidation/validateEmail'
import { validateLoginPassword } from '@/utils/formValidation/validatePassword'

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
    email: '',
    password: '',
  }),
})

const formErrors = defineModel('form-errors', {
  default: () => ({
    email: null,
    password: null,
  }),
})

const emit = defineEmits(['submit-login'])

const submitLogin = () => {
  validateEmail(formData, formErrors, true)
  validateLoginPassword(formData, formErrors, true)

  if (!formErrors.value.email && !formErrors.value.password) {
    emit('submit-login', formData.value)
  }
}
</script>

<style scoped></style>
