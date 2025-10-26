<template>
  <div class="d-grid">
    <button 
      type="button" 
      class="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 py-1 py-md-2"
      @click="googleAuthSignIn"
    >
      <i class="bi bi-google"></i>
      <span class="fw-medium">Continue with Google</span>
    </button>
  </div>
</template>

<script setup>
import { auth } from '@/firebase/firebase';
import { routeNames } from '@/router';
import { checkUserProfileExists, createUserProfile } from '@/services/userService';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const props = defineProps({
  userRole: {
    type: String,
    default: 'user',
  }
})

const router = useRouter();

const provider = new GoogleAuthProvider()

const googleAuthSignIn = async () => {
    signInWithPopup(auth, provider)
    .then(async (result) => {
        const user = result.user

        if (!(await checkUserProfileExists(user.uid))) {
          await createUserProfile(user.uid, props.userRole, {
            username: user.displayName,
            email: user.email,
          })
          router.push({ name: routeNames.settings.updateUsername });
        } else {
          router.push({ name: routeNames.home });
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error ${errorCode}: ${errorMessage}`);
    })
}
</script>