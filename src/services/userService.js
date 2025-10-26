import settings from '@/assets/json/settings.json'
import { db } from '@/firebase/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export const createUserProfile = async (uid, role, data = {}) => {
  try {
    await setDoc(doc(db, settings.firestore.users, uid), {
      uid: uid,
      role: role,
      ...data,
    })
    console.log('User profile created successfully')
  } catch (error) {
    console.error('Error creating user profile:', error)
    throw error
  }
}

export const getUserProfile = async (uid) => {
  try {
    const docPath = doc(db, settings.firestore.users, uid)
    const docData = await getDoc(docPath)

    if (docData.exists()) {
      return docData.data()
    } else {
      console.log('No user profile found')
      return null
    }
  } catch (error) {
    console.error('Error getting user profile:', error)
    throw error
  }
}

export const checkUserProfileExists = async (uid) => {
  try {
    const docPath = doc(db, settings.firestore.users, uid)
    const docData = await getDoc(docPath)

    return docData.exists()
  } catch (error) {
    console.error('Error checking user profile existence:', error)
    throw error
  }
}

export const updateUserProfile = async (uid, newData) => {
  try {
    const docPath = doc(db, settings.firestore.users, uid)
    await updateDoc(docPath, {
      ...newData,
    })
    console.log('User profile updated successfully')
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}
