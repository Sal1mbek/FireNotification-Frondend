import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);

    const isAuthenticated = computed(() => !!token.value);

    function login(userToken) {
        token.value = userToken;
        localStorage.setItem('token', userToken);
    }

    function logout() {
        token.value = null;
        localStorage.removeItem('token');
    }

    return { token, isAuthenticated, login, logout };
});
