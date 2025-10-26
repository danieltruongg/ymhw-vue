<template>
  <div class="container py-4">
    <div class="row g-3 mb-4">
      <div class="col-md-6 col-lg-3">
        <button class="btn btn-primary w-100" @click="handleGet">
          <i class="bi bi-download me-2"></i>Get
        </button>
      </div>
      <div class="col-md-6 col-lg-3">
        <button class="btn btn-success w-100" @click="handleAdd">
          <i class="bi bi-plus-circle me-2"></i>Add
        </button>
      </div>
      <div class="col-md-6 col-lg-3">
        <button class="btn btn-warning w-100" @click="handleUpdate">
          <i class="bi bi-pencil me-2"></i>Update
        </button>
      </div>
      <div class="col-md-6 col-lg-3">
        <button class="btn btn-danger w-100" @click="handleDelete">
          <i class="bi bi-trash me-2"></i>Delete
        </button>
      </div>
    </div>
    
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="documentId" class="form-label">Document ID (for Update/Delete)</label>
            <input 
              type="text" 
              class="form-control" 
              id="documentId"
              v-model="documentId"
              placeholder="Enter document ID"
            />
          </div>
          <div class="col-md-6">
            <label for="documentData" class="form-label">Document Data (JSON for Add/Update)</label>
            <textarea 
              class="form-control" 
              id="documentData"
              v-model="documentData"
              rows="3"
              placeholder='{"name": "example", "value": "data"}'
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

  <pre v-if="showResult">{{ jsonResult }}</pre>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const collection = "test-api"
const jsonResult = ref(null)
const showResult = ref(false)
const documentId = ref('')
const documentData = ref('')

const handleGet = async () => {
  showResult.value = true
  jsonResult.value = await getCollectionListAPI()
}

const handleAdd = async () => {
  jsonResult.value = null
  showResult.value = true
  try {
    if (!documentData.value) {
      alert('Please enter document data')
      return
    }
    const data = JSON.parse(documentData.value)
    jsonResult.value = await createDocumentAPI(data)
    alert('Document created successfully')
  } catch (err) {
    alert('Error creating document: ' + err.message)
  }
}

const handleUpdate = async () => {
  jsonResult.value = null
  showResult.value = true
  try {
    if (!documentId.value || !documentData.value) {
      alert('Please enter both document ID and data')
      return
    }
    const data = JSON.parse(documentData.value)
    jsonResult.value = await updateDocumentAPI(documentId.value, data)
    alert('Document updated successfully')
  } catch (err) {
    alert('Error updating document: ' + err.message)
  }
}

const handleDelete = async () => {
  jsonResult.value = null
  showResult.value = true
  try {
    if (!documentId.value) {
      alert('Please enter document ID')
      return
    }
    if (confirm('Are you sure you want to delete this document?')) {
      jsonResult.value = await deleteDocumentAPI(documentId.value)
      alert('Document deleted successfully')
    }
  } catch (err) {
    alert('Error deleting document: ' + err.message)
  }
}

const getCollectionListAPI = async () => {
  try {
    const res = await axios.get('https://getcollectionlistapi-yxadv4kvuq-uc.a.run.app', {
      params: { collectionName: collection }
    })
    return res.data
  } catch (err) {
    console.log('Error fetching collection list:', err)
    throw err
  }
}

const createDocumentAPI = async (documentData) => {
  try {
    const res = await axios.post('https://adddocumenttocollectionapi-yxadv4kvuq-uc.a.run.app', {
      collectionName: collection,
      data: documentData
    })
    return res.data
  } catch (err) {
    console.log('Error creating document:', err)
    throw err
  }
}

const updateDocumentAPI = async (documentId, updatedData) => {
  try {
    const res = await axios.put('https://updatedocumentincollectionapi-yxadv4kvuq-uc.a.run.app', {
      collectionName: collection,
      documentId: documentId,
      data: updatedData
    })
    return res.data
  } catch (err) {
    console.log('Error updating document:', err)
    throw err
  }
}

const deleteDocumentAPI = async (documentId) => {
  try {
    const res = await axios.delete('https://deletedocumentfromcollectionapi-yxadv4kvuq-uc.a.run.app', {
      data: {
        collectionName: collection,
        documentId: documentId
      }
    })
    return res.data
  } catch (err) {
    console.log('Error deleting document:', err)
    throw err
  }
}
</script>
