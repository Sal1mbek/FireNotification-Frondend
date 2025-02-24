<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
              v-model="form.email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
          />
        </div>

        <div class="mb-6 relative">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
              v-model="form.password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              required
          />
          <!-- Password Toggle Icon -->
          <span @click="showPassword = !showPassword" class="absolute right-3 top-9 cursor-pointer text-gray-600">
            {{ showPassword ? '🙈' : '👁' }}
          </span>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <div class="flex items-center justify-between">
          <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
              :disabled="loading"
          >
            <span v-if="loading" class="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            {{ loading ? "Logging in..." : "Login" }}
          </button>

          <!-- Signup Link -->
          <router-link to="/signup" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
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
