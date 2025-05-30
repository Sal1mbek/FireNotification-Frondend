<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100" style="
  background-image: url('https://stroy-zashita.ru/sites/default/files/tyshenia-poshara-1.jpg');
   background-size: cover;
    background-position: center;">
  <div class="w-full max-w-md bg-white shadow-md rounded-[15px] px-8 pt-6 pb-8 mb-4">
    <SignUpForm v-if="stepPage === 'form'" :initialForm="form" @sign-up="signUpForm" />
    <SignUpVerificationForm v-else-if="stepPage === 'verification'" :email="form.email" @sign-up="signUpVerification" />
  </div>
  </div>
</template>

<script>
import SignUpForm from '@/components/Authorization/SignUpForm.vue';
import SignUpVerificationForm from '@/components/Authorization/SignUpVerificationForm.vue';
import { register } from '@/services/authService';
export default {
  name: 'Signup',
  components: {
    SignUpVerificationForm,
    SignUpForm
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
      },
      errorMessage: '',
      successMessage: '',
      stepPage: 'form',
    };
  },
  methods: {
    signUpForm(form) {
      this.form = form;
      this.stepPage = 'verification';
    },
    signUpVerification() {
      console.log(6516541564165);
      
      this.signUp();
    }, 
    async signUp() {
      try {
        console.log("Signing up with form data:", this.form);
        
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
        setTimeout(() => this.$router.push("/login"), 1000);
      } catch (error) {
        this.errorMessage = error.message || "Sign-up failed!";
      }
    }
  },
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
