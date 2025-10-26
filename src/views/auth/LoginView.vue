<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center h-100">
      <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
        <GoogleAuthButton />
        <div class="position-relative my-4">
          <hr class="border-secondary-subtle">
          <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
            OR
          </span>
        </div>
        <div class="d-none d-md-block">
          <LoginForm
            :isMobile="false"
            :hideFooter="false"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-login="submitLogin"
          />
        </div>
        <div class="d-md-none">
          <LoginForm
            :isMobile="true"
            :hideFooter="false"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-login="submitLogin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/Authentication/LoginForm.vue'
import { routeNames } from '@/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/firebase'
import GoogleAuthButton from '@/components/Authentication/GoogleAuthButton.vue'

const router = useRouter()

const data = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: null,
  password: null,
})

const submitLogin = (formData) => {
  signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then(() => {
      console.log('User logged in')
      router.push({ name: routeNames.home })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Error logging in:', errorCode, errorMessage)
      if (errorCode === 'auth/invalid-credential') {
        errors.value.email = 'Invalid email or password'
      } else {
        errors.value.email = 'Login failed. Please try again.'
      }
    })
}
</script>

<style scoped></style>
