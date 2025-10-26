<template>
<div class="container my-4">
  <div class="d-flex flex-row justify-content-center h-100">
    <div class="col-xxl-6 col-xl-7 col-lg-7 col-md-9 col-sm-11">
      <div class="card">
        <div class="card-body">
          <h1 class="card-title fs-4 fw-bold mb-4">Update Username</h1>
          <form @submit.prevent="handleUpdate">
            <div class="mb-3">
              <label class="form-label" for="username">New Username</label>
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
              <div class="form-text">
                Choose a unique username for your account
              </div>
            </div>
            
            <div class="d-flex gap-2 justify-content-end">
              <button 
                type="button" 
                class="btn btn-secondary"
                @click="handleCancel"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="btn btn-dark"
                :disabled="!formData.username.trim()"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { validateUsername } from '@/utils/formValidation/validateUsername'
import { auth } from '@/firebase/firebase'
import { updateProfile } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { updateUserProfile } from '@/services/userService'
import { routeNames } from '@/router'

const router = useRouter()
const currentUser = ref(null)

const formData = ref({
  username: '',
})
const formErrors = ref({
  username: null,
})

onMounted(() => {
  currentUser.value = auth.currentUser
  if (currentUser.value && currentUser.value.displayName) {
    formData.value.username = currentUser.value.displayName
  }
})

const handleUpdate = async () => {
  validateUsername(formData, formErrors, true)
  if (!formErrors.value.username && currentUser.value) {
    try {
      await updateProfile(currentUser.value, {
        displayName: formData.value.username
      })

      await updateUserProfile(currentUser.value.uid, {
        username: formData.value.username
      })
      router.push({ name: routeNames.home });
    } catch (error) {
      console.error('Error updating username:', error)
      formErrors.value.username = 'Failed to update username. Please try again.'
    }
  }
}

const handleCancel = () => {
  formData.value.username = ''
  router.back()
}
</script>