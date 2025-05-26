<template>
  <div class="min-h-screen bg-white text-white pl-[52px] md:pr-[52px] pt-10">
    <div class="container mx-auto md:px-5 pb-5">
      <!-- Title -->
      <div class="text-center mb-8 flex justify-between px-2">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">🔥 Fire Incidents</h1>

      <!-- Date Picker -->
        <div class="flex items-center space-x-3 mb-6 text-gray-800">
          <label class=" text-gray-800">Select Date:</label>
          <input
              type="date"
              v-model="selectedDate"
              @change="fetchFireData"
              class="border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
      <!-- Fire Cards Grid -->
      <MapForFire :fireCoordinate="fireCoordinate.value" v-if="!loading && totalFireCount.length > 0" :data="totalFireCount"/>
      <div v-if="!loading && currentFirePage.length > 0" class="grid pt-6 px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="fire in currentFirePage" :key="`${fire.address + fire.time_fire + fire.latitude}`" class="border border-gray-700 rounded-lg shadow-md">
          <div @click="navigateToFire([fire.latitude, fire.longitude])" class="p-1 text-black justify-between flex flex-col h-full cursor-pointer">
            <p class="mb-2 text-md font-bold tracking-tight">
              📍 {{ fire.address }}
            </p>
            <p class="text-sm text-gray-600">
              <strong>Time:</strong> {{ new Date(fire.time_fire).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- No Fire Incidents Message -->
      <p v-else-if="!loading" class="text-gray-800 text-center py-10">
        🚫 No fire incidents found for this date.
      </p>

      <!-- Pagination Controls -->
      <div v-if="!loading && fireData.length > 1" class="flex justify-center items-center mt-6 space-x-4">
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 border text-gray-800 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span class="text-md text-gray-800 font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-gray-800 border rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getFireData } from "@/services/fireService";
import { ref, computed, onMounted } from "vue";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapForFire from "@/components/Dashboard/MapForFire.vue";
    const selectedDate = ref(new Date().toISOString().split("T")[0]);
    const fireData = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const fireCoordinate = ref([]);
    function navigateToFire(lat, lng) {
  fireCoordinate.value = [lat, lng];
}
    const totalPages = computed(() => Math.ceil(fireData.value.length));
    const currentFirePage = computed(() => fireData.value[currentPage.value - 1] || []);
    const totalFireCount = computed(() => fireData.value || []);
    const fetchFireData = async () => {
      fireData.value = [];
      loading.value = true;
      try {
        const data = await getFireData(selectedDate.value);
        fireData.value = data;
        console.log("Fetched fire data:", fireData);
        
        currentPage.value = 1;
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
</script>

<style scoped>
.container {
  font-family: "Inter", sans-serif;
}
</style>
