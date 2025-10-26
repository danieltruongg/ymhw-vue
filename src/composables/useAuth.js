import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { computed, ref } from 'vue'
import { routeNames } from '@/router'
import { getUserProfile } from '@/services/userService'

export const userSession = ref(null)
export const userData = ref(null)
export const isLoading = ref(true)

export const isLoggedIn = computed(() => !!userSession.value)
export const isAdmin = computed(() => userData.value?.role === 'admin')

// Initialise user auth
export const initializeAuth = () => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(auth, async (currentUser) => {
      isLoading.value = true

      if (currentUser) {
        userSession.value = currentUser

        try {
          // Fetching user data from Firestore
          const data = await getUserProfile(currentUser.uid)
          userData.value = data
        } catch (error) {
          console.error('Error fetching user profile:', error)
          userData.value = null
        }
      } else {
        userSession.value = null
        userData.value = null
      }

      isLoading.value = false
      resolve(removeListener)
    })
  })
}

export const checkAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      console.log('User is signed in:', user) // TODO: REMOVE THE USER INFORMATION CONSOLE LOG
    } else {
      isLoggedIn.value = false
      console.log('No user is signed in.')
    }
  })
}

export const handleSignOut = (router) => {
  signOut(auth)
    .then(() => {
      console.log('User signed out')
      router.push({ name: routeNames.home })
    })
    .catch((error) => {
      console.error('Error signing out:', error)
    })
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}
