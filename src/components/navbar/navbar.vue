<template>
  <div class="w-full mx-auto" >
    <nav class="bg-gray-900 shadow-md">
      <div class="mx-auto px-5 py-3 flex justify-between items-center">
        <!-- Logo -->
        <div class="text-white text-xl font-bold tracking-wide">
          🔥 FireAlert System
        </div>

        <!-- Desktop Navigation -->
        <ul class="md:flex space-x-6 items-center">
          <li v-if="!isAuthenticated">
            <router-link to="/login"
              class="underline text-gray-300 hover:text-white px-4 py-2 rounded transition duration-200"
              active-class="text-blue-400">
              Login
            </router-link>
          </li>

          <li v-if="isAuthenticated">
            <button @click="logout" class="text-gray-300 hover:text-red-400 px-4 py-2 rounded transition duration-200">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <div id="leftNav" class="flex flex-col fixed w-50 h-screen z-[9999] gap-4 p-3 bg-gray-900 text-white rounded-br-lg" v-on:mouseenter="toggleMenuLeft"
      v-on:mouseleave="toggleMenuLeft">
      <div @click="navigateTo('/')" class="flex items-center space-x-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
          <path
            d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path
            d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
        <div v-show="isMenuOpen">Home</div>
      </div>
      <div v-if="isAuthenticated" @click="navigateTo('/profile')" class="flex items-center space-x-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
          <path fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clip-rule="evenodd" />
        </svg>
        <div v-show="isMenuOpen">Profile</div>
      </div>
      <div @click="navigateTo('/dashboard')" class="flex items-center space-x-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
          <path
            d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
        </svg>
        <div v-show="isMenuOpen">Fire Incidents</div>
      </div>
      <div @click="navigateTo('/report')" class="flex items-center space-x-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
          <path fill-rule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clip-rule="evenodd" />
        </svg>
        <div v-show="isMenuOpen">Report</div>
      </div>
      <div v-if="isAuthenticated && authStore.userRole === 'admin'" @click="navigateTo('/adminPage')" class="flex items-center space-x-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <div v-show="isMenuOpen">Admin Page</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore..js';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const menuOpen = ref(false);
const isMenuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleMenuLeft = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  authStore.logout();
  router.push('/login');
  menuOpen.value = false;
};

const navigateTo = (path) => {
  router.push(path);
  menuOpen.value = false;
};

window.addEventListener('scroll', () => {
  const nav = document.getElementById('leftNav');

  if (!nav) return;

  if (scrollY < 52) {
    nav.style.top = (50 - scrollY) + 'px';
  }else {
    nav.style.top = '0px';
  }
});
</script>

<style scoped>
nav {
  font-family: 'Inter', sans-serif;
}
</style>