<template>
  <DataTable
    ref="dt"
    :value="data"
    paginator 
    :rows="10"
    v-model:selection="selectedItems"
    v-model:filters="filters"
    filterDisplay="row"
    :globalFilterFields="columns.map(col => col.field)"
    :removableSort="true"
    sortMode="multiple"
    role="table"
    aria-label="Data table with filtering and pagination"
  >
      <template #header>
        <div class="mb-3 d-flex gap-2 align-items-end">
            <div class="flex-grow-1">
                <input 
                    id="globalSearch"
                    type="text" 
                    class="form-control" 
                    v-model="filters['global'].value" 
                    placeholder="Search all data..."
                    aria-label="global search"
                    aria-describedby="globalSearch-help"
                />
            </div>
            <div class="d-flex gap-2" role="toolbar" aria-label="Table actions">
              <button 
                class="btn btn-danger"
                :disabled="!hasSelectedItems"
                @click="deletedSelectedItems"
                title="Delete Selected Items"
                :aria-label="`Delete ${selectedItems.length} selected items`"
              >
                <i class="bi bi-trash me-1" aria-hidden="true"></i>
                Delete
              </button>
              <button 
                v-if="props.bulkEmail.useBulkEmail && hasSelectedItems" 
                class="btn btn-info"
                data-bs-toggle="modal" 
                :data-bs-target="`#${props.bulkEmail.modalFormId}`"
                @click="handleBulkEmail"
                :aria-label="`Send bulk email to ${selectedItems.length} selected recipients`">
                  <i class="bi bi-envelope me-1" aria-hidden="true"></i>
                  Send Bulk Email
              </button>
              <button 
                class="btn btn-success" 
                @click="exportCSV($event)"
                aria-label="Export table data as CSV file"
              >
                  <i class="bi bi-download me-1" aria-hidden="true"></i>
                  Export CSV
              </button>
              <button 
                class="btn btn-primary" 
                @click="exportJSON($event)"
                aria-label="Export table data as JSON file"
              >
                  <i class="bi bi-file-earmark-code me-1" aria-hidden="true"></i>
                  Export JSON
              </button>
            </div>
        </div>
      </template>
      <Column 
        selectionMode="multiple" 
        headerStyle="width: 3em" 
        exportable="false"
      />
      <Column 
          v-for="col of props.columns" 
          :key="col.field" 
          :field="col.field" 
          :header="col.header"
          :sortable="true"
        >
        <template #body="{ data }">
            {{ data[col.field] }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <input 
                id="{{ col.field }}_filter"
                type="text" 
                class="form-control" 
                v-model="filterModel.value" 
                placeholder="Search by" 
                @input="filterCallback()"
            />
        </template>
      </Column>
      <Column headerStyle="width: 3rem">
        
      </Column>
    </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  collectionName: {
    type: String,
    default: '',
  },
  bulkEmail: {
    type: Object,
    default: () => ({
      useBulkEmail: false,
      modalFormId: 'bulkEmailModal'
    })
  },
  callbackFunction: {
    type: Function,
    required: false
  }
});

const dt = ref(null);
const data = ref(props.data);
const selectedItems = ref([]);
const filters = ref({});

const hasSelectedItems = computed(() => selectedItems.value.length > 0);

const router = useRouter();

const initializeFilters = () => {
  const newFilters = { global: { value: null, matchMode: "contains" } };

  props.columns.forEach(col => {
    newFilters[col.field] = { value: null, matchMode: "contains" };
  });

  filters.value = newFilters;
}

const deletedSelectedItems = async () => {
  const confirmed = confirm(`Are you sure you want to delete ${selectedItems.value.length} selected item(s)?`);
  if (confirmed) {
    const items = selectedItems.value
    if (props.collectionName) {
      for (const item of items) {
        const id = item.id
        try {
          await axios.delete('https://deletedocumentfromcollectionapi-yxadv4kvuq-uc.a.run.app', {
            data: {
              collectionName: props.collectionName,
              documentId: id
            }
          })
        } catch (err) {
          console.log('Error deleting document:', err)
          throw err
        }
      }
      remountPage()
    } else {
      for (const item of items) {
        data.value = data.value.filter(i => i !== item);
      }
    }
  }
}

const exportCSV = () => {
  dt.value.exportCSV();
}

const exportJSON = () => {
  const jsonData = JSON.stringify(props.data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data-export.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const handleBulkEmail = () => {
  if (props.callbackFunction) {
    const selectedRows = selectedItems.value;
    props.callbackFunction(selectedRows);
  }
}

const remountPage = () => {
  router.go(0)
}

watch(() => props.data, (newData) => {
  data.value = newData;
}, { immediate: true });

watch(() => props.columns, (newColumns) => {
  if (newColumns && newColumns.length > 0) {
    initializeFilters();
  }
}, { immediate: true });

</script>