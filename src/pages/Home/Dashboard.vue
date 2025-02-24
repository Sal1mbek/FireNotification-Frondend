<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-5 py-5">
      <!-- Title -->
      <h1 class="text-3xl font-bold mb-6 text-gray-200">🔥 Fire Incidents</h1>

      <!-- Date Picker -->
      <div class="flex items-center space-x-4 mb-6">
        <label class="text-gray-300">Select Date:</label>
        <input
            type="date"
            v-model="selectedDate"
            @change="fetchFireData"
            class="bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>

      <!-- Fire Cards Grid -->
      <div v-if="!loading && paginatedFireData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="fire in paginatedFireData" :key="fire.time_fire" class="bg-gray-800 border border-gray-700 rounded-lg shadow-md">
          <div class="p-5">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-white">
              📍 {{ fire.address }}
            </h5>
            <p class="text-gray-400">
              <strong>Latitude:</strong> {{ fire.latitude }} <br />
              <strong>Longitude:</strong> {{ fire.longitude }} <br />
              <strong>Time:</strong> {{ new Date(fire.time_fire).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- No Fire Incidents Message -->
      <p v-else-if="!loading" class="text-gray-500 text-center py-10">
        🚫 No fire incidents found for this date.
      </p>

      <!-- Pagination Controls -->
      <div v-if="!loading && fireData.length > pageSize" class="flex justify-center mt-6 space-x-4">
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span class="text-lg font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFireData } from "@/services/fireService";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const selectedDate = ref(new Date().toISOString().split("T")[0]);
    const fireData = ref([]);
    const loading = ref(false);

    // Pagination state
    const currentPage = ref(1);
    const pageSize = 9; // Number of items per page

    const totalPages = computed(() => Math.ceil(fireData.value.length / pageSize));

    const paginatedFireData = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      return fireData.value.slice(start, start + pageSize);
    });

    const fetchFireData = async () => {
      loading.value = true;
      try {
        const data = await getFireData(selectedDate.value);
        fireData.value = data;
        currentPage.value = 1; // Reset to first page when fetching new data
      } catch (error) {
        console.error("Failed to fetch fire data", error);
      } finally {
        loading.value = false;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    onMounted(fetchFireData);

    return {
      selectedDate,
      fireData,
      loading,
      currentPage,
      pageSize,
      totalPages,
      paginatedFireData,
      fetchFireData,
      nextPage,
      prevPage
    };
  }
};
</script>

<style scoped>
.container {
  font-family: "Inter", sans-serif;
}
</style>
