<template>
    <div class="container">
        <h2 class="text-center mb-4">Youth Stories</h2>
        <div v-if="error" class="alert alert-danger">
            Error loading youth stories: {{ error.message }}
        </div>
        <SimpleDataTableTemplate v-else :data="data" :columns="columns" :collection-name="collectionName" />
    </div>
</template>

<script setup>
import SimpleDataTableTemplate from '@/components/SimpleDataTableTemplate.vue';
import { getCollectionList } from '@/services/service';
import { ref, onMounted } from 'vue';

const collectionName = 'youth-stories';

const data = ref([]);
const error = ref(null);

onMounted(async () => {
    try {
        data.value = await getCollectionList(collectionName);
    } catch (err) {
        error.value = err;
        console.error('Error loading users:', err);
    }
});

const columns = [
    { field: 'author', header: 'Author' },
    { field: 'title', header: 'Title' },
    { field: 'summary', header: 'Summary' },
    { field: 'content', header: 'Content' }
];
</script>