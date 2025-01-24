<template>
  <nav class="bg-gray-500 shadow-md">
    <div class="container mx-auto px-5 py-2 flex items-center">
      <div class="text-black text-lg font-bold">
        FireAlert System
      </div>
      <ul class="flex space-x-4">
        <li>
          <router-link
              to="/"
              class="text-black hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
              active-class="bg-blue-700"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
              to="/login"
              class="text-black hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
              active-class="bg-blue-700"
          >
            Login
          </router-link>
        </li>
        <li>
          <router-link
              to="/signup"
              class="text-black hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
              active-class="bg-blue-700"
          >
            Sign Up
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
nav {
  font-family: 'Inter', sans-serif;
}
</style>