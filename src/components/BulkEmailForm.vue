<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="bulkEmailModalLabel"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="bulkEmailModalLabel">Send Email to Selected Users</h5>
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            data-bs-dismiss="modal"
            aria-label="Close email form"
          ></button>
        </div>

        <div class="modal-body p-4">
          <form @submit.prevent="sendEmail" aria-label="Bulk email form">
            <fieldset class="mb-3">
              <legend class="form-label h6">Recipients:</legend>
              <div class="border rounded p-3 bg-light" role="list" :aria-label="`${users.length} selected recipients`">
                <div v-for="user in users" :key="user.uid" class="mb-1" role="listitem">
                  <strong>{{ user.username }}</strong> ({{ user.email }})
                </div>
              </div>
            </fieldset>

            <div class="mb-3">
              <label for="emailSubject" class="form-label">
                Subject: <span class="text-danger" aria-label="required">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="emailSubject"
                v-model="emailForm.subject"
                required
                aria-required="true"
              />
            </div>

            <div class="mb-3">
              <label for="emailContent" class="form-label">
                Message: <span class="text-danger" aria-label="required">*</span>
              </label>
              <textarea
                class="form-control"
                id="emailContent"
                rows="6"
                v-model="emailForm.content"
                required
                aria-required="true"
                aria-describedby="emailContentHelp"
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="emailAttachment" class="form-label">Attachment (anything relevant to story) (Optional):</label>
              <input
                type="file"
                class="form-control"
                id="emailAttachment"
                @change="handleFileChange"
                aria-describedby="attachmentHelp"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer bg-light">
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <button type="button" class="btn btn-secondary flex-fill" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              @click="sendEmail"
              class="btn btn-dark flex-fill"
              :disabled="!isFormValid"
              data-bs-dismiss="modal"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  selectedUsers: {
    type: Array,
    required: true,
  },
})

const users = ref([])
const emailForm = ref({
  subject: '',
  content: '',
  attachment: null,
})

// Watch for changes in selectedUsers prop
watch(() => props.selectedUsers, (newSelectedUsers) => {
  users.value = newSelectedUsers
}, { immediate: true })

const isFormValid = computed(() => {
  return (
    emailForm.value.subject.trim() !== '' &&
    emailForm.value.content.trim() !== '' &&
    users.value.length > 0
  )
})

const emit = defineEmits(['send-email'])

const sendEmail = () => {
  if (isFormValid.value) {
    emit('send-email', emailForm.value)
    resetForm()
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  emailForm.value.attachment = file
}

const resetForm = () => {
  emailForm.value = {
    subject: '',
    content: '',
    attachment: null,
  }
}
</script>

<style scoped></style>
