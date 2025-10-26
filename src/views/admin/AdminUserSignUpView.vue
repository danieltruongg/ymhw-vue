<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center h-100">
      <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
        <h2 class="text-center mb-4">Regular User Creation</h2>
        <div class="d-none d-md-block">
          <SignupForm
            :isMobile="false"
            :hideFooter="true"
            v-model:form-data="data"
            v-model:form-errors="errors"
            @submit-signup="submitSignup"
          />
        </div>
        <div class="d-md-none">
          <SignupForm
            :isMobile="true"
            :hideFooter="true"
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
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { createUserProfile } from '@/services/userService'

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
    const adminUserCreated = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    )
    const newUser = adminUserCreated.user

    console.log('New admin user created')
    await updateProfile(newUser, {
          displayName: formData.username
    });

    await createUserProfile(newUser.uid, 'user', {
      email: formData.email,
      username: formData.username,
    })

    await signOut(auth)
    router.push({ name: routeNames.login })
    alert('User account created successfully. Please log in again.')
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Error creating user account:', errorCode, errorMessage)
    if (errorCode === 'auth/email-already-in-use') {
      errors.value.email = 'Email already in use. Please use a different email.'
    } else {
      errors.value.email = 'An error occurred during sign up. Please try again.'
    }
  }
}
</script>

<style scoped></style>
