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
          <SignupForm
            :isMobile="false"
            :hideFooter="false"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-signup="submitSignup"
          />
        </div>
        <div class="d-md-none">
          <SignupForm
            :isMobile="true"
            :hideFooter="false"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-signup="submitSignup"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SignupForm from '@/components/Authentication/SignupForm.vue'
import { routeNames } from '@/router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { createUserProfile } from '@/services/userService'
import GoogleAuthButton from '@/components/Authentication/GoogleAuthButton.vue'

const router = useRouter()

const data = ref({
  username: '',
  email: '',
  password: '',
  confPassword: '',
})

const errors = ref({
  username: null,
  email: null,
  password: null,
  confPassword: null,
})

const submitSignup = async (formData) => {
  try {
    const userCreated = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    const user = userCreated.user

    console.log('User signed up')
    await updateProfile(user, {displayName: formData.username});

    await createUserProfile(user.uid, 'user', {
        username: formData.username,
        email: formData.email,
    })

    router.push({ name: routeNames.home })
  
  } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Error signing up:', errorCode, errorMessage)
      if (errorCode === 'auth/email-already-in-use') {
        errors.value.email = 'Email already in use. Please use a different email.'
      } else {
        errors.value.email = 'An error occurred during sign up. Please try again.'
      }
    }
}
</script>

<style scoped></style>
