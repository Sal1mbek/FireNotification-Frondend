<template>
    <div class="w-full">
        <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" @input="inputPassword($event.target.value)" required
                id="password" placeholder="Enter your password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="button" class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-sm"
                @click="toggleVisibility">
                <svg v-show="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                <svg v-show="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </button>
        </div>

        <div v-if="internalValue" class="mt-2 text-sm font-medium" :class="passwordStrengthClass">
            {{ passwordStrengthText }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'PasswordInput',
    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            internalValue: this.modelValue,
            showPassword: false,
            passwordStrengthClass: '',
        };
    },
    computed: {
        passwordStrength() {
            const val = this.internalValue;
            if (val.length < 6) return 'weak';
            if (/[A-Z]/.test(val) && /[0-9]/.test(val) && /[\W]/.test(val)) return 'strong';
            return 'medium';
        },
        passwordStrengthText() {
            switch (this.passwordStrength) {
                case 'weak':
                    return 'Too weak';
                case 'medium':
                    return 'Medium password';
                case 'strong':
                    return 'Strong password';
            }
        },
        passwordStrengthClass() {
            switch (this.passwordStrength) {
                case 'weak':
                    return 'text-red-500';
                case 'medium':
                    return 'text-yellow-500';
                case 'strong':
                    return 'text-green-600';
                default:
                    return '';
            }
        },
        passwordStrengthClassChange() {
            switch (this.passwordStrength) {
                case 'weak':
                    return 'text-red-500';
                case 'medium':
                    return 'text-yellow-500';
                case 'strong':
                    return 'text-green-600';
                default:
                    return '';
            }
        },
    },
    methods: {
        inputPassword(value) {
            console.log('Input value:', value);
            this.internalValue = value;
            if (this.passwordStrength === 'strong') {
                console.log('Password is strong:', value);
                this.$emit('update:modelValue', value)
            }
            else {
                console.log('Password is not strong enough:', "".length);
                this.$emit('update:modelValue', "");
            }
            this.passwordStrengthClass = this.passwordStrengthClassChange;
        },
        toggleVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
    watch: {
        modelValue(newVal) {
            this.internalValue = newVal;
        },
    },

};
</script>
