<template>
  <nav class="bg-gray-900 shadow-md">
    <div class="container mx-auto px-5 py-3 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-white text-xl font-bold tracking-wide">
        🔥 FireAlert System
      </div>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex space-x-6 items-center">
        <li>
          <router-link
              to="/"
              class="text-gray-300 hover:text-white px-4 py-2 rounded transition duration-200"
              active-class="text-blue-400"
          >
            Home
          </router-link>
        </li>

        <li v-if="isAuthenticated">
          <router-link
              to="/dashboard"
              class="text-gray-300 hover:text-white px-4 py-2 rounded transition duration-200"
              active-class="text-blue-400"
          >
            Fire Cards
          </router-link>
        </li>

        <li v-if="!isAuthenticated">
          <router-link
              to="/login"
              class="text-gray-300 hover:text-white px-4 py-2 rounded transition duration-200"
              active-class="text-blue-400"
          >
            Login
          </router-link>
        </li>

        <li v-if="isAuthenticated">
          <button
              @click="logout"
              class="text-gray-300 hover:text-red-400 px-4 py-2 rounded transition duration-200"
          >
            Logout
          </button>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
          @click="toggleMenu"
          class="md:hidden text-white focus:outline-none"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="md:hidden bg-gray-800 py-3 px-5">
      <ul class="space-y-3">
        <li>
          <router-link
              to="/"
              class="block text-gray-300 hover:text-white py-2"
              active-class="text-blue-400"
              @click="toggleMenu"
          >
            Home
          </router-link>
        </li>

        <li v-if="isAuthenticated">
          <router-link
              to="/dashboard"
              class="block text-gray-300 hover:text-white py-2"
              active-class="text-blue-400"
              @click="toggleMenu"
          >
            Fire Cards
          </router-link>
        </li>

        <li v-if="!isAuthenticated">
          <router-link
              to="/login"
              class="block text-gray-300 hover:text-white py-2"
              active-class="text-blue-400"
              @click="toggleMenu"
          >
            Login
          </router-link>
        </li>

        <li v-if="isAuthenticated">
          <button
              @click="logout"
              class="block text-gray-300 hover:text-red-400 py-2 w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore..js';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const logout = () => {
  authStore.logout();
  router.push('/login');
  menuOpen.value = false;
};
</script>

<style scoped>
nav {
  font-family: 'Inter', sans-serif;
}
</style>