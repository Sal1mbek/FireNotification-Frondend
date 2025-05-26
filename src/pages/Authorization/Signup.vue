<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100" style="
  background-image: url('https://stroy-zashita.ru/sites/default/files/tyshenia-poshara-1.jpg');
   background-size: cover;
    background-position: center;">
  <div class="w-full max-w-md bg-white shadow-md rounded-[15px] px-8 pt-6 pb-8 mb-4">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input v-model="form.username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="username" type="text" placeholder="Enter your username" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="form.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email" type="email" placeholder="Enter your email" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Phone Number
        </label>
        <input v-model="form.phoneNumber"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="phone" type="phone" placeholder="Enter your phone number" required />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <PasswordInput v-model="form.password" />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
          Confirm Password
        </label>
        <input v-model="form.confirmPassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="confirmPassword" type="password" placeholder="Confirm your password" required />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 text-sm mb-4">{{ successMessage }}</p>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit">
          Sign Up
        </button>
        <a href="/login" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          Have an account? Login
        </a>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import { register } from "@/services/authService";
import PasswordInput from "@/components/Authorization/PasswordInput.vue";
export default {
  components: {
    PasswordInput,
  },
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      },
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleSignUp() {
      console.log("Form data:", this.form);
      if (this.form.password !== this.form.confirmPassword) {
        if (!this.form.password.length) {
          this.errorMessage = 'Enter more stronger password';
          return
        }
        this.errorMessage = "Passwords do not match";
        return;
      } else
        this.errorMessage = '';

      try {
        const response = await register(this.form.username, this.form.email, this.form.password, this.form.phoneNumber);
        this.successMessage = "Registration successful! Redirecting...";
        this.errorMessage = "";
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        if(response.userId){
          localStorage.setItem("userId", response.userId);
        } else {
          throw new Error("User ID not found in response.");
        }
        setTimeout(() => this.$router.push("/"), 2000);
        // Redirect after success
      } catch (error) {
        this.errorMessage = error.message || "Sign-up failed!";
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
