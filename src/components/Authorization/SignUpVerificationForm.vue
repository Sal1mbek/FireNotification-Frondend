<template>
    <div class="flex flex-col items-center justify-center">
        <div class="bg-white p-6 rounded-lg w-full">
            <h2 class="text-2xl font-bold mb-4 text-center">Verify Your Email</h2>
            <p class="text-gray-600 mb-6 text-center">Please enter the verification code sent to your email. ({{ email }})</p>
            <form @submit.prevent="() => isInputDisabled ? submitVerification() : checkVerificationCode()" class="space-y-4">
                <input
                    v-model="verificationCode"
                    type="text"
                    :disabled="isInputDisabled"
                    placeholder="Verification Code"
                    class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                :disabled="isLoading"
                    type="submit"
                    class="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
                >
                    {{ buttonText }}
                </button>
            </form>
            <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
        </div>
    </div>
</template>
<script>
import { sendVerifyEmail, checkVerifyEmail } from '@/services/authService';
export default {
    name: 'SignUpVerificationForm',
    props: {
        email: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            errorMessage: '',
            successMessage: '',
            buttonText: 'Send Verification Code',
            isInputDisabled: true,
            isLoading: false,
            verificationCode: '',
        };
    },
    methods: {
        async submitVerification() {
            try {
                this.isLoading = true;
                if(this.email === '') {
                    this.errorMessage = "Email is required!";
                    this.isLoading = false;
                    return;
                }
                const response = await sendVerifyEmail(this.email);
                if (response.success) {
                    this.errorMessage = "";
                    this.isInputDisabled = false;
                } else {
                    throw new Error(response.message || "Verification failed!");
                }
                this.isLoading = false;
                this.buttonText = 'Verify Email';
            } catch (error) {
                this.errorMessage = error.message || "Verification failed!";
                this.successMessage = '';
            }
        },
        async checkVerificationCode() {
            try {
                this.isLoading = true;
                const response = await checkVerifyEmail(this.email ,this.verificationCode);
                if (response.success) {
                    this.successMessage = "Email verified successfully! Redirecting...";
                    this.errorMessage = "";
                    this.isInputDisabled = false;
                    this.$emit('sign-up');
                } else {
                    this.errorMessage = response.message || "Failed to check verification code!";
                    throw new Error(response.message || "Failed to check verification code!");
                }
                this.isLoading = false;
            } catch (error) {
                this.errorMessage = error.message || "Failed to check verification code!";
            } finally {
        this.isLoading = false;
    }
        }
    }
};
</script>