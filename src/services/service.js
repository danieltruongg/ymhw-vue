import { db } from '@/firebase/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'

export const getCollectionList = async (collectionName) => {
  try {
    const data = await getDocs(collection(db, collectionName))
    const documents = []
    data.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() })
    })

    console.log(`Retrieved ${documents.length} documents from ${collectionName}`)
    return documents
  } catch (error) {
    console.error('Error fetching documents:', error)
    return []
  }
}

export const addDocumentToCollection = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), data)
    console.log('Document added successfully to', collectionName)
  } catch (error) {
    console.error('Error adding document:', error)
  }
}
