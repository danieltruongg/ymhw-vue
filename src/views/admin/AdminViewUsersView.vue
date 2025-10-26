<template>
    <div class="container">
        <h2 class="text-center mb-4">Registered Users</h2>
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">User Statistics</h5>
                <div class="row text-center">
                    <div class="col-md-4">
                        <h3 class="text-dark">{{ totalUsers }}</h3>
                        <p class="mb-0">Total Users</p>
                    </div>
                    <div class="col-md-4">
                        <h3 class="text-secondary">{{ adminUsers }}</h3>
                        <p class="mb-0">Admins</p>
                    </div>
                    <div class="col-md-4">
                        <h3 class="text-muted">{{ regularUsers }}</h3>
                        <p class="mb-0">Regular Users</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="error" class="alert alert-danger">
            Error loading users: {{ error.message }}
        </div>
        <SimpleDataTableTemplate v-else 
            :data="data" 
            :columns="columns" 
            :collection-name="collectionName"
            :bulk-email="{ useBulkEmail: true, modalFormId: modalId }"
            :callback-function="handleSelectedUsers" />

        <BulkEmailForm :modalId="modalId" :selectedUsers="selectedUsers" @send-email="sendEmail" />
    </div>
</template>

<script setup>
import BulkEmailForm from '@/components/BulkEmailForm.vue';
import SimpleDataTableTemplate from '@/components/SimpleDataTableTemplate.vue';
import { getCollectionList } from '@/services/service';
import { fileToBase64 } from '@/utils/convertFiletoBase64';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const collectionName = 'users';
const modalId = 'bulkEmailModal';

const data = ref([]);
const error = ref(null);

const totalUsers = ref(0);
const adminUsers = ref(0);
const regularUsers = ref(0);

const selectedUsers = ref([]);

const columns = [
    { field: 'uid', header: 'User ID' },
    { field: 'username', header: 'Username' },
    { field: 'role', header: 'Role' },
    { field: 'email', header: 'Email' }
];

const countAdminUsers = async () => {
    try {
        const response = await axios.get("https://sumusersbyrole-yxadv4kvuq-uc.a.run.app", {
            params: { role: 'admin' }
        });
        return response.data;
    } catch (error) {
        console.error('Error counting admin users:', error);
    }
}

const handleSelectedUsers = (selectedUsersData) => {
    selectedUsers.value = selectedUsersData;
};

const sendEmail = async (emailData) => {
    try {
        let attachmentData;
        if (emailData.attachment) {
            const attachContent = await fileToBase64(emailData.attachment)
            attachmentData = {
                name: emailData.attachment.name,
                type: emailData.attachment.type,
            size: emailData.attachment.size,
            content: attachContent
            }
        } else {
            attachmentData = null;
        }
        
        await axios.post("https://sendbulkemail-yxadv4kvuq-uc.a.run.app", {
          recipientEmails: selectedUsers.value.map(user => user.email),
          subject: emailData.subject,
          content: emailData.content,
          attachment: attachmentData
        });

        alert('Emails sent successfully!');
    } catch (error) {
        console.error('Error sending bulk email:', error);
        alert('Failed to send emails. Please try again.');
    }
};

onMounted(async () => {
    try {
        data.value = await getCollectionList(collectionName);
        totalUsers.value = data.value.length;
        adminUsers.value = await countAdminUsers();
        regularUsers.value = totalUsers.value - adminUsers.value;
    } catch (err) {
        error.value = err;
        console.error('Error loading users:', err);
    }
});
</script>