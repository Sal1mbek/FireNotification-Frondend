<template>
  <div class="min-h-screen flex items-center justify-center" style="
  background-image: url('https://stroy-zashita.ru/sites/default/files/tyshenia-poshara-1.jpg');
   background-size: cover;
    background-position: center;">
    <div class="w-full max-w-md bg-white shadow-md rounded-[15px] px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="form.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email" type="email" placeholder="Enter your email" required />
        </div>

        <div class="mb-6 relative">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="form.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            id="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" required />
          <!-- Password Toggle Icon -->
          <span @click="showPassword = !showPassword" class="absolute right-3 top-9 cursor-pointer text-gray-600">
            <svg v-show="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <svg v-show="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </span>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit" :disabled="loading">
            <span v-if="loading"
              class="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            {{ loading ? "Logging in..." : "Login" }}
          </button>

          <!-- Signup Link -->
          <router-link to="/signup"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Need an account? Sign Up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/authService";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      errorMessage: "",
      showPassword: false, // Toggle password visibility
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await login(this.form.email, this.form.password);

        // Store token (Assuming API response has 'token')
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        if(response.userId){
          localStorage.setItem("userId", response.userId);
        } else {
          throw new Error("User ID not found in response.");
        }

        this.$router.push("/"); // Redirect after login
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Invalid email or password.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
