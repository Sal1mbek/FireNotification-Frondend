<template>
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
</template>
<script>
import PasswordInput from "@/components/Authorization/PasswordInput.vue";
export default {
  name: 'SignUpForm',
    components: {
    PasswordInput,
  },
  emits: ["sign-up"],
  props: {
    initialForm: {
        type: Object,
        default: () => ({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
        }),
    },
},
  data() {
    return {
      form: this.initialForm,
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
            this.$emit("sign-up", this.form);
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